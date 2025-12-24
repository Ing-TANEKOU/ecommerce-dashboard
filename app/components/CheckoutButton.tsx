'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export function CheckoutButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    const { url } = await res.json();
    window.location.href = url;
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
    >
      <ShoppingCart size={18} />
      {loading ? 'Redirection...' : 'Acheter'}
    </button>
  );
}