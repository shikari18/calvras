
import sys, json, os

def write_chunk(filename, data_list, append=True):
    os.makedirs(os.path.dirname(filename) if os.path.dirname(filename) else '.', exist_ok=True)
    existing = []
    if append and os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            try:
                existing = json.load(f)
            except Exception:
                existing = []
    combined = existing + data_list
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(combined, f, indent=2, ensure_ascii=False)
    print(f'Wrote {len(data_list)} items to {filename} (Total: {len(combined)})')
