import { NextResponse } from 'next/server';
import { seedProducts } from '../../../lib/seedProducts';

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Seed not allowed in production' }, { status: 403 });
  }
  try {
    const result = await seedProducts();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
