'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student',
    subject: '',
    bio: '',
    agree: false,
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agree) {
      setErr('You must agree to the terms.');
      return;
    }
    setErr(null);
    setLoading(true);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j.error || 'Signup failed');
      return;
    }
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create your AI Tutor account</h1>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <form className="space-y-3" onSubmit={onSubmit}>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            type="password"
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            minLength={6}
            required
          />
          <select
            className="w-full border rounded px-3 py-2"
            value={form.role}
            onChange={(e) => update('role', e.target.value)}
          >
            <option>Student</option>
            <option>Teacher</option>
            <option>Other</option>
          </select>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Field of Study (optional)"
            value={form.subject}
            onChange={(e) => update('subject', e.target.value)}
          />
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Tell us a bit about yourself (optional)"
            rows={3}
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
          />
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => update('agree', e.target.checked)}
            />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>
          <button
            className="w-full bg-black text-white rounded px-3 py-2 disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <a className="underline" href="/login">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
