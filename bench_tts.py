import inspect, time, os
os.environ.setdefault('OMP_NUM_THREADS', '0')
from kokoro_onnx import Kokoro
print("signature:", inspect.signature(Kokoro.__init__))

MODEL = r'C:\Users\darka\Desktop\coder\server\kokoro-v1.0.int8.onnx'
VOICES = r'C:\Users\darka\Desktop\coder\server\voices-v1.0.bin'

t0 = time.time()
k = Kokoro(MODEL, VOICES)
print(f"model load: {time.time()-t0:.2f}s")

for text in ["Hello there, this is a voice test.",
             "Hey, ready when you are. What do you need?"]:
    t0 = time.time()
    samples, sr = k.create(text, voice='af_heart', speed=1.15, lang='en-us')
    dt = time.time() - t0
    print(f"synth {len(text)} chars -> {len(samples)/sr:.2f}s audio in {dt:.2f}s ({dt/max(len(samples)/sr,0.01):.1f}x realtime)")

# try with more threads via onnxruntime options if exposed
import onnxruntime as ort
print("onnxruntime:", ort.__version__, "available providers:", ort.get_available_providers())
