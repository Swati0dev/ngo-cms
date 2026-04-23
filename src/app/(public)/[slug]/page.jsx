import { notFound } from 'next/navigation';
import { PageService } from '@/services/PageService';
import PageRenderer from '@/lib/pageRenderer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pageData = await PageService.getPageBySlug(slug);
  
  return {
    title: pageData ? `${pageData.title} | NGO Mission` : 'Page Not Found',
    description: pageData ? `Learn more about our mission on the ${pageData.title} page.` : '',
  };
}

// The catch-all dynamic SSR route for our CMS pages
export default async function DynamicCMSPage({ params }) {
  // Next.js 15 requires awaiting params
  const { slug } = await params;
  
  // Directly query the database Server-Side! (Ultra-Fast SEO, zero API overhead)
  const pageData = await PageService.getPageBySlug(slug);

  if (!pageData) {
    notFound(); // Triggers the default Next.js 404 UI gracefully
  }

  // Prevent accessing drafts via URL bypassing
  if (pageData.status === 'draft') {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Page is currently being drafted.</h2>
        <p>Check back later!</p>
      </div>
    );
  }

  return (
    <main>
      {/* Hand the fully loaded section data JSON directly into our Engine */}
      <PageRenderer sections={pageData.sections} />
    </main>
  );
}
