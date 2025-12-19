import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
  const users = await prisma.user.findMany({ include: { orders: true } });
  console.log(`Users: ${users.length}`);
  for(const u of users){
    console.log(u.email, u.orders.length);
  }
}

main().catch(console.error).finally(async ()=>await prisma.$disconnect());
