import ImageBlock from '@/components/ui/ImageBlock';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EventsSection({ payload }) {
  if (!payload) return null;
  const { title, subtitle, events } = payload;

  return (
    <section style={{ padding: '6rem 5%', backgroundColor: '#ffffff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>{title}</h2>
          <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.6' }}>{subtitle}</p>
        </div>
        <Link href="/events" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>
          View all events <ArrowRight size={18} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {(events || []).map((event, idx) => (
          <div key={idx} style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            
            {/* Event Image */}
            <div style={{ width: '40%', position: 'relative', minHeight: '200px' }}>
              <img src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: 'white', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#ef4444', textTransform: 'uppercase' }}>{event.month}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>{event.day}</div>
              </div>
            </div>

            {/* Event Content */}
            <div style={{ width: '60%', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>{event.title}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                  <Calendar size={16} /> <span>{event.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                  <MapPin size={16} /> <span>{event.location}</span>
                </div>
              </div>

              <Link href={event.link || '#'} style={{ fontWeight: '600', color: '#002f5e', textDecoration: 'none' }}>
                Register Now &rarr;
              </Link>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
