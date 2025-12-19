import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'MacBook Pro 16"',
        description: 'Processeur M3 Max',
        price: 2999,
        stock: 15,
      },
      {
        name: 'iPhone 15 Pro',
        description: '256GB Titane naturel',
        price: 1229,
        stock: 30,
      },
      {
        name: 'AirPods Pro 2',
        description: 'Réduction de bruit active',
        price: 279,
        stock: 50,
      },
    ],
  });
  
  console.log('✅ 3 produits créés');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());