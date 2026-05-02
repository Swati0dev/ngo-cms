import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function GlobalHeader({ payload }) {
  if (!payload) return null;
  const { logoText, navLinks, donateButton } = payload;

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.5rem 5%', 
      backgroundColor: '#f8fafc', 
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Link href="/" style={{ textDecoration: 'none', color: '#0f172a', fontSize: '1.5rem', fontWeight: '800' }}>
        {logoText || "Global Outreach"}
      </Link>

      <nav style={{ display: 'flex', gap: '2rem' }}>
        {(navLinks || []).map((link, idx) => (
          <Link key={idx} href={link.href || '#'} style={{ 
            textDecoration: 'none', 
            color: '#475569', 
            fontWeight: '600',
            fontSize: '0.95rem',
            borderBottom: link.href === '/' ? '2px solid #0f172a' : '2px dashed transparent', // Simple active state
            paddingBottom: '4px'
          }}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div>
        {donateButton && (
          <Button 
            label={donateButton.label || "Donate"} 
            href={donateButton.href || "/donate"} 
            variant="primary" 
            style={{ backgroundColor: '#0f172a', color: 'white', fontWeight: '600', padding: '0.6rem 1.5rem' }} 
          />
        )}
      </div>
    </header>
  );
}
