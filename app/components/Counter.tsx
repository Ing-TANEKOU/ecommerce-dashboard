'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-2xl font-bold mb-4">Compteur: {count}</p>
      <div className="flex gap-2">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Incrémenter
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}