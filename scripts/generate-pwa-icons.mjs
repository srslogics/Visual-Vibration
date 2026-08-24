import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { deflateSync } from 'node:zlib';

const root = new URL('..', import.meta.url).pathname;
const publicDir = join(root, 'public');
mkdirSync(publicDir, { recursive: true });

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let current = value;
  for (let bit = 0; bit < 8; bit += 1) current = (current & 1) ? 0xedb88320 ^ (current >>> 1) : current >>> 1;
  return current >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}

function encodePng(size, rgba) {
  const rows = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1);
    rows[rowStart] = 0;
    rgba.copy(rows, rowStart + 1, y * size * 4, (y + 1) * size * 4);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(rows, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function clamp(value, min = 0, max = 1) { return Math.max(min, Math.min(max, value)); }
function mix(from, to, amount) { return Math.round(from + (to - from) * amount); }

function distanceToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = clamp(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function paint(base, colour, opacity) {
  const alpha = clamp(opacity);
  return [mix(base[0], colour[0], alpha), mix(base[1], colour[1], alpha), mix(base[2], colour[2], alpha)];
}

function renderIcon(size) {
  const pixels = Buffer.alloc(size * size * 4);
  const green = [16, 42, 36];
  const greenLight = [28, 67, 57];
  const cream = [246, 238, 219];
  const gold = [208, 180, 119];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = (x + 0.5) / size;
      const ny = (y + 0.5) / size;
      const glow = clamp(1 - Math.hypot(nx - 0.2, ny - 0.12) / 0.92) * 0.2;
      let colour = [mix(green[0], greenLight[0], glow), mix(green[1], greenLight[1], glow), mix(green[2], greenLight[2], glow)];

      const radius = Math.hypot(nx - 0.5, ny - 0.5);
      const ringCoverage = clamp((0.011 - Math.abs(radius - 0.344)) * size + 0.5);
      colour = paint(colour, gold, ringCoverage * 0.84);

      const innerRing = clamp((0.003 - Math.abs(radius - 0.292)) * size + 0.5);
      colour = paint(colour, cream, innerRing * 0.12);

      const firstV = Math.min(
        distanceToSegment(nx, ny, 0.27, 0.38, 0.41, 0.65),
        distanceToSegment(nx, ny, 0.41, 0.65, 0.52, 0.40),
      );
      const secondV = Math.min(
        distanceToSegment(nx, ny, 0.48, 0.40, 0.60, 0.65),
        distanceToSegment(nx, ny, 0.60, 0.65, 0.74, 0.36),
      );
      const firstCoverage = clamp((0.026 - firstV) * size + 0.5);
      const secondCoverage = clamp((0.026 - secondV) * size + 0.5);
      colour = paint(colour, cream, firstCoverage);
      colour = paint(colour, gold, secondCoverage);

      const offset = (y * size + x) * 4;
      pixels[offset] = colour[0];
      pixels[offset + 1] = colour[1];
      pixels[offset + 2] = colour[2];
      pixels[offset + 3] = 255;
    }
  }
  return encodePng(size, pixels);
}

for (const [filename, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['icon-maskable-512.png', 512], ['apple-touch-icon.png', 180]]) {
  writeFileSync(join(publicDir, filename), renderIcon(size));
}

console.log('Generated Vantage PWA icons.');
