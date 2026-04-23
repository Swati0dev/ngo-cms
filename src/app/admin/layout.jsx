import Link from 'next/link';

export const metadata = {
  title: 'NGO CMS - Admin Dashboard',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* 
        Sidebar Admin Navigation
        Utilizing custom NGO blue tokens mapped manually outside CSS modules for rigid CMS boundaries
      */}
      <aside style={{ width: '260px', backgroundColor: '#0f172a', color: 'white', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '2.5rem', borderBottom: '1px solid #334155', paddingBottom: '1rem', letterSpacing: '0.5px' }}>
          NGO Admin
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', flex: 1 }}>
          <Link href="/admin" style={{ color: '#f1f5f9', textDecoration: 'none', padding: '10px 15px', backgroundColor: '#1e293b', borderRadius: '6px', fontWeight: '500' }}>
            🌍 Manage Pages
          </Link>
          <Link href="/admin/settings" style={{ color: '#94a3b8', textDecoration: 'none', padding: '10px 15px', borderRadius: '6px' }}>
            ⚙️ System Settings
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid #334155', paddingTop: '1.5rem' }}>
          <Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            &larr; View Live Site
          </Link>
        </div>
      </aside>

      {/* Main Admin Dashboard Content Area */}
      <main style={{ flex: 1, padding: '3.5rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
      
    </div>
  );
}
