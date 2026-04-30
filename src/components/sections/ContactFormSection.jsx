'use client';
import { useState } from 'react';
import styles from '@/styles/sections.module.css';

export default function ContactFormSection({ payload }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit');
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.contactHeader}>
          {payload?.title && <h2 className={styles.sectionTitle}>{payload.title}</h2>}
          {payload?.subtitle && <p className={styles.sectionSubtitle}>{payload.subtitle}</p>}
        </div>
        
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          {status === 'success' && (
            <div className={styles.successMessage}>Thank you! Your message has been sent successfully.</div>
          )}
          {status === 'error' && (
            <div className={styles.errorMessage}>Oops! Something went wrong. Please try again.</div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name *</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">Your Message *</label>
            <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange}></textarea>
          </div>
          
          <button type="submit" className={styles.submitButton} disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
