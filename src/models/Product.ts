import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  category: { type: String, required: true, index: true },
  brand: { type: String, required: true, index: true },
  mrp: { type: Number, required: true },
  wholesale_price_per_unit: { type: Number, required: true },
  min_order_qty: { type: Number, required: true },
  gst_rate_percent: { type: Number, required: true },
  hsn_code: { type: String, required: true },
  in_stock: { type: Boolean, required: true, default: true },
  // Future fields
  images: { type: [String], default: [] },
  description: { type: String },
  selling_price: { type: Number },
  discount_percentage: { type: Number },
  variants: { type: Array },
  rating: { type: Number },
  total_reviews: { type: Number },
  slug: { type: String }
}, {
  timestamps: true,
  collection: 'products'
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
