// src/lib/auth.ts
import { cookies } from 'next/headers';
import { db } from './db';
import { randomUUID } from 'crypto';

// 7 days
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export async function createSession(userId: string) {
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.session.create({
    data: { userId, token, expiresAt },
  });

  // IMPORTANT: we return token/expiry; Route Handler will set the cookie.
  return { token, expiresAt };
}

export async function getUser() {
  // In your environment cookies() returns a Promise<ReadonlyRequestCookies>
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) return null;
  return session.user;
}
