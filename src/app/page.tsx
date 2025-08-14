import Image from "next/image";

export default function Home() {
  return (
    
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white shadow rounded-2xl p-8 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Studyfetch Free – Starter</h1>
        <p className="text-slate-600">Use the links below to test auth.</p>
        <div className="space-x-4">
          <a className="underline" href="/signup">Sign up</a>
          <a className="underline" href="/login">Log in</a>
          <a className="underline" href="/dashboard">Dashboard</a>
        </div>
      </div>
    </main>
    
  );
}
