import { NextRequest, NextResponse } from 'next/server';
import { sendFormEmail } from '@/app/lib/sendgrid';

const PROPERTY_WEBHOOK_URL =
  process.env.ZAPIER_PROPERTY_WEBHOOK_URL ??
  'https://hooks.zapier.com/hooks/catch/21968997/u74w1aa/';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await sendFormEmail('Property Inquiry', body);

    const response = await fetch(PROPERTY_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        formType: 'property_inquiry',
      }),
    });

    if (!response.ok) {
      throw new Error(`Zapier webhook failed: ${response.statusText}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error submitting property inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit property inquiry' },
      { status: 500 }
    );
  }
}
