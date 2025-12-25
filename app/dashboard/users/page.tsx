import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Utilisateurs',
  description: 'Gestion des utilisateurs',
};
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { orders: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Utilisateurs</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Rôle</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Commandes</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Inscription</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-900">{user.email}</td>
                <td className="px-6 py-4 text-slate-900">{user.name || '-'}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-900">{user._count.orders}</td>
                <td className="px-6 py-4 text-slate-900">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}