import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } }, user: true },
  });

  console.log(`Orders: ${orders.length}`);
  for (const o of orders) {
    console.log(o.id, o.total, o.status, o.user?.email, o.items.map(i=>({ product: i.product?.name, qty: i.quantity }))); 
  }
}

main().catch((e)=>console.error(e)).finally(async ()=>await prisma.$disconnect());
