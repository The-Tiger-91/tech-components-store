import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const supabase = await createClient();

  // Build query
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, icon),
      product_prices(*)
    `)
    .eq('in_stock', true);

  // Apply filters
  if (category) {
    query = query.eq('category_id', category);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data: products, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }

  // Transform data to match frontend format
  const transformedProducts = products?.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    category: product.category_id,
    categoryName: product.category?.name,
    categoryIcon: product.category?.icon,
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
  })) || [];

  return NextResponse.json(transformedProducts);
}
