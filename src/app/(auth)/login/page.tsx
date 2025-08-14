'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j.error || 'Login failed');
      return;
    }
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 space-y-4">
        <h1 className="text-xl font-semibold">Log in</h1>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <form className="space-y-3" onSubmit={onSubmit}>
          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <a className="underline" href="/signup">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
