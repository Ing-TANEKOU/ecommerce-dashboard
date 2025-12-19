import { prisma } from '@/lib/prisma';

export async function handleCheckoutSession(session: any) {
  const { productId, quantity } = session.metadata ?? {};
  const qty = parseInt(quantity || '1');
  const total = (session.amount_total ?? 0) / 100;

  if (!productId) {
    throw new Error('Missing productId in session metadata');
  }

  await prisma.order.create({
    data: {
      userId: 'mock-user-id',
      total,
      status: 'COMPLETED',
      items: {
        create: {
          productId,
          quantity: qty,
          price: total,
        },
      },
    },
  });

  await prisma.product.update({
    where: { id: productId },
    data: {
      stock: {
        decrement: qty,
      },
    },
  });
}
