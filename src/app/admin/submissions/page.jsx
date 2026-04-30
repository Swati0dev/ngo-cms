import prisma from '@/lib/prisma';
import styles from '@/styles/admin.module.css';

export const dynamic = 'force-dynamic';

export default async function SubmissionsPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contact Submissions</h1>
        <p className={styles.subtitle}>Manage inquiries and messages from the website.</p>
      </header>

      <div className={styles.submissionsTableWrapper}>
        <table className={styles.submissionsTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.emptyState}>No messages yet.</td>
              </tr>
            ) : (
              messages.map(msg => (
                <tr key={msg.id}>
                  <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.phone || '-'}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[msg.status.toLowerCase()]}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className={styles.messageCell}>{msg.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
