import { db } from '@/database/db';

import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop();

    const address = await db.address.findUnique({
      where: { id },
    });

    console.log(address);

    return NextResponse.json(address);
  } catch (error) {
    return null;
  }
}
