import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Tableau de bord principal',
};

function StatsLoading() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-20 mb-4"></div>
          <div className="h-8 bg-slate-200 rounded w-16"></div>
        </div>
      ))}
    </div>
  );
}

async function Stats() {
  const stats = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return (
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
  );
}

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      <Suspense fallback={<StatsLoading />}>
        <Stats />
      </Suspense>
    </div>
  );
}