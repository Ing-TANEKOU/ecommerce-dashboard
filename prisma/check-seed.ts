import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  const users = await prisma.user.findMany();

  console.log(`Products: ${products.length}`);
  console.log(`Users: ${users.length}`);
  console.log('Products list:', products.map(p => ({ name: p.name, price: p.price, stock: p.stock })));
  console.log('Users list:', users.map(u => ({ email: u.email, name: u.name, role: u.role })));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
