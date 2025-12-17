'use client';

import { useTransition } from 'react';
import { deleteProduct } from '@/app/actions/products';
import { Trash2 } from 'lucide-react';

export function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm('Supprimer ce produit ?')) return;
    
    startTransition(async () => {
      await deleteProduct(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  );
}