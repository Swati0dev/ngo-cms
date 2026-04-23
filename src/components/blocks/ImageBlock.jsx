/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import styles from '@/styles/components.module.css';

export default function ImageBlock({ src, alt, width = 800, height = 600, priority = false }) {
  if (!src) return null;

  const isExternal = src.includes('http');
  
  // For external images, Next.js requires explicit domain whitelisting in next.config.js.
  // Using standard <img> tag as a fallback for pure flexibility in our CMS if domain isn't registered stringently.
  if (isExternal) {
    return (
      <img src={src} alt={alt || 'Image'} className={styles.imageBase} loading={priority ? 'eager' : 'lazy'} />
    );
  }

  return (
    <div className={styles.imageContainer}>
      <Image
        src={src}
        alt={alt || 'Image'}
        width={width}
        height={height}
        priority={priority}
        className={styles.imageBase}
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
    </div>
  );
}
