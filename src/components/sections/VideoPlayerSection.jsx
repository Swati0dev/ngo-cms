'use client';
import styles from '@/styles/sections.module.css';

export default function VideoPlayerSection({ payload }) {
  const videoUrl = payload?.videoUrl;

  return (
    <section className={styles.videoSection}>
      <div className={styles.container}>
        {payload?.title && <h2 className={styles.sectionTitle}>{payload.title}</h2>}
        {videoUrl ? (
          <div className={styles.videoWrapper}>
            <iframe
              src={videoUrl}
              title={payload?.title || "Video Player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoIframe}
            ></iframe>
          </div>
        ) : (
          <p className={styles.emptyState}>No video URL provided.</p>
        )}
      </div>
    </section>
  );
}
