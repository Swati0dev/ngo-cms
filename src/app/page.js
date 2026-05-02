import { PageService } from '@/services/pageService';
import PageRenderer from '@/lib/PageRenderer';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Guarantees fresh SSR CMS content rather than stale build-time HTML

export default async function HomePage() {
  // Attempt to load a page explicitly designated with the slug "home"
  const pageData = await PageService.getPageBySlug('home');

  if (!pageData || pageData.status === 'draft') {
    return (
      <main style={{ padding: '8rem 2rem', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '1rem' }}>Welcome to the Next.js NGO System</h1>
        <p style={{ color: '#475569', fontSize: '1.2rem', marginBottom: '2rem' }}>
          Your Neon Database is connected securely, but no <strong>"home"</strong> page has been created yet.
        </p>
        <Link href="/admin" style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
          Enter Admin Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main>
      {/* If "home" exists, run it through the Renderer exactly like any dynamic page */}
      <PageRenderer sections={pageData.sections} />
    </main>
  );
}
