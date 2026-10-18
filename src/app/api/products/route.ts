import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';

// B2C safe projection: hides wholesale-only fields from public API responses
const B2C_PROJECTION = {
  wholesale_price_per_unit: 0,
  min_order_qty: 0,
  hsn_code: 0,
  gst_rate_percent: 0,
  __v: 0,
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'title';
    const order = searchParams.get('order') === 'desc' ? -1 : 1;
    const inStock = searchParams.get('in_stock');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (inStock === 'true') query.in_stock = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const validSortFields = ['title', 'mrp', 'brand', 'category'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'title';

    const products = await Product
      .find(query, B2C_PROJECTION)
      .sort({ [sortField]: order })
      .lean();

    return NextResponse.json({ products, count: products.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const required = ['product_id', 'title', 'category', 'brand', 'mrp', 'wholesale_price_per_unit', 'min_order_qty', 'gst_rate_percent', 'hsn_code'];
    for (const field of required) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    const product = await Product.create(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    if (message.includes('duplicate key')) {
      return NextResponse.json({ error: 'Product with this product_id already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
