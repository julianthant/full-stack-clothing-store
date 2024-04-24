import { db } from '@/server/database/db';

import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop();

    if (!id) {
      return;
    }

    const address = await db.address.findUnique({
      where: { id },
    });

    return NextResponse.json(address);
  } catch {
    return;
  }
}
