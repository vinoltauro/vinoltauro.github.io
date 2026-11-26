"""Generates src/lqip.json: a tiny blurred preview (as a data URI) for every photo the site shows.
Browsers upscale the 16px image smoothly, which reads as a soft blur until the real image loads.
Run after adding photos:  python3 scripts/build-lqip.py   (needs Pillow)"""
import base64, io, json, pathlib
from PIL import Image, ImageFilter

root = pathlib.Path(__file__).resolve().parent.parent
out = {}
for folder in ['eat', 'dublin', 'life', 'projects']:
    for p in sorted((root / 'public' / folder).glob('*.webp')):
        im = Image.open(p).convert('RGB')
        im.thumbnail((16, 16))
        im = im.filter(ImageFilter.GaussianBlur(0.6))
        buf = io.BytesIO()
        im.save(buf, 'WEBP', quality=40)
        out[f'/{folder}/{p.name}'] = 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()
(root / 'src' / 'lqip.json').write_text(json.dumps(out, indent=0))
print(f'{len(out)} previews, {sum(len(v) for v in out.values()) // 1024} KB')
