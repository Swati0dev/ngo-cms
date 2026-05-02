import Link from 'next/link';
import { Share2, Globe, Users } from 'lucide-react';

export default function GlobalFooter({ payload }) {
  if (!payload) return null;
  const { description, companyLinks, involvedLinks, legalLinks, copyright, bottomLinks } = payload;

  return (
    <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '4rem 5% 2rem', color: '#475569' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
        
        {/* Left Side: Brand and Description */}
        <div style={{ maxWidth: '400px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>Global Outreach</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>{description}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', color: '#475569' }}>
              <Share2 size={18} />
            </button>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', color: '#475569' }}>
              <Globe size={18} />
            </button>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', color: '#475569' }}>
              <Users size={18} />
            </button>
          </div>
        </div>

        {/* Right Side: Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ fontWeight: '600', color: '#334155', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {(companyLinks || []).map((l, i) => <li key={i}><Link href={l.href || '#'} style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem' }}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#334155', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1rem' }}>Get Involved</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {(involvedLinks || []).map((l, i) => <li key={i}><Link href={l.href || '#'} style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem' }}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#334155', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {(legalLinks || []).map((l, i) => <li key={i}><Link href={l.href || '#'} style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem' }}>{l.label}</Link></li>)}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid #f1f5f9', fontSize: '0.85rem' }}>
        <p>{copyright}</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {(bottomLinks || []).map((l, i) => <Link key={i} href={l.href || '#'} style={{ textDecoration: 'none', color: '#64748b' }}>{l.label}</Link>)}
        </div>
      </div>
    </footer>
  );
}
