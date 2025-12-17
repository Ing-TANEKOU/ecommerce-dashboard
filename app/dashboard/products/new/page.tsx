import { ProductForm } from '@/components/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Nouveau produit</h1>
      <ProductForm />
    </div>
  );
}