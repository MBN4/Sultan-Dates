import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/adminDataService';

interface ProductsData {
  categories: Array<{
    id: string;
    name: string;
    description: string;
    badge?: string;
  }>;
  products: Array<{
    id: string;
    name: string;
    arabicName?: string;
    category: string;
    price: number;
    originalPrice?: number;
    weight: string;
    availableWeights?: string[];
    rating: number;
    reviewsCount: number;
    inStock: boolean;
    isBestSeller?: boolean;
    isNew?: boolean;
    origin: string;
    grade: string;
    flavorProfile: string;
    description: string;
    longDescription?: string;
    images: string[];
    nutritionHighlights?: string[];
    storageAdvice?: string;
  }>;
}

export async function GET() {
  try {
    const data = await readJsonFile<ProductsData>('products.json');
    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to read products', details: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await readJsonFile<ProductsData>('products.json');

    if (body.type === 'category') {
      const newCategory = body.category;
      if (!newCategory || !newCategory.id || !newCategory.name) {
        return NextResponse.json({ error: 'Category ID and Name are required' }, { status: 400 });
      }
      const exists = data.categories.some(c => c.id === newCategory.id);
      if (exists) {
        return NextResponse.json({ error: 'Category ID already exists' }, { status: 400 });
      }
      data.categories.push(newCategory);
      await writeJsonFile('products.json', data);
      return NextResponse.json({ success: true, categories: data.categories });
    }

    // Default is adding a new product
    const newProduct = body.product || body;
    if (!newProduct.id || !newProduct.name || !newProduct.price) {
      return NextResponse.json({ error: 'Product ID, Name, and Price are required' }, { status: 400 });
    }

    const exists = data.products.some(p => p.id === newProduct.id);
    if (exists) {
      return NextResponse.json({ error: 'Product ID already exists. Please choose a unique ID.' }, { status: 400 });
    }

    data.products.unshift(newProduct);
    await writeJsonFile('products.json', data);
    return NextResponse.json({ success: true, product: newProduct, products: data.products });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to create item', details: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const data = await readJsonFile<ProductsData>('products.json');

    if (body.products && Array.isArray(body.products)) {
      // Bulk update products
      data.products = body.products;
      if (body.categories && Array.isArray(body.categories)) {
        data.categories = body.categories;
      }
      await writeJsonFile('products.json', data);
      return NextResponse.json({ success: true, message: 'All products and categories updated' });
    }

    // Single product update
    const updatedProduct = body.product || body;
    if (!updatedProduct.id) {
      return NextResponse.json({ error: 'Product ID is required for update' }, { status: 400 });
    }

    const index = data.products.findIndex(p => p.id === updatedProduct.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    data.products[index] = { ...data.products[index], ...updatedProduct };
    await writeJsonFile('products.json', data);

    return NextResponse.json({ success: true, product: data.products[index] });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to update product', details: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type') || 'product';

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<ProductsData>('products.json');

    if (type === 'category') {
      data.categories = data.categories.filter(c => c.id !== id);
      await writeJsonFile('products.json', data);
      return NextResponse.json({ success: true, message: 'Category deleted', categories: data.categories });
    }

    data.products = data.products.filter(p => p.id !== id);
    await writeJsonFile('products.json', data);
    return NextResponse.json({ success: true, message: 'Product deleted', products: data.products });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ error: 'Failed to delete item', details: err.message }, { status: 500 });
  }
}
