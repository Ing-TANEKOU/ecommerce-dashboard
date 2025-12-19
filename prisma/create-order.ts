import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Créer ou récupérer utilisateur test
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Utilisateur Test',
    },
  });

  // Récupérer premier produit
  const product = await prisma.product.findFirst();

  if (!product) {
    console.log('❌ Aucun produit trouvé');
    return;
  }

  // Créer commande
  await prisma.order.create({
    data: {
      userId: user.id,
      total: product.price,
      status: 'COMPLETED',
      items: {
        create: {
          productId: product.id,
          quantity: 1,
          price: product.price,
        },
      },
    },
  });

  console.log('✅ Commande test créée');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
