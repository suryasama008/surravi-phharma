import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, company, phone, email, product, message } = body;

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { error } = await supabase.from('enquiries').insert([{
      name:      name.trim(),
      company:   company?.trim() || '',
      phone:     phone.trim(),
      email:     email?.trim() || '',
      product:   product?.trim() || '',
      message:   message?.trim() || '',
      status:    'new',
      source:    'website',
    }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Enquiry API error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to submit. Please call us directly.' },
      { status: 500 }
    );
  }
}
