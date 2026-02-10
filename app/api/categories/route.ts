import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }

  // Transform data to match frontend format
  const transformedCategories = categories?.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon,
    productCount: category.product_count,
  })) || [];

  return NextResponse.json(transformedCategories);
}
