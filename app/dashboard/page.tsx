import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const stats = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-slate-600 text-sm">Produits</p>
          <p className="text-3xl font-bold mt-2">{stats[0]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-slate-600 text-sm">Commandes</p>
          <p className="text-3xl font-bold mt-2">{stats[1]}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-slate-600 text-sm">Utilisateurs</p>
          <p className="text-3xl font-bold mt-2">{stats[2]}</p>
        </div>
      </div>
    </div>
  );
}