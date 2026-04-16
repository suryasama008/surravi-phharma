import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

// POST /api/track
// body: { type: 'page_view' | 'enquiry_click' | 'whatsapp_click' | 'call_click', page?: string, product?: string }
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, page, product, referrer } = body;

    if (!type) return NextResponse.json({ ok: false }, { status: 400 });

    const supabase = createServiceClient();

    await supabase.from('analytics_events').insert([{
      type,
      page:    page || null,
      product: product || null,
      referrer: referrer || null,
    }]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
