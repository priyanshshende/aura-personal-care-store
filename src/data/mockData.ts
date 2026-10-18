import { ProductFull, Category } from '../types';

export const mockCategories: Category[] = [
  {
    "id": "1",
    "title": "Skin Care",
    "slug": "skin-care",
    "image": "/images/categories/skin-care.webp"
  },
  {
    "id": "2",
    "title": "Hair Care",
    "slug": "hair-care",
    "image": "/images/categories/hair-care.webp"
  },
  {
    "id": "3",
    "title": "Body Care",
    "slug": "body-care",
    "image": "/images/categories/body-care.webp"
  },
  {
    "id": "4",
    "title": "Perfumes & Deodorants",
    "slug": "perfumes-deodorants",
    "image": "/images/categories/perfumes.webp"
  }
];

export const mockProducts: ProductFull[] = [
  {
    "product_id": "PLUM-SKN-001",
    "title": "Plum 15% Vitamin C Face Serum with Mandarin (30ml)",
    "category": "Skin Care",
    "brand": "Plum",
    "mrp": 899,
    "selling_price": 674,
    "discount_percentage": 25,
    "wholesale_price_per_unit": 404,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-001.webp"
    ],
    "description": "Brightening face serum with 15% Stable Vitamin C (Ethyl Ascorbic Acid) and Japanese Mandarin extract. Fades dark spots and boosts natural radiance. Vegan, cruelty-free.",
    "rating": 4.8,
    "total_reviews": 2340,
    "slug": "15-vitamin-c-face-serum-with-mandarin"
  },
  {
    "product_id": "PLUM-SKN-002",
    "title": "Plum 2% Alpha Arbutin & Hyaluronic Acid Tan Fading Face Serum (30ml)",
    "category": "Skin Care",
    "brand": "Plum",
    "mrp": 599,
    "selling_price": 479,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 287,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-002.webp"
    ],
    "description": "Powerful 2% Alpha Arbutin and Hyaluronic Acid serum for visible tan removal and skin brightening in just 4 weeks. Vegan, cruelty-free.",
    "rating": 4.7,
    "total_reviews": 1890,
    "slug": "2-alpha-arbutin-hyaluronic-acid-tan-fading-face-serum"
  },
  {
    "product_id": "PLUM-SKN-003",
    "title": "Plum Green Tea Renewed Clarity Night Gel (50ml)",
    "category": "Skin Care",
    "brand": "Plum",
    "mrp": 695,
    "selling_price": 521,
    "discount_percentage": 25,
    "wholesale_price_per_unit": 312,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-003.webp"
    ],
    "description": "Lightweight night gel with Green Tea, Glycolic Acid and Niacinamide to clear pores and wake up to brighter skin. Vegan, 100% cruelty-free.",
    "rating": 4.6,
    "total_reviews": 1120,
    "slug": "green-tea-renewed-clarity-night-gel"
  },
  {
    "product_id": "PLUM-SKN-004",
    "title": "Plum E-Luminence Simply Supple Cleansing Balm (90ml)",
    "category": "Skin Care",
    "brand": "Plum",
    "mrp": 695,
    "selling_price": 521,
    "discount_percentage": 25,
    "wholesale_price_per_unit": 312,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-004.webp"
    ],
    "description": "Melts away makeup, sunscreen and pollution with E-Vitamin and Rose Hip Oil. Transforms to a silky oil that rinses clean without stripping skin.",
    "rating": 4.7,
    "total_reviews": 980,
    "slug": "e-luminence-simply-supple-cleansing-balm"
  },
  {
    "product_id": "PLUM-SKN-005",
    "title": "Plum 10% Niacinamide & Rice Water Pore Tightening Face Serum (30ml)",
    "category": "Skin Care",
    "brand": "Plum",
    "mrp": 699,
    "selling_price": 524,
    "discount_percentage": 25,
    "wholesale_price_per_unit": 314,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-005.webp"
    ],
    "description": "10% Niacinamide with Rice Water to visibly minimize pores, control excess oil and even skin tone. Fragrance-free, vegan, cruelty-free.",
    "rating": 4.8,
    "total_reviews": 2100,
    "slug": "10-niacinamide-rice-water-pore-tightening-face-serum"
  },
  {
    "product_id": "PLUM-SKN-006",
    "title": "Plum Green Tea Pore Cleansing Face Wash (100ml)",
    "category": "Skin Care",
    "brand": "Plum",
    "mrp": 325,
    "selling_price": 243,
    "discount_percentage": 25,
    "wholesale_price_per_unit": 145,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-006.webp"
    ],
    "description": "SLS-free face wash enriched with Green Tea extracts to gently remove excess oil and impurities for clean, fresh and clear skin. Vegan, cruelty-free.",
    "rating": 4.6,
    "total_reviews": 3100,
    "slug": "green-tea-pore-cleansing-face-wash"
  },
  {
    "product_id": "PLUM-SKN-007",
    "title": "Plum BodyLovin' Hawaiian Rumba Body Butter (200g)",
    "category": "Body Care",
    "brand": "Plum",
    "mrp": 595,
    "selling_price": 446,
    "discount_percentage": 25,
    "wholesale_price_per_unit": 267,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-007.webp"
    ],
    "description": "Deep moisturizing body butter with Shea Butter, Cocoa Butter and sweet tropical scent. Non-greasy, vegan formula for silky soft skin.",
    "rating": 4.7,
    "total_reviews": 1450,
    "slug": "bodylovin-hawaiian-rumba-body-butter"
  },
  {
    "product_id": "PLUM-SKN-008",
    "title": "Plum Hello Aloe Soft & Supple Body Lotion (300ml)",
    "category": "Body Care",
    "brand": "Plum",
    "mrp": 425,
    "selling_price": 318,
    "discount_percentage": 25,
    "wholesale_price_per_unit": 190,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33079000",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-008.webp"
    ],
    "description": "Aloe Vera enriched body lotion for 24-hour moisture with a lightweight, non-sticky formula. 96% natural origin ingredients, vegan, cruelty-free.",
    "rating": 4.5,
    "total_reviews": 876,
    "slug": "hello-aloe-soft-supple-body-lotion"
  },
  {
    "product_id": "PLUM-SKN-009",
    "title": "Plum Grape Seed & Sea Buckthorn 35+ Bright Years Cell Renewal Serum (30ml)",
    "category": "Skin Care",
    "brand": "Plum",
    "mrp": 1199,
    "selling_price": 899,
    "discount_percentage": 25,
    "wholesale_price_per_unit": 539,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-009.webp"
    ],
    "description": "Anti-aging serum with Grape Seed Extract, Sea Buckthorn and Vitamin E to reduce fine lines, restore firmness and renew skin cells. Vegan.",
    "rating": 4.7,
    "total_reviews": 654,
    "slug": "grape-seed-sea-buckthorn-cell-renewal-serum"
  },
  {
    "product_id": "PLUM-SKN-010",
    "title": "Plum Bright Years Under-Eye Recovery Gel (20ml)",
    "category": "Skin Care",
    "brand": "Plum",
    "mrp": 595,
    "selling_price": 446,
    "discount_percentage": 25,
    "wholesale_price_per_unit": 267,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/PLUM-SKN-010.webp"
    ],
    "description": "Lightweight under-eye gel with Grape Seed and Sea Buckthorn to reduce dark circles, puffiness and early signs of aging. Dermatologically tested.",
    "rating": 4.6,
    "total_reviews": 780,
    "slug": "bright-years-under-eye-recovery-gel"
  },
  {
    "product_id": "MAM-SKN-001",
    "title": "Mamaearth Tea Tree Face Wash with Tea Tree & Salicylic Acid (100ml)",
    "category": "Skin Care",
    "brand": "Mamaearth",
    "mrp": 249,
    "selling_price": 199,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 119,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-001.webp"
    ],
    "description": "Pimple-control face wash with Tea Tree and Salicylic Acid to reduce acne and oil. MadeSafe certified, toxin-free for oily and acne-prone skin.",
    "rating": 4.6,
    "total_reviews": 4850,
    "slug": "tea-tree-face-wash"
  },
  {
    "product_id": "MAM-SKN-002",
    "title": "Mamaearth Vitamin C Face Wash with Vitamin C & Turmeric (100ml)",
    "category": "Skin Care",
    "brand": "Mamaearth",
    "mrp": 249,
    "selling_price": 199,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 119,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-002.webp"
    ],
    "description": "Brightening face wash with Vitamin C and Turmeric to reveal glowing skin. Free from harmful chemicals, MadeSafe certified, suitable for all skin types.",
    "rating": 4.7,
    "total_reviews": 5200,
    "slug": "vitamin-c-face-wash"
  },
  {
    "product_id": "MAM-SKN-003",
    "title": "Mamaearth Ubtan Face Wash with Turmeric & Saffron (100ml)",
    "category": "Skin Care",
    "brand": "Mamaearth",
    "mrp": 249,
    "selling_price": 199,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 119,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-003.webp"
    ],
    "description": "Traditional Ubtan face wash with Turmeric and Saffron for natural tan removal and brightening. Toxin-free, MadeSafe certified, dermatologically tested.",
    "rating": 4.5,
    "total_reviews": 3900,
    "slug": "ubtan-face-wash"
  },
  {
    "product_id": "MAM-SKN-004",
    "title": "Mamaearth Vitamin C Daily Glow Face Cream (80g)",
    "category": "Skin Care",
    "brand": "Mamaearth",
    "mrp": 349,
    "selling_price": 279,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 167,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-004.webp"
    ],
    "description": "Daily glow face cream with Vitamin C and Turmeric to brighten and moisturize skin. Free from parabens, SLS and mineral oils. MadeSafe certified.",
    "rating": 4.6,
    "total_reviews": 3150,
    "slug": "vitamin-c-daily-glow-face-cream"
  },
  {
    "product_id": "MAM-SKN-005",
    "title": "Mamaearth BHA 2% Salicylic Acid & Grapefruit Face Toner (200ml)",
    "category": "Skin Care",
    "brand": "Mamaearth",
    "mrp": 299,
    "selling_price": 239,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 143,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-005.webp"
    ],
    "description": "Exfoliating BHA toner with 2% Salicylic Acid and Grapefruit to unclog pores and remove dead skin cells. Free from alcohol and harsh chemicals.",
    "rating": 4.6,
    "total_reviews": 2100,
    "slug": "bha-salicylic-acid-face-toner"
  },
  {
    "product_id": "MAM-SKN-006",
    "title": "Mamaearth Onion Hair Oil for Hair Regrowth & Hair Fall Control (250ml)",
    "category": "Hair Care",
    "brand": "Mamaearth",
    "mrp": 399,
    "selling_price": 319,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 191,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33059010",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-006.webp"
    ],
    "description": "Onion oil enriched with 14 beneficial oils for visible hair regrowth and reduces hair fall from roots. Dermatologically tested, free from mineral oils.",
    "rating": 4.7,
    "total_reviews": 8200,
    "slug": "onion-hair-oil"
  },
  {
    "product_id": "MAM-SKN-007",
    "title": "Mamaearth Vitamin C Serum for Face with Vitamin C & Turmeric (30ml)",
    "category": "Skin Care",
    "brand": "Mamaearth",
    "mrp": 499,
    "selling_price": 399,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 239,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-007.webp"
    ],
    "description": "Face serum with 10% Vitamin C and Turmeric to reduce blemishes and dark spots for a brighter complexion. Vegan, MadeSafe certified, paraben-free.",
    "rating": 4.7,
    "total_reviews": 6300,
    "slug": "vitamin-c-serum-for-face"
  },
  {
    "product_id": "MAM-SKN-008",
    "title": "Mamaearth Ubtan Scrub with Turmeric & Walnut (100g)",
    "category": "Skin Care",
    "brand": "Mamaearth",
    "mrp": 299,
    "selling_price": 239,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 143,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-008.webp"
    ],
    "description": "Natural Ubtan face and body scrub with Turmeric and Walnut to exfoliate dead skin, remove tan and reveal glowing skin. Paraben-free, SLS-free.",
    "rating": 4.6,
    "total_reviews": 2800,
    "slug": "ubtan-scrub"
  },
  {
    "product_id": "MAM-SKN-009",
    "title": "Mamaearth Retinol Face Serum for Wrinkle-Free Skin (30ml)",
    "category": "Skin Care",
    "brand": "Mamaearth",
    "mrp": 649,
    "selling_price": 519,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 311,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-009.webp"
    ],
    "description": "Anti-aging retinol serum with Bakuchiol to reduce fine lines, wrinkles and improve skin texture. Free from parabens and SLS. MadeSafe certified.",
    "rating": 4.7,
    "total_reviews": 1900,
    "slug": "retinol-face-serum"
  },
  {
    "product_id": "MAM-SKN-010",
    "title": "Mamaearth Skin Restore Body Wash with Coffee & Oat Milk (300ml)",
    "category": "Body Care",
    "brand": "Mamaearth",
    "mrp": 349,
    "selling_price": 279,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 167,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33079000",
    "in_stock": true,
    "images": [
      "/images/products/MAM-SKN-010.webp"
    ],
    "description": "Hydrating body wash with Coffee and Oat Milk to gently cleanse while moisturizing skin. Toxin-free, MadeSafe certified, suitable for daily use.",
    "rating": 4.6,
    "total_reviews": 1450,
    "slug": "skin-restore-body-wash"
  },
  {
    "product_id": "GAR-SKN-001",
    "title": "Garnier Bright Complete 30X Vitamin C Booster Face Serum (30ml)",
    "category": "Skin Care",
    "brand": "Garnier",
    "mrp": 599,
    "selling_price": 479,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 287,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-001.webp"
    ],
    "description": "Garnier Bright Complete Vitamin C Face Serum with Japanese Yuzu Lemon extract. Brightens skin, fades dark spots and boosts radiance. Dermatologically tested.",
    "rating": 4.6,
    "total_reviews": 3200,
    "slug": "garnier-bright-complete-vitamin-c-booster-face-serum-30ml"
  },
  {
    "product_id": "GAR-SKN-002",
    "title": "Garnier Skin Naturals Micellar Cleansing Water All-in-1 (400ml)",
    "category": "Skin Care",
    "brand": "Garnier",
    "mrp": 375,
    "selling_price": 299,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 179,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-002.webp"
    ],
    "description": "All-in-1 Micellar Cleansing Water that removes makeup, cleanses and soothingly hydrates without aggressive rubbing. No rinsing needed.",
    "rating": 4.7,
    "total_reviews": 4500,
    "slug": "garnier-micellar-cleansing-water-400ml"
  },
  {
    "product_id": "GAR-SKN-003",
    "title": "Garnier Bright Complete Vitamin C Gel Face Wash (100g)",
    "category": "Skin Care",
    "brand": "Garnier",
    "mrp": 225,
    "selling_price": 180,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 108,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-003.webp"
    ],
    "description": "Brightening gel face wash with Vitamin C and Purifying Lemon Extracts to clear dirt and reveal radiant, clean skin in one step.",
    "rating": 4.5,
    "total_reviews": 5100,
    "slug": "garnier-bright-complete-vitamin-c-gel-face-wash-100g"
  },
  {
    "product_id": "GAR-SKN-004",
    "title": "Garnier Men Turbo Bright Anti-Pollution Double Action Face Wash (100g)",
    "category": "Skin Care",
    "brand": "Garnier",
    "mrp": 290,
    "selling_price": 235,
    "discount_percentage": 19,
    "wholesale_price_per_unit": 141,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-004.webp"
    ],
    "description": "Dual-texture face wash with Black Charcoal and Icy Clay to remove pollution micro-dust, unclog pores and reveal brighter skin.",
    "rating": 4.5,
    "total_reviews": 2800,
    "slug": "garnier-men-turbo-bright-face-wash-100g"
  },
  {
    "product_id": "GAR-SKN-005",
    "title": "Garnier Men Acno Fight Anti-Pimple Face Wash (100g)",
    "category": "Skin Care",
    "brand": "Garnier",
    "mrp": 275,
    "selling_price": 220,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 132,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-005.webp"
    ],
    "description": "Anti-pimple face wash with Salicylic Acid and Herbal Repair to fight 6 pimple problems and control excess oil. Clinically tested.",
    "rating": 4.5,
    "total_reviews": 3100,
    "slug": "garnier-men-acno-fight-anti-pimple-face-wash-100g"
  },
  {
    "product_id": "GAR-SKN-006",
    "title": "Garnier Color Naturals Crème Hair Color - Natural Black 1",
    "category": "Hair Care",
    "brand": "Garnier",
    "mrp": 219,
    "selling_price": 185,
    "discount_percentage": 15,
    "wholesale_price_per_unit": 111,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33059010",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-006.webp"
    ],
    "description": "Permanent hair color with nourishing 3-oil blend (Olive, Almond, Avocado) for 100% grey coverage. Gentle, long-lasting color with natural shine.",
    "rating": 4.6,
    "total_reviews": 6800,
    "slug": "garnier-color-naturals-natural-black"
  },
  {
    "product_id": "GAR-SKN-007",
    "title": "Garnier Bright Complete Vitamin C Serum Cream SPF 40 PA+++ (45g)",
    "category": "Skin Care",
    "brand": "Garnier",
    "mrp": 325,
    "selling_price": 260,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 156,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-007.webp"
    ],
    "description": "Lightweight day cream with Vitamin C and SPF 40/PA+++ to protect against sun-induced dark spots while brightening skin tone.",
    "rating": 4.6,
    "total_reviews": 3900,
    "slug": "garnier-bright-complete-serum-cream-spf-40-45g"
  },
  {
    "product_id": "GAR-SKN-008",
    "title": "Garnier SkinActive Micellar Solution All-in-1 Sensitive Skin (200ml)",
    "category": "Skin Care",
    "brand": "Garnier",
    "mrp": 275,
    "selling_price": 220,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 132,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-008.webp"
    ],
    "description": "Gentle micellar solution formulated for sensitive skin to remove impurities, cleanse and soothe without any harsh rubbing or rinsing needed.",
    "rating": 4.7,
    "total_reviews": 2400,
    "slug": "garnier-skinactive-micellar-solution-sensitive-skin-200ml"
  },
  {
    "product_id": "GAR-SKN-009",
    "title": "Garnier Fructis Repairing Papaya Hair Food Mask (390ml)",
    "category": "Hair Care",
    "brand": "Garnier",
    "mrp": 725,
    "selling_price": 580,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 348,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33059010",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-009.webp"
    ],
    "description": "3-in-1 hair mask with Papaya extract to repair and strengthen damaged hair. Use as mask, conditioner or leave-in treatment for salon-like results.",
    "rating": 4.5,
    "total_reviews": 1850,
    "slug": "garnier-fructis-papaya-hair-food-mask-390ml"
  },
  {
    "product_id": "GAR-SKN-010",
    "title": "Garnier Men Oil Clear Deep Cleansing Icy Face Wash (100g)",
    "category": "Skin Care",
    "brand": "Garnier",
    "mrp": 270,
    "selling_price": 215,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 129,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/GAR-SKN-010.webp"
    ],
    "description": "Oil-clearing face wash with Green Tea extracts and Menthol to absorb excess oil and leave skin feeling fresh and mattified without drying.",
    "rating": 4.5,
    "total_reviews": 3500,
    "slug": "garnier-men-oil-clear-icy-face-wash-100g"
  },
  {
    "product_id": "DAK-SKN-001",
    "title": "Dot & Key Pore Clarifying Vitamin C + E Serum (30ml)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 695,
    "selling_price": 556,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 333,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-001.webp"
    ],
    "description": "Potent Vitamin C + E serum to clarify pores, fade dark spots and brighten skin. Clinically tested, non-comedogenic formula with active botanicals.",
    "rating": 4.7,
    "total_reviews": 1240,
    "slug": "pore-clarifying-vitamin-c-e-face-serum"
  },
  {
    "product_id": "DAK-SKN-002",
    "title": "Dot & Key Barrier Repair Moisture Surge Serum (30ml)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 795,
    "selling_price": 636,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 381,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-002.webp"
    ],
    "description": "Ceramide-powered barrier repair serum with Hyaluronic Acid and Panthenol to restore moisture and protect the skin barrier. Dermatologically tested.",
    "rating": 4.8,
    "total_reviews": 980,
    "slug": "barrier-repair-ceramide-serum"
  },
  {
    "product_id": "DAK-SKN-003",
    "title": "Dot & Key Watermelon Cooling SPF 50 Sunscreen (50g)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 595,
    "selling_price": 476,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 285,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-003.webp"
    ],
    "description": "Lightweight SPF 50 PA+++ sunscreen with Watermelon extract for refreshing protection and hydration. No white cast, non-sticky, suitable for all skin types.",
    "rating": 4.8,
    "total_reviews": 2350,
    "slug": "watermelon-cooling-spf-50-sunscreen"
  },
  {
    "product_id": "DAK-SKN-004",
    "title": "Dot & Key Cica Calming & Healing Face Moisturizer (50ml)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 595,
    "selling_price": 476,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 285,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-004.webp"
    ],
    "description": "Soothing CICA moisturizer with Centella Asiatica, Green Tea and Chamomile to calm redness and irritation, strengthening sensitive skin's barrier.",
    "rating": 4.7,
    "total_reviews": 1100,
    "slug": "cica-calming-healing-face-moisturizer"
  },
  {
    "product_id": "DAK-SKN-005",
    "title": "Dot & Key Vitamin C + E Glow Boosting Brightening Face Wash (100ml)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 395,
    "selling_price": 316,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 189,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-005.webp"
    ],
    "description": "Brightening face wash powered by Vitamin C and E to wash away dullness and reveal a glowing, even complexion. Fragrance-free, dermatologically tested.",
    "rating": 4.6,
    "total_reviews": 890,
    "slug": "vitamin-c-e-glow-boosting-face-wash"
  },
  {
    "product_id": "DAK-SKN-006",
    "title": "Dot & Key Hyaluronic + PGA 72HR Intense Hydration Serum (30ml)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 795,
    "selling_price": 636,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 381,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-006.webp"
    ],
    "description": "72-hour intense hydration serum with Hyaluronic Acid and Polyglutamic Acid for deep moisture binding. Plumps skin and reduces fine lines.",
    "rating": 4.8,
    "total_reviews": 1560,
    "slug": "hyaluronic-pga-72hr-hydration-serum"
  },
  {
    "product_id": "DAK-SKN-007",
    "title": "Dot & Key Vitamin C Face Serum with Pure Vitamin C 15% (30ml)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 795,
    "selling_price": 636,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 381,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-007.webp"
    ],
    "description": "Potent 15% Vitamin C serum with Hyaluronic Acid for intense brightening, dark spot fading and antioxidant protection. Fragrance-free formula.",
    "rating": 4.7,
    "total_reviews": 1890,
    "slug": "vitamin-c-15-face-serum"
  },
  {
    "product_id": "DAK-SKN-008",
    "title": "Dot & Key Retinol Night Repair Face Serum (30ml)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 895,
    "selling_price": 716,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 429,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-008.webp"
    ],
    "description": "Clinically proven Retinol night serum with Bakuchiol and Niacinamide for anti-aging, pore minimizing and skin-renewing benefits while you sleep.",
    "rating": 4.7,
    "total_reviews": 1120,
    "slug": "retinol-night-repair-face-serum"
  },
  {
    "product_id": "DAK-SKN-009",
    "title": "Dot & Key CICA + Zinc Acne & Oil Control Serum (30ml)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 695,
    "selling_price": 556,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 333,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-009.webp"
    ],
    "description": "Acne-fighting serum with CICA, Zinc and Salicylic Acid to reduce breakouts, minimize pores and control excess oil production. Clinically tested.",
    "rating": 4.6,
    "total_reviews": 980,
    "slug": "cica-zinc-acne-oil-control-serum"
  },
  {
    "product_id": "DAK-SKN-010",
    "title": "Dot & Key Pollution + Tan Defense SPF 50 Sunscreen Serum (30ml)",
    "category": "Skin Care",
    "brand": "Dot & Key",
    "mrp": 795,
    "selling_price": 636,
    "discount_percentage": 20,
    "wholesale_price_per_unit": 381,
    "min_order_qty": 10,
    "gst_rate_percent": 18,
    "hsn_code": "33049990",
    "in_stock": true,
    "images": [
      "/images/products/DAK-SKN-010.webp"
    ],
    "description": "Serum-like SPF 50 sunscreen with Vitamin C and B3 to protect against UV, pollution and tan. Lightweight, no white cast, melts into skin instantly.",
    "rating": 4.8,
    "total_reviews": 1750,
    "slug": "pollution-tan-defense-spf-50-sunscreen-serum"
  }
];
