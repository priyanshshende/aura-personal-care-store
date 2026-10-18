import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const DELIVERY_CHARGE = 49;
const FREE_DELIVERY_THRESHOLD = 499;

interface RequestItem {
  productId: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const orderEmail = process.env.ORDER_EMAIL;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: RESEND_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    if (!orderEmail) {
      return NextResponse.json(
        { error: 'Server configuration error: ORDER_EMAIL destination is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, phoneNumber, latitude, longitude, items } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Customer name is required.' }, { status: 400 });
    }

    if (!phoneNumber || typeof phoneNumber !== 'string' || !INDIAN_PHONE_REGEX.test(phoneNumber.trim())) {
      return NextResponse.json(
        { error: 'Valid 10-digit Indian phone number (starting with 6–9) is required.' },
        { status: 400 }
      );
    }

    const lat = Number(latitude);
    const lng = Number(longitude);
    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { error: 'Valid GPS coordinates (latitude and longitude) are required.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart items are required.' }, { status: 400 });
    }

    // 2. Connect to MongoDB and fetch product details
    await dbConnect();

    const productIds = items.map((item: RequestItem) => item.productId);
    const dbProducts = await Product.find({ product_id: { $in: productIds } }).lean();

    if (!dbProducts || dbProducts.length === 0) {
      return NextResponse.json({ error: 'None of the requested products were found in store.' }, { status: 400 });
    }

    // 3. Recompute totals using server-side product data
    let subtotal = 0;
    let totalDiscount = 0;
    const itemDetails: Array<{
      title: string;
      quantity: number;
      price: number;
      mrp: number;
      lineTotal: number;
    }> = [];

    for (const item of items as RequestItem[]) {
      const product = dbProducts.find((p) => p.product_id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product with ID '${item.productId}' does not exist in inventory.` },
          { status: 400 }
        );
      }

      const quantity = Math.max(1, Number(item.quantity) || 1);
      const mrp = Number(product.mrp) || 0;
      const sellingPrice =
        product.selling_price !== undefined && product.selling_price !== null
          ? Number(product.selling_price)
          : mrp;

      const lineTotal = sellingPrice * quantity;
      const savings = (mrp - sellingPrice) * quantity;

      subtotal += mrp * quantity;
      if (savings > 0) {
        totalDiscount += savings;
      }

      itemDetails.push({
        title: product.title,
        quantity,
        price: sellingPrice,
        mrp,
        lineTotal,
      });
    }

    const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
    const finalTotal = subtotal - totalDiscount + deliveryCharge;
    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

    // 4. Build Email Content
    const itemsListText = itemDetails
      .map(
        (i) =>
          `- ${i.title}\n  Qty: ${i.quantity} | Unit Price: ₹${i.price.toFixed(2)} | Subtotal: ₹${i.lineTotal.toFixed(2)}`
      )
      .join('\n\n');

    const textBody = `NEW ORDER RECEIVED

CUSTOMER INFORMATION:
- Name: ${name.trim()}
- Phone: ${phoneNumber.trim()}
- GPS Latitude: ${lat}
- GPS Longitude: ${lng}
- Google Maps Location: ${googleMapsLink}

ORDER ITEMS:
${itemsListText}

PRICING SUMMARY:
- Subtotal: ₹${subtotal.toFixed(2)}
- Discount: -₹${totalDiscount.toFixed(2)}
- Delivery: ${deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}
- TOTAL AMOUNT: ₹${finalTotal.toFixed(2)}
`;

    const itemsRowsHtml = itemDetails
      .map(
        (i) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 10px 8px; font-weight: 500;">${i.title}</td>
          <td style="padding: 10px 8px; text-align: center;">${i.quantity}</td>
          <td style="padding: 10px 8px; text-align: right;">₹${i.price.toFixed(2)}</td>
          <td style="padding: 10px 8px; text-align: right; font-weight: 600;">₹${i.lineTotal.toFixed(2)}</td>
        </tr>
      `
      )
      .join('');

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; color: #1f2937;">
        <h2 style="color: #4f46e5; margin-bottom: 16px; border-bottom: 2px solid #4f46e5; padding-bottom: 8px;">
          🛒 New Store Order
        </h2>

        <div style="background-color: #f9fafb; padding: 14px; border-radius: 6px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 16px;">Customer Details</h3>
          <p style="margin: 4px 0;"><strong>Name:</strong> ${name.trim()}</p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> <a href="tel:${phoneNumber.trim()}">${phoneNumber.trim()}</a></p>
          <p style="margin: 4px 0;"><strong>Coordinates:</strong> ${lat}, ${lng}</p>
          <p style="margin: 8px 0 0 0;">
            <a href="${googleMapsLink}" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 13px;">
              📍 Open Customer Location in Google Maps
            </a>
          </p>
        </div>

        <h3 style="margin-bottom: 8px; font-size: 16px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f3f4f6; text-align: left;">
              <th style="padding: 8px;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Price</th>
              <th style="padding: 8px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRowsHtml}
          </tbody>
        </table>

        <div style="background-color: #f9fafb; padding: 14px; border-radius: 6px; font-size: 14px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span>Subtotal:</span>
            <span>₹${subtotal.toFixed(2)}</span>
          </div>
          ${
            totalDiscount > 0
              ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: #16a34a;">
            <span>Discount:</span>
            <span>-₹${totalDiscount.toFixed(2)}</span>
          </div>`
              : ''
          }
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span>Delivery:</span>
            <span>${deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid #d1d5db; padding-top: 8px; font-weight: bold; font-size: 16px; margin-top: 6px;">
            <span>Order Total:</span>
            <span style="color: #4f46e5;">₹${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;

    // 5. Send Email via Resend API
    const resendFrom =
      process.env.RESEND_FROM_EMAIL || 'Personal Care Store <onboarding@resend.dev>';

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [orderEmail],
        subject: `🛒 New Order from ${name.trim()} - ₹${finalTotal.toFixed(2)}`,
        text: textBody,
        html: htmlBody,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      const errorMessage =
        resendData?.message ||
        resendData?.error?.message ||
        'Failed to send order email via Resend.';
      return NextResponse.json(
        {
          error: `Resend error (${resendRes.status}): ${errorMessage}. If using custom domain, verify it in your Resend account.`,
        },
        { status: resendRes.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order received and email notification sent successfully.',
        orderId: resendData.id,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err?.message || 'An unexpected server error occurred while processing order.' },
      { status: 500 }
    );
  }
}
