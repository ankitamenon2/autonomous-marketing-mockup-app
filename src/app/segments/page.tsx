// autonomous-marketing-mockup/app/segments/page.tsx

'use client'; // This MUST be the very first line

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation

export default function SegmentsPage() {
  const router = useRouter();

  // Authentication check: Redirect to login if not authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  // Helper function to format numbers with 'k' suffix for thousands
  const formatK = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'k';
    }
    return num.toString();
  };

  // Helper function to format currency with '$' and 'M' suffix for millions
  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return '$' + (amount / 1000000).toFixed(2) + 'M';
    }
    // For smaller amounts, use toLocaleString for standard currency formatting
    return '$' + amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Mock data for customer segments, with original names and new metrics
  const customerSegments = [
    { id: 1, name: 'High-Value VIPs', rfm: true, size: 4120, orders: 26610, revenue: 3640000, ltv30d: 222.43, ltv60d: 275.48, ltv365d: 565.97 }, // Corresponds to 'Whales'
    { id: 2, name: 'Recent Purchasers', rfm: true, size: 193290, orders: 327130, revenue: 29280000, ltv30d: 102.76, ltv60d: 108.38, ltv365d: 132.00 }, // Corresponds to 'Newbies'
    { id: 3, name: 'Abandoned Carts', rfm: false, size: 11370, orders: 92020, revenue: 4330000, ltv30d: 114.05, ltv60d: 138.71, ltv365d: 272.84 }, // Corresponds to 'Promising'
    { id: 4, name: 'Inactive Users', rfm: true, size: 613920, orders: 815470, revenue: 63440000, ltv30d: 85.37, ltv60d: 88.57, ltv365d: 99.47 }, // Corresponds to 'Lost'
    { id: 5, name: 'First-Time Buyers', rfm: false, size: 2430, orders: 15080, revenue: 2060000, ltv30d: 222.51, ltv60d: 271.66, ltv365d: 551.05 }, // Corresponds to 'Core'
    { id: 6, name: 'Newsletter Subscribers', rfm: false, size: 20610, orders: 132440, revenue: 11140000, ltv30d: 146.36, ltv60d: 178.53, ltv365d: 356.51 }, // Corresponds to 'Loyal'
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear the authentication flag
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Customer Segments</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 hover:underline">Dashboard</Link></li>
            <li><Link href="/settings" className="text-blue-600 hover:underline">Settings</Link></li>
            {/* This link is for the current Segments page itself */}
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

      <main className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
        <p className="text-gray-600 mb-6">
          View and analyze your customer segments based on various metrics.
        </p>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {/* Checkbox for select all if needed */}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LTV after 30d
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LTV after 60d
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LTV after 365d
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerSegments.map(segment => (
                <tr key={segment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                    {segment.rfm && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                        RFM
                      </span>
                    )}
                    {segment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatK(segment.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatK(segment.orders)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(segment.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(segment.ltv30d)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(segment.ltv60d)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(segment.ltv365d)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}