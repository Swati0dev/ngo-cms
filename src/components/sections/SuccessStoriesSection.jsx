import { Quote } from 'lucide-react';

export default function SuccessStoriesSection({ payload }) {
  if (!payload) return null;
  const { title, subtitle, stories } = payload;

  return (
    <section style={{ padding: '6rem 5%', backgroundColor: '#0f172a', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(2,132,199,0.2) 0%, rgba(15,23,42,0) 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,105,77,0.2) 0%, rgba(15,23,42,0) 70%)', zIndex: 0 }}></div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>{title}</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>{subtitle}</p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {(stories || []).map((story, idx) => (
          <div key={idx} style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
            <Quote size={40} color="rgba(2, 132, 199, 0.5)" style={{ marginBottom: '1.5rem' }} />
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', flexGrow: 1, marginBottom: '2rem', fontStyle: 'italic', color: '#e2e8f0' }}>"{story.quote}"</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
                <img src={story.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"} alt={story.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'white', margin: 0 }}>{story.author}</h4>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>{story.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
