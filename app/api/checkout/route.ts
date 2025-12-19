import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();
    
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Produit introuvable' },
        { status: 404 }
      );
    }

    // get current logged in user (if any) so we can attach it to the Stripe session metadata
    const sessionAuth = await auth();
    const userId = sessionAuth?.user?.id;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              description: product.description || undefined,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/orders?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/products`,
      metadata: {
        productId: product.id,
        quantity: quantity.toString(),
        ...(userId ? { userId } : {}),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout creation error', error);
    return NextResponse.json(
      { error: 'Erreur création session Stripe' },
      { status: 500 }
    );
  }
}