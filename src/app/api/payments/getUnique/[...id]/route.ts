import { db } from '@/database/db';

import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop();

    const paymentMethod = await db.payment.findUnique({
      where: { id },
    });

    console.log(paymentMethod);

    return NextResponse.json(paymentMethod);
  } catch (error) {
    return null;
  }
}