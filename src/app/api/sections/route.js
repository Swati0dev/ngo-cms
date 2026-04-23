import { NextResponse } from 'next/server';
import { SectionService } from '@/services/SectionService';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  // Build-time safety guard for Next.js 16 static engine
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true });
  }

  try {
    const body = await request.json();
    const { pageId, type, payload, sortOrder } = body;
    
    if (!pageId || !type) {
      return NextResponse.json({ success: false, error: 'Missing core pageId or section type' }, { status: 400 });
    }

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ success: false, error: 'Payload must be a valid JSON object' }, { status: 400 });
    }

    // Default sortOrder to 0 if not explicitly defined by admin
    const newSection = await SectionService.createSection(pageId, type, payload, parseInt(sortOrder || 0));
    return NextResponse.json({ success: true, section: newSection }, { status: 201 });
  } catch (error) {
    console.error('API POST /api/sections error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create section mapping' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { sectionId, payload, sortOrder } = body;
    
    if (!sectionId) {
      return NextResponse.json({ success: false, error: 'Missing target sectionId' }, { status: 400 });
    }

    const updatedSection = await SectionService.updateSection(sectionId, { payload, sortOrder });
    return NextResponse.json({ success: true, section: updatedSection });
  } catch (error) {
    console.error('API PUT /api/sections error:', error);
    return NextResponse.json({ success: false, error: 'Failed to rewrite section payload' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { sectionId } = body;
    
    if (!sectionId) {
      return NextResponse.json({ success: false, error: 'Missing target sectionId' }, { status: 400 });
    }

    await SectionService.deleteSection(sectionId);
    return NextResponse.json({ success: true, message: 'Section permanently deleted' });
  } catch (error) {
    console.error('API DELETE /api/sections error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete section' }, { status: 500 });
  }
}
