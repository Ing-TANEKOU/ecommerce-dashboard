import { PrismaClient } from '@prisma/client';
import { handleCheckoutSession } from '../app/api/webhooks/stripe/process';

const prisma = new PrismaClient();

async function main(){
  const user = await prisma.user.upsert({
    where: { email: 'testuser@example.com' },
    update: { name: 'Test User' },
    create: { email: 'testuser@example.com', name: 'Test User', role: 'USER' }
  });

  const product = await prisma.product.findFirst();
  if(!product) { console.error('no product'); return; }

  const session = {
    metadata: { productId: product.id, quantity: '1', userId: user.id },
    amount_total: Math.round(product.price * 100)
  } as any;

  await handleCheckoutSession(session);

  const orders = await prisma.order.findMany({ include: { items: { include: { product: true } }, user: true }, orderBy: { createdAt: 'desc' }});
  console.log('Orders:', orders.map(o=>({ id: o.id, user: o.user?.email, total: o.total, items: o.items.map(i=>({ name: i.product?.name, qty: i.quantity })) })));
}

main().catch(console.error).finally(async ()=>await prisma.$disconnect());
