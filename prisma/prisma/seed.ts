import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert products (idempotent)
  const products = [
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
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: { ...p, updatedAt: new Date() },
      create: p,
    });
  }

  // Create an admin user and a regular user (idempotent)
  const users = [
    { email: 'admin@example.com', name: 'Admin User', role: 'ADMIN' },
    { email: 'john.doe@example.com', name: 'John Doe', role: 'USER' },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    });
  }

  console.log('✅ Seed completed (products & users)');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());