import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleCheckoutSession } from '../../webhooks/stripe/process';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  const product = await prisma.product.findFirst();
  if (!product) return NextResponse.json({ error: 'No product' }, { status: 404 });

  const session = {
    metadata: { productId: product.id, quantity: '1' },
    amount_total: Math.round(product.price * 100),
  } as any;

  try {
    await handleCheckoutSession(session);
    return NextResponse.json({ ok: true, productId: product.id });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
