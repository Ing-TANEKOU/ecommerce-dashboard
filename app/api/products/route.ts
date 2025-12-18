import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = productSchema.parse(body);
    
    const product = await prisma.product.create({
      data: validated,
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Validation échouée' },
      { status: 400 }
    );
  }
}