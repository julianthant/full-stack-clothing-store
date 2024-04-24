import { db } from '@/server/database/db';

import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop();

    if (!id) {
      return;
    }

    const paymentMethod = await db.payment.findUnique({
      where: { id },
    });

    return NextResponse.json(paymentMethod);
  } catch (error) {
    return;
  }
}
