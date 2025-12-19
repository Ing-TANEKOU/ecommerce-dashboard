import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { handleCheckoutSession } from './process';

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook signature invalide' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // delegate to shared handler
    try {
      await handleCheckoutSession(session);
    } catch (err) {
      // log and return a 500 so we can inspect failures during testing
      console.error('Error handling checkout session', err);
      return NextResponse.json({ error: 'Error processing session' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}