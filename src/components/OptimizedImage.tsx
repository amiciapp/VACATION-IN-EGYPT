import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fallback?: string;
}

const CDN_ENABLED = false; // Set to true when Cloudinary is configured

function cdnUrl(path: string, w?: number): string {
  const clean = path.replace(/^\//, '');
  const transforms = ['f_auto', 'q_80'];
  if (w) transforms.push(`w_${w}`, 'c_fill');
  return `https://res.cloudinary.com/vacationinegypt/image/upload/${transforms.join(',')}/v1/${clean}`;
}

export default function OptimizedImage({ src, alt, className = '', width, height, loading = 'lazy', fallback }: Props) {
  const [error, setError] = useState(false);
  const finalSrc = error && fallback ? fallback : src;

  if (!CDN_ENABLED) {
    return (
      <img
        src={finalSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        onError={() => setError(true)}
      />
    );
  }

  const webpUrl = cdnUrl(src, width);
  const avifUrl = cdnUrl(src, width);

  return (
    <picture>
      <source srcSet={avifUrl} type="image/avif" />
      <source srcSet={webpUrl} type="image/webp" />
      <img
        src={cdnUrl(src, width)}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        onError={() => setError(true)}
      />
    </picture>
  );
}
