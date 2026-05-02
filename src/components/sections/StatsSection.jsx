import ImageBlock from '@/components/ui/ImageBlock';

export default function StatsSection({ payload }) {
  if (!payload) return null;
  const { preTitle, title, bigStat, topRightStat, bottomWideStat } = payload;

  return (
    <section style={{ padding: '6rem 5%', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        {preTitle && <p style={{ color: '#0284c7', fontWeight: '600', marginBottom: '0.5rem' }}>{preTitle}</p>}
        {title && <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>{title}</h2>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', maxWidth: '1200px', width: '100%' }}>
        
        {/* BIG LEFT CARD */}
        <div style={{ gridColumn: 'span 2', backgroundColor: '#002f5e', color: 'white', borderRadius: '24px', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', minHeight: '350px' }}>
          <div style={{ position: 'absolute', top: '20px', right: '30px', opacity: 0.1 }}>
             <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </div>
          <h3 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>{bigStat?.value}</h3>
          <p style={{ fontSize: '1.1rem', color: '#e2e8f0', maxWidth: '80%', position: 'relative', zIndex: 1 }}>{bigStat?.description}</p>
        </div>

        {/* TOP RIGHT CARD */}
        <div style={{ backgroundColor: '#2f694d', color: 'white', borderRadius: '24px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '350px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
             <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
          </div>
          <h3 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>{topRightStat?.value}</h3>
          <p style={{ fontSize: '1rem', color: '#e2e8f0' }}>{topRightStat?.description}</p>
        </div>

        {/* BOTTOM LEFT CARD */}
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#002f5e', marginBottom: '1rem' }}>{bottomWideStat?.value}</h3>
          <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '2rem' }}>{bottomWideStat?.description}</p>
          <div style={{ width: '100%', height: '12px', backgroundColor: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ width: bottomWideStat?.value || '92%', height: '100%', backgroundColor: '#bcf0ce' }}></div>
          </div>
        </div>

        {/* BOTTOM RIGHT CARD (WIDE) */}
        <div style={{ gridColumn: 'span 2', backgroundColor: '#ffe69c', borderRadius: '24px', padding: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ zIndex: 1, maxWidth: '60%' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>{bottomWideStat?.secondaryValue}</h3>
            <p style={{ fontSize: '1rem', color: '#334155' }}>{bottomWideStat?.secondaryDesc}</p>
          </div>
          <div style={{ position: 'absolute', right: '5%', bottom: '-20px', width: '250px', transform: 'rotate(-5deg)' }}>
             {/* Note: In a real app we would use Next/Image, but for CMS flexibility we use ImageBlock or img */}
             <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754" alt="Student" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} />
          </div>
        </div>

      </div>
    </section>
  );
}
