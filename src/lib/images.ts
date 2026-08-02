const CLOUD_NAME = 'vacationinegypt';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

export function cloudinaryUrl(
  path: string,
  options?: { width?: number; height?: number; quality?: number; format?: 'auto' | 'webp' | 'avif' }
): string {
  const { width, height, quality = 80, format = 'auto' } = options || {};
  const transforms: string[] = [`q_${quality}`, `f_${format}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`, 'c_fill');
  const cleanPath = path.replace(/^\//, '');
  return `${BASE_URL}/${transforms.join(',')}/v1/${cleanPath}`;
}

export function srcSet(path: string, widths: number[] = [400, 800, 1200]): string {
  return widths.map(w => `${cloudinaryUrl(path, { width: w })} ${w}w`).join(', ');
}
