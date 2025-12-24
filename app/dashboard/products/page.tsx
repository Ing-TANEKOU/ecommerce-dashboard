import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/DeleteButton';
import { CheckoutButton } from '@/components/CheckoutButton';
export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produits</h1>
        <Link 
          href="/dashboard/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Nouveau produit
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Prix</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-slate-50">
              <td className="px-6 py-4 text-slate-900">{product.name}</td>
              <td className="px-6 py-4 text-slate-900 font-medium">{product.price}€</td>
              <td className="px-6 py-4 text-slate-900">{product.stock}</td>
              <td className="px-6 py-4 flex gap-2">
              <CheckoutButton productId={product.id} />
              <DeleteButton id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}