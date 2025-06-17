// autonomous-marketing-mockup/app/campaigns/page.tsx

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CampaignsPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Campaign Management</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 hover:underline">Dashboard</Link></li>
            <li><Link href="/settings" className="text-blue-600 hover:underline">Settings</Link></li>
            <li><Link href="/segments" className="text-blue-600 hover:underline">Segments</Link></li>
            <li><Link href="/campaigns" className="text-blue-600 hover:underline">Campaigns</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline focus:outline-none"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <p className="text-gray-600 mb-6">
          This is where you would define, edit, and manage your automated marketing campaigns.
        </p>

        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Campaign List (Coming Soon)</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Campaign 1: Welcome Series</li>
            <li>Campaign 2: Abandoned Cart Recovery</li>
            <li>Campaign 3: Holiday Promotion</li>
          </ul>
          <Link href="#" className="text-blue-600 hover:underline mt-4 block text-sm">
            + Create New Campaign
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">Campaign management features to be implemented here.</p>
        </div>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}