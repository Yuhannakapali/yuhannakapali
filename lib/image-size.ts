import fs from "fs";
import path from "path";

export type ImageSize = { width: number; height: number };

// Reads intrinsic dimensions of a local image in /public by parsing its header.
// Used at build time so <img> can reserve space and avoid layout shift (CLS).
// Supports PNG, JPEG and GIF; returns null for anything else or on error.
export function getImageSize(publicPath: string): ImageSize | null {
  if (!publicPath || !publicPath.startsWith("/")) return null;
  const file = path.join(process.cwd(), "public", publicPath);
  if (!fs.existsSync(file)) return null;

  try {
    const buf = fs.readFileSync(file);

    // PNG: 8-byte signature, then IHDR with width/height as big-endian uint32.
    if (buf.length >= 24 && buf.toString("ascii", 1, 4) === "PNG") {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }

    // GIF: width/height as little-endian uint16 at offset 6.
    if (buf.length >= 10 && buf.toString("ascii", 0, 3) === "GIF") {
      return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
    }

    // JPEG: walk the segments to the Start-Of-Frame marker.
    if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
      let offset = 2;
      while (offset < buf.length) {
        if (buf[offset] !== 0xff) {
          offset++;
          continue;
        }
        const marker = buf[offset + 1];
        const isSOF =
          marker >= 0xc0 &&
          marker <= 0xcf &&
          marker !== 0xc4 &&
          marker !== 0xc8 &&
          marker !== 0xcc;
        if (isSOF) {
          return {
            height: buf.readUInt16BE(offset + 5),
            width: buf.readUInt16BE(offset + 7),
          };
        }
        offset += 2 + buf.readUInt16BE(offset + 2);
      }
    }
  } catch {
    return null;
  }
  return null;
}
