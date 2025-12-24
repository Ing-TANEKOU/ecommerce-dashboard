import { productSchema } from '@/lib/validations';

describe('Product Validation', () => {
  it('valide un produit correct', () => {
    const valid = {
      name: 'Test Product',
      price: 99.99,
      stock: 10,
    };
    
    expect(() => productSchema.parse(valid)).not.toThrow();
  });

  it('rejette un prix négatif', () => {
    const invalid = {
      name: 'Test',
      price: -10,
      stock: 5,
    };
    
    expect(() => productSchema.parse(invalid)).toThrow();
  });

  it('rejette un nom trop court', () => {
    const invalid = {
      name: 'AB',
      price: 10,
      stock: 5,
    };
    
    expect(() => productSchema.parse(invalid)).toThrow();
  });

  it('accepte description optionnelle', () => {
    const valid = {
      name: 'Test Product',
      description: 'Une description',
      price: 50,
      stock: 5,
    };
    
    expect(() => productSchema.parse(valid)).not.toThrow();
  });

  it('rejette stock négatif', () => {
    const invalid = {
      name: 'Test',
      price: 10,
      stock: -5,
    };
    
    expect(() => productSchema.parse(invalid)).toThrow();
  });
});