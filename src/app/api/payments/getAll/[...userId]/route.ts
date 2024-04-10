import { db } from '@/database/db';

import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.pathname.split('/').pop();

    const paymentMethods = await db.payment.findMany({
      where: { userId },
    });

    return NextResponse.json(paymentMethods) || [];
  } catch {
    return null;
  }
}
