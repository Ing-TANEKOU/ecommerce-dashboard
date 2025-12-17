'use server';

import { prisma } from '@/lib/prisma';
import { productSchema, ProductInput } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: ProductInput) {
  const validated = productSchema.parse(data);
  
  const product = await prisma.product.create({
    data: validated,
  });
  
  revalidatePath('/dashboard/products');
  return product;
}

export async function updateProduct(id: string, data: ProductInput) {
  const validated = productSchema.parse(data);
  
  const product = await prisma.product.update({
    where: { id },
    data: validated,
  });
  
  revalidatePath('/dashboard/products');
  return product;
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });
  
  revalidatePath('/dashboard/products');
}