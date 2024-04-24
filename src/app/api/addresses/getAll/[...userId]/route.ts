import { db } from '@/server/database/db';

import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.pathname.split('/').pop();

    if (!userId) {
      return;
    }

    const addresses = await db.address.findMany({
      where: { userId },
    });

    return NextResponse.json(addresses);
  } catch {
    return;
  }
}
