'use client';
import styles from '@/styles/sections.module.css';

export default function EventCalendarSection({ payload }) {
  const events = payload?.events || [];

  return (
    <section className={styles.eventSection}>
      <div className={styles.container}>
        {payload?.title && <h2 className={styles.sectionTitle}>{payload.title}</h2>}
        <div className={styles.eventList}>
          {events.map((event, index) => (
            <div key={index} className={styles.eventCard}>
              <div className={styles.eventDate}>
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className={styles.eventDetails}>
                <h3 className={styles.eventName}>{event.name}</h3>
                {event.description && <p className={styles.eventDesc}>{event.description}</p>}
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className={styles.emptyState}>No upcoming events at this time.</p>
          )}
        </div>
      </div>
    </section>
  );
}
