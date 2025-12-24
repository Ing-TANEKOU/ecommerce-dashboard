import { PrismaClient } from '@prisma/client';
import { handleCheckoutSession } from '../app/api/webhooks/stripe/process';

const prisma = new PrismaClient();

async function main(){
  const product = await prisma.product.findFirst();
  if(!product) {
    console.error('No product found');
    return;
  }

  console.log('Using product:', product.id, product.name);

  const session = {
    metadata: { productId: product.id, quantity: '1' },
    amount_total: Math.round(product.price * 100)
  } as any;

  await handleCheckoutSession(session);

  const orders = await prisma.order.findMany({ include: { items: { include: { product: true } }, user: true }, orderBy: { createdAt: 'desc' }});
  console.log('Orders:', orders.map(o=>({ id: o.id, total: o.total, items: o.items.map(i=>({ name: i.product?.name, qty: i.quantity })) })));
}

main().catch(console.error).finally(async ()=>await prisma.$disconnect());
