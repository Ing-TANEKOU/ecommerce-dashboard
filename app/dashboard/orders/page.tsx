import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commandes',
  description: 'Gestion des commandes clients',
};
import { prisma } from '@/lib/prisma';

import { auth } from '@/auth';

export default async function OrdersPage() {
  const session = await auth();

  // fetch up-to-date user record to know role
  const currentUser = session?.user?.id ? await prisma.user.findUnique({ where: { id: session.user.id } }) : null;
  const isAdmin = currentUser?.role === 'ADMIN';

  // if the user is an admin, show all orders; otherwise only show the user's orders
  const where = isAdmin ? {} : { userId: session?.user?.id };
  const orders = await prisma.order.findMany({
    where,
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Commandes</h1>
      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-slate-600">Aucune commande pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">Commande #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-slate-600">{order.user.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.total}€</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'COMPLETED' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="border-t pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>{item.price}€</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}