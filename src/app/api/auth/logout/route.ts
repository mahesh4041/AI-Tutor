
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST() {
  // Read current session token (read-only cookies)
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (token) {
    await db.session.delete({ where: { token } }).catch(() => {});
  }

  // Create response and clear the cookie
  const res = NextResponse.json({ ok: true });
  res.cookies.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // expire in the past
    path: '/',
  });
  return res;
}
