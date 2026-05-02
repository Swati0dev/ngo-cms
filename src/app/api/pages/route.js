import { NextResponse } from 'next/server';
import { PageService } from '@/services/pageService';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  // Bypasses database during Next.js 16 build phase to prevent static analysis crashes
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true, pages: [] });
  }

  try {
    // Safer searchParams extraction for Next.js 15/16 build-time analysis
    const includeSections = request.nextUrl.searchParams.get('includeSections') === 'true';
    
    const pages = await PageService.getAllPages(includeSections);
    return NextResponse.json({ success: true, pages }, { status: 200 });
  } catch (error) {
    console.error('API GET /api/pages error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    if (!data.title || !data.slug) {
      return NextResponse.json({ success: false, error: 'Missing title or slug property' }, { status: 400 });
    }

    const newPage = await PageService.createPage(data);
    return NextResponse.json({ success: true, page: newPage }, { status: 201 });
  } catch (error) {
    console.error('API POST /api/pages error:', error);
    
    // Prisma unique constraint violation code
    if (error?.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'A page with this URL slug already exists.' }, { status: 409 });
    }
    
    return NextResponse.json({ success: false, error: 'Failed to create page' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { pageId } = await request.json();
    
    if (!pageId) {
      return NextResponse.json({ success: false, error: 'Missing pageId' }, { status: 400 });
    }

    await PageService.deletePage(pageId);
    return NextResponse.json({ success: true, message: 'Page deleted successfully' });
  } catch (error) {
    console.error('API DELETE /api/pages error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete page' }, { status: 500 });
  }
}
