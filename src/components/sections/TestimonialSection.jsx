'use client';
import styles from '@/styles/sections.module.css';

export default function TestimonialSection({ payload }) {
  const testimonials = payload?.testimonials || [];

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        {payload?.title && <h2 className={styles.sectionTitle}>{payload.title}</h2>}
        <div className={styles.testimonialGrid}>
          {testimonials.map((test, index) => (
            <div key={index} className={styles.testimonialCard}>
              <p className={styles.quote}>"{test.quote}"</p>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{test.author}</span>
                {test.role && <span className={styles.authorRole}> - {test.role}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
