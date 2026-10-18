const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  let crc = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(toCrc);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function createPng(size) {
  const width = size;
  const height = size;

  // Generate image buffer (RGBA)
  // Palette:
  // Background: Rounded gradient from soft warm neutral (#d1bfae) to soft blush/sage (#5c6b61)
  // Center: Stylized glowing 'A' / botanical leaf motif in cream (#ffffff)
  const rawData = Buffer.alloc((width * 4 + 1) * height);

  const cx = width / 2;
  const cy = height / 2;
  const r = width * 0.46; // Rounded icon radius
  const cornerR = width * 0.22;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (width * 4 + 1);
    rawData[rowOffset] = 0; // Filter byte 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Distance for rounded rect
      const dx = Math.max(0, Math.abs(x - cx) - (cx - cornerR));
      const dy = Math.max(0, Math.abs(y - cy) - (cy - cornerR));
      const distToCorner = Math.sqrt(dx * dx + dy * dy);

      if (distToCorner > cornerR) {
        // Outside rounded icon
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      // Background Gradient: Sage Green (#4a564e) to Soft Warm Neutral (#5c6b61) to Blush
      const gradT = (x + y) / (width + height);
      let bgR = Math.round(92 + (209 - 92) * gradT * 0.4);
      let bgG = Math.round(107 + (191 - 107) * gradT * 0.4);
      let bgB = Math.round(97 + (174 - 97) * gradT * 0.4);

      // Center Motif: A circular badge with stylized 'A' & sparkling leaf
      const distFromCenter = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
      const innerRadius = width * 0.36;

      let rCol = bgR;
      let gCol = bgG;
      let bCol = bgB;
      let alpha = 255;

      // Inner decorative ring
      if (Math.abs(distFromCenter - innerRadius) < width * 0.015) {
        rCol = 255;
        gCol = 255;
        bCol = 255;
      }

      // Stylized letter "A" / Aura icon in center
      // Normalize coords to [-1, 1] relative to center
      const nx = (x - cx) / (width * 0.26);
      const ny = (y - cy) / (width * 0.26);

      // Left leg of A: y from -0.8 to 0.8, x around -0.6 at bottom to 0 at top
      // Right leg of A: y from -0.8 to 0.8, x around 0.6 at bottom to 0 at top
      // Crossbar: y between 0.1 and 0.25, x between -0.35 and 0.35
      const thickness = 0.22;
      const topY = -0.7;
      const bottomY = 0.75;

      let isA = false;
      if (ny >= topY && ny <= bottomY) {
        const expectedLeftX = (ny - topY) / (bottomY - topY) * -0.55;
        const expectedRightX = (ny - topY) / (bottomY - topY) * 0.55;

        if (Math.abs(nx - expectedLeftX) < thickness * 0.5 || Math.abs(nx - expectedRightX) < thickness * 0.5) {
          isA = true;
        }
        // Crossbar
        if (ny >= 0.12 && ny <= 0.28 && nx >= expectedLeftX && nx <= expectedRightX) {
          isA = true;
        }
      }

      // Sparkle / Leaf at top apex
      const distToSparkle = Math.sqrt(nx * nx + (ny - (topY - 0.2)) * (ny - (topY - 0.2)));
      if (distToSparkle < 0.12) {
        isA = true;
      }

      if (isA) {
        rCol = 255;
        gCol = 255;
        bCol = 255;
      }

      rawData[pxOffset] = rCol;
      rawData[pxOffset + 1] = gCol;
      rawData[pxOffset + 2] = bCol;
      rawData[pxOffset + 3] = alpha;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // Color type (RGBA)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), createPng(192));
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), createPng(512));
console.log('Icons generated successfully in public/icons/');
