export interface Product {
  product_id: string;
  title: string;
  category: string;
  brand: string;
  mrp: number;
  in_stock: boolean;
  images?: string[];
  description?: string;
  selling_price?: number;
  discount_percentage?: number;
  rating?: number;
  total_reviews?: number;
  slug?: string;
}

// Full product type used internally (server-side / admin only)
export interface ProductFull extends Product {
  wholesale_price_per_unit: number;
  min_order_qty: number;
  gst_rate_percent: number;
  hsn_code: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
