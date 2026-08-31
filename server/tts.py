"""
Kokoro TTS worker — persistent process, model loaded ONCE for near-instant replies.

Worker mode (used by the Express server):
    python tts.py --worker
    JSON-lines protocol over stdin/stdout (UTF-8):
      in : {"id": 1, "text": "...", "voice": "af_heart", "speed": 1.15}
      out: {"id": 1, "wav": "<base64 PCM16 WAV>"}   or   {"id": 1, "error": "..."}
      ready: {"ready": true}

Legacy one-shot mode (kept for manual testing):
    echo "Hello" | python tts.py [voice]
"""
import sys
import io
import os
import json
import base64

import soundfile as sf

MODEL = os.path.join(os.path.dirname(__file__), 'kokoro-v1.0.int8.onnx')
VOICES = os.path.join(os.path.dirname(__file__), 'voices-v1.0.bin')

_kokoro = None
_voice_cache = {}


def get_kokoro():
    global _kokoro
    if _kokoro is None:
        from kokoro_onnx import Kokoro
        _kokoro = Kokoro(MODEL, VOICES)
    return _kokoro


def resolve_voice(voice_name):
    kokoro = get_kokoro()
    if voice_name in ('expressive', 'expressive_female', 'natural'):
        if 'expressive_female' not in _voice_cache:
            try:
                v_bella = kokoro.get_voice_style('af_bella')
                v_sarah = kokoro.get_voice_style('af_sarah')
                _voice_cache['expressive_female'] = (v_bella * 0.6) + (v_sarah * 0.4)
            except Exception:
                return 'af_bella'
        return _voice_cache['expressive_female']
    return voice_name or 'af_bella'


def synth(text, voice, speed):
    kokoro = get_kokoro()
    resolved = resolve_voice(voice)
    samples, sample_rate = kokoro.create(text, voice=resolved, speed=speed, lang='en-us')
    buf = io.BytesIO()
    sf.write(buf, samples, sample_rate, format='WAV', subtype='PCM_16')
    return buf.getvalue()


def worker_main():
    # Force UTF-8 on all pipes so non-ASCII text / emoji never crash.
    for stream in (sys.stdin, sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding='utf-8', errors='replace')
        except Exception:
            pass

    out = sys.stdout
    err = sys.stderr

    out.write(json.dumps({'ready': True}) + '\n')
    out.flush()

    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        req = {}
        try:
            req = json.loads(line)
            text = (req.get('text') or '').strip()[:2000]
            if not text:
                out.write(json.dumps({'id': req.get('id'), 'error': 'empty text'}, ensure_ascii=True) + '\n')
                out.flush()
                continue
            voice = req.get('voice', 'af_heart')
            speed = float(req.get('speed', 1.15))
            wav = synth(text, voice, speed)
            out.write(json.dumps(
                {'id': req.get('id'), 'wav': base64.b64encode(wav).decode('ascii')},
                ensure_ascii=True
            ) + '\n')
            out.flush()
        except Exception as e:
            err.write(f'worker error: {e}\n')
            err.flush()
            try:
                out.write(json.dumps({'id': req.get('id'), 'error': str(e)}, ensure_ascii=True) + '\n')
                out.flush()
            except Exception:
                pass


def one_shot_main():
    voice = sys.argv[1] if len(sys.argv) > 1 else 'af_heart'
    text = sys.stdin.buffer.read().decode('utf-8', errors='replace').strip()
    if not text:
        sys.exit(1)
    try:
        sys.stdout.buffer.write(synth(text, voice, 1.05))
    except Exception as e:
        sys.stderr.write(f'TTS error: {e}\n')
        sys.exit(1)


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--worker':
        worker_main()
    else:
        one_shot_main()
