import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';

export async function POST(req: Request) {
  const { name, email, password, role, subject, bio } = await req.json();

  if (!email || !password || password.length < 6 || !name) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await db.user.create({
    data: { name, email, passwordHash, role, subject, bio },
  });

  const { token, expiresAt } = await createSession(user.id);

  const res = NextResponse.json({ ok: true });
  res.cookies.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
  });
  return res;
}
