import { NextResponse } from 'next/server';
import { handleCheckoutSession } from '../stripe/process';

export async function POST(request: Request) {
  // Dev-only: allow simulating a checkout.session.completed without Stripe signature
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    const body = await request.json();
    // Expect body to be a session-like object with metadata.productId and metadata.quantity and amount_total
    const session = body;

    await handleCheckoutSession(session);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Simulate webhook error', err);
    return NextResponse.json({ error: err.message || 'Error' }, { status: 500 });
  }
}
