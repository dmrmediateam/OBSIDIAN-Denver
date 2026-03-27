import { NextRequest, NextResponse } from 'next/server';
import { sendFormEmail } from '@/app/lib/sendgrid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const zapierWebhookUrl = process.env.ZAPIER_PROPERTY_WEBHOOK_URL;

    await sendFormEmail('Property Inquiry', body);

    if (zapierWebhookUrl) {
      const response = await fetch(zapierWebhookUrl, {
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
