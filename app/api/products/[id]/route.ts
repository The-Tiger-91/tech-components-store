import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, icon, description),
      product_prices(*)
    `)
    .eq('id', id)
    .single();

  if (error || !product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  // Transform data to match frontend format
  const transformedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category_id,
    categoryData: {
      id: product.category?.id,
      name: product.category?.name,
      icon: product.category?.icon,
      description: product.category?.description,
    },
    description: product.description,
    specifications: product.specifications,
    image: product.image_url,
    prices: product.product_prices?.map((price: any) => ({
      merchant: price.merchant,
      price: parseFloat(price.price),
      currency: price.currency,
      url: price.url,
      shipping: parseFloat(price.shipping || 0),
      availability: price.availability,
      lastUpdated: new Date(price.last_updated),
    })) || [],
    averageRating: product.average_rating,
    reviewCount: product.review_count,
    inStock: product.in_stock,
    tags: product.tags,
  };

  return NextResponse.json(transformedProduct);
}
