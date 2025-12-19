import { prisma } from '@/lib/prisma';

export async function handleCheckoutSession(session: any) {
  const { productId, quantity, userId: metadataUserId } = session.metadata ?? {};
  const qty = parseInt(quantity || '1');
  const total = (session.amount_total ?? 0) / 100;

  if (!productId) {
    throw new Error('Missing productId in session metadata');
  }

  // Resolve the user to attach to the order:
  // 1) prefer userId passed in metadata (from logged-in users)
  // 2) else try to use customer email from Stripe session
  // 3) else fallback to a guest user
  let finalUserId: string | undefined;

  if (metadataUserId) {
    const user = await prisma.user.findUnique({ where: { id: metadataUserId } });
    if (user) finalUserId = user.id;
  }

  if (!finalUserId) {
    const email = session.customer_details?.email;
    if (email) {
      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          name: session.customer_details?.name ?? undefined,
          role: 'USER',
        },
      });
      finalUserId = user.id;
    }
  }

  if (!finalUserId) {
    // dev fallback guest
    await prisma.user.upsert({
      where: { id: 'mock-user-id' },
      update: {},
      create: {
        id: 'mock-user-id',
        email: 'guest@example.com',
        name: 'Guest',
        role: 'USER',
      },
    });
    finalUserId = 'mock-user-id';
  }

  await prisma.order.create({
    data: {
      userId: finalUserId,
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
