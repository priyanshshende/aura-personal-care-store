import dbConnect from './mongodb';
import Product from '../models/Product';

const B2C_PROJECTION = {
  wholesale_price_per_unit: 0,
  min_order_qty: 0,
  hsn_code: 0,
  gst_rate_percent: 0,
  __v: 0,
  _id: 0,
};

export async function getProducts(filters?: {
  category?: string;
  brand?: string;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  in_stock?: boolean;
}) {
  await dbConnect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = {};
  if (filters?.category) query.category = filters.category;
  if (filters?.brand) query.brand = filters.brand;
  if (filters?.in_stock === true) query.in_stock = true;
  if (filters?.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { brand: { $regex: filters.search, $options: 'i' } },
    ];
  }
  const sortField = filters?.sortBy || 'title';
  const sortOrder = filters?.order === 'desc' ? -1 : 1;
  const docs = await Product.find(query, B2C_PROJECTION).sort({ [sortField]: sortOrder }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getProductById(productId: string) {
  await dbConnect();
  const doc = await Product.findOne({ product_id: productId }, B2C_PROJECTION).lean();
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

export async function getCategories(): Promise<string[]> {
  await dbConnect();
  const cats = await Product.distinct('category');
  return cats;
}

export async function getBrands(): Promise<string[]> {
  await dbConnect();
  const brands = await Product.distinct('brand');
  return brands;
}
