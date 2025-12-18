import Link from 'next/link';
import { UserMenu } from '@/components/UserMenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <Link href="/dashboard" className="font-semibold text-slate-900">
                Dashboard
              </Link>
              <Link href="/dashboard/products" className="text-slate-600 hover:text-slate-900">
                Produits
              </Link>
              <Link href="/dashboard/orders" className="text-slate-600 hover:text-slate-900">
                Commandes
              </Link>
              <Link href="/dashboard/users" className="text-slate-600 hover:text-slate-900">
                Utilisateurs
              </Link>
            </div>
            <UserMenu />
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}