'use client';
import styles from '@/styles/sections.module.css';

export default function ImageGallerySection({ payload }) {
  const images = payload?.images || [];

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        {payload?.title && <h2 className={styles.sectionTitle}>{payload.title}</h2>}
        <div className={styles.galleryGrid}>
          {images.map((img, index) => (
            <div key={index} className={styles.galleryItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.caption || "Gallery image"} className={styles.galleryImage} />
              {img.caption && <div className={styles.galleryCaption}>{img.caption}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
