import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
  console.log('Resetting test DB state...');

  // remove all order items and orders
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  // remove all non-admin users (for safety) and then create the expected test user
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: { email: 'test@example.com', name: 'Test', role: 'USER' }
  });

  // ensure products exist (seed should already have created 3)
  const products = await prisma.product.findMany();
  if(products.length === 0){
    console.log('No products found. Run `npm run seed` first.');
    return;
  }

  const product = products[0];

  // create a single completed order for the test user
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: product.price,
      status: 'COMPLETED',
      items: {
        create: [{ productId: product.id, quantity: 1, price: product.price }]
      }
    },
    include: { items: true }
  });

  console.log('Created user:', user.email);
  console.log('Created order:', { id: order.id, total: order.total, items: order.items.length });
}

main().catch((e)=>{ console.error(e); process.exit(1); }).finally(async ()=>await prisma.$disconnect());
