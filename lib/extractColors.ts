export type Palette = {
  dominant: string;
  palette: string[];
};

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getLuminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function colorDistance(a: number[], b: number[]): number {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

export async function extractColors(imgUrl: string): Promise<Palette> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const size = 64;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("no ctx");
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const bins = new Map<string, { count: number; r: number; g: number; b: number }>();
        const step = 4;
        for (let i = 0; i < data.length; i += 4 * step) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 125) continue;
          const lum = getLuminance(r, g, b);
          if (lum < 18 || lum > 240) continue;
          const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
          const existing = bins.get(key);
          if (existing) {
            existing.count += 1;
            existing.r += r;
            existing.g += g;
            existing.b += b;
          } else {
            bins.set(key, { count: 1, r, g, b });
          }
        }

        const averaged = Array.from(bins.values()).map((bucket) => {
          const r = Math.round(bucket.r / bucket.count);
          const g = Math.round(bucket.g / bucket.count);
          const b = Math.round(bucket.b / bucket.count);
          return { rgb: [r, g, b], count: bucket.count };
        });

        averaged.sort((a, b) => b.count - a.count);

        const picked: number[][] = [];
        for (const entry of averaged) {
          if (picked.length >= 5) break;
          const tooClose = picked.some((p) => colorDistance(p, entry.rgb) < 1800);
          if (!tooClose) picked.push(entry.rgb);
        }
        while (picked.length < 4 && averaged.length > 0) {
          picked.push(averaged[picked.length % averaged.length].rgb);
        }

        const palette = picked.map((p) => rgbToHex(p[0], p[1], p[2]));
        resolve({ dominant: palette[0] ?? "#1e1e1e", palette });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imgUrl;
  });
}
