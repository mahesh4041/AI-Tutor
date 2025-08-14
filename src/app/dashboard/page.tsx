import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const user = await getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <form action="/api/auth/logout" method="POST">
            <button className="px-3 py-2 rounded bg-neutral-200" type="submit">
              Log out
            </button>
          </form>
        </div>

        <div className="rounded-2xl bg-white shadow p-6">
          <p>
            Welcome, <span className="font-medium">{user.email}</span>.
          </p>
          <p className="text-sm text-slate-600 mt-2">
            We’ll add your documents list and upload here in the next steps.
          </p>
        </div>
      </div>
    </div>
  );
}
