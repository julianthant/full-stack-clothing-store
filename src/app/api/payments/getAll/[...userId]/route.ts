import { db } from '@/server/database/db';

import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.pathname.split('/').pop();

    if (!userId) {
      return;
    }

    const paymentMethods = await db.payment.findMany({
      where: { userId },
    });

    return NextResponse.json(paymentMethods) || [];
  } catch {
    return;
  }
}
