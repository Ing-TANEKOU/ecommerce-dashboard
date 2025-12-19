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
    // Log the verification error so we can debug why Stripe's signature failed
    console.error('Stripe webhook verification failed:', err);

    return NextResponse.json(
      { error: 'Webhook signature invalide' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Received checkout.session.completed', {
      id: session.id,
      metadata: session.metadata,
      amount_total: session.amount_total,
    });

    // delegate to shared handler
    try {
      await handleCheckoutSession(session);
      console.log('Session processed successfully', { sessionId: session.id });
    } catch (err) {
      // log and return a 500 so we can inspect failures during testing
      console.error('Error handling checkout session', err);
      return NextResponse.json({ error: 'Error processing session' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}