'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFirebaseServices } from '../firebase'; // Assuming firebase.js is in the parent directory

// Import Chart.js components
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components. Crucial for Chart.js v3+
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<import('firebase/auth').Auth | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Firebase Initialization and Authentication Check
  useEffect(() => {
    const { auth: firebaseAuth, authReadyPromise } = getFirebaseServices();
    if (!firebaseAuth || !authReadyPromise) return;
    setAuth(firebaseAuth);
    authReadyPromise.then(() => {
      const currentUser = firebaseAuth.currentUser;
      if (!currentUser) {
        router.push('/login');
      } else {
        setIsAuthReady(true);
        setIsLoading(false);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
    }
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  // --- Mock Data for Campaign-Focused Analytics ---

  // Campaign-Driven Revenue Trend Data
  const revenueLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = {
    labels: revenueLabels,
    datasets: [
      {
        label: 'Campaign-Driven Monthly Revenue',
        data: [15000, 18000, 22000, 20000, 25000, 28000, 30000, 32000, 35000, 38000, 40000, 42000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Campaign-Driven Revenue Trend Over Time' },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.2)' },
        ticks: {
          callback: function(value: unknown) {
            return '$' + (value as number).toLocaleString();
          }
        },
      },
    },
  };

  // Campaign Performance Funnel
  const campaignFunnelData = {
    labels: ['Messages Sent', 'Messages Opened', 'Links Clicked', 'Conversions'],
    datasets: [
      {
        label: 'Campaign Funnel Stages',
        data: [50000, 15000, 3000, 500],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const campaignFunnelOptions = {
    responsive: true,
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Campaign Engagement Funnel' },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function(value: unknown) {
            return (value as number).toLocaleString();
          }
        }
      },
      y: { grid: { display: false } }
    },
  };

  // Mock data for Campaign Performance Table
  const mockCampaigns = [
    {
      id: 1,
      name: 'Summer Sale Blast',
      lastRun: '2025-06-20',
      status: 'Active',
      messagesSent: 15000,
      peopleReached: 12000,
      linkClicks: 3500,
      revenueGenerated: 15500,
      conversionRate: 2.5,
      ctr: 23.3,
      working: true,
    },
    {
      id: 2,
      name: 'Welcome Series (New Signups)',
      lastRun: '2025-06-25',
      status: 'Active',
      messagesSent: 2000,
      peopleReached: 2000,
      linkClicks: 800,
      revenueGenerated: 2100,
      conversionRate: 1.8,
      ctr: 40.0,
      working: true,
    },
    {
      id: 3,
      name: 'Inactive Customer Re-engagement',
    lastRun: '2025-06-15',
      status: 'Paused',
      messagesSent: 5000,
      peopleReached: 4500,
      linkClicks: 300,
      revenueGenerated: 500,
      conversionRate: 0.5,
      ctr: 6.0,
      working: false,
    },
    {
      id: 4,
      name: 'VIP Early Access Promo',
      lastRun: '2025-06-18',
      status: 'Completed',
      messagesSent: 1000,
      peopleReached: 1000,
      linkClicks: 450,
      revenueGenerated: 8000,
      conversionRate: 5.0,
      ctr: 45.0,
      working: true,
    },
    {
      id: 5,
      name: 'Holiday Gifting Guide',
      lastRun: '2024-12-01',
      status: 'Archived',
      messagesSent: 25000,
      peopleReached: 20000,
      linkClicks: 6000,
      revenueGenerated: 25000,
      conversionRate: 3.0,
      ctr: 24.0,
      working: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-50 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Campaign Analytics</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 hover:underline">Dashboard</Link></li>
            <li><Link href="/customers" className="text-blue-600 hover:underline">Customers</Link></li>
            <li><Link href="/analytics" className="text-blue-600 font-semibold underline">Analytics</Link></li>
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

      <main>
        {/* Campaign Analytics Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase">Total Campaigns Launched</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">18</p>
            <div className="flex items-center text-sm mt-2 text-green-600">
              <span className="mr-1">▲ 3</span>
              <span className="text-gray-500">since last month</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase">Total Messages Sent</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">250,000</p>
            <div className="flex items-center text-sm mt-2 text-green-600">
              <span className="mr-1">▲ 15%</span>
              <span className="text-gray-500">vs. last month</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase">Total Link Clicks</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">12,500</p>
            <div className="flex items-center text-sm mt-2 text-green-600">
              <span className="mr-1">▲ 10%</span>
              <span className="text-gray-500">vs. last month</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase">Campaign Conversion Rate</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">3.2%</p>
            <div className="flex items-center text-sm mt-2 text-green-600">
              <span className="mr-1">▲ 0.4%</span>
              <span className="text-gray-500">vs. last month</span>
            </div>
          </div>
        </section>

        {/* Campaign Performance Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Campaign-Driven Revenue Trend</h3>
            <div className="h-full w-full">
              <Line data={revenueData} options={revenueOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Campaign Engagement Funnel</h3>
            <div className="h-full w-full">
              <Bar data={campaignFunnelData} options={campaignFunnelOptions} />
            </div>
          </div>
        </section>

        {/* Campaign Performance Table (Working vs. Not Working) */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Performance Overview</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Campaign Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Last Run
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Messages Sent
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Link Clicks
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                CTR (%)
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Revenue
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Performance
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {mockCampaigns.map((campaign) => (
                            <tr key={campaign.id}>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{campaign.name}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{campaign.lastRun}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                                        campaign.status === 'Active' ? 'text-green-900' :
                                        campaign.status === 'Paused' ? 'text-yellow-900' :
                                        'text-gray-900'
                                    }`}>
                                        <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${
                                            campaign.status === 'Active' ? 'bg-green-200' :
                                            campaign.status === 'Paused' ? 'bg-yellow-200' :
                                            'bg-gray-200'
                                        }`}></span>
                                        <span className="relative">{campaign.status}</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{campaign.messagesSent.toLocaleString()}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{campaign.linkClicks.toLocaleString()}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">{campaign.ctr}%</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">${campaign.revenueGenerated.toLocaleString()}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                                        campaign.working ? 'text-green-900' : 'text-red-900'
                                    }`}>
                                        <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${
                                            campaign.working ? 'bg-green-200' : 'bg-red-200'
                                        }`}></span>
                                        <span className="relative">{campaign.working ? 'Working Well' : 'Needs Review'}</span>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {mockCampaigns.length === 0 && (
                  <div className="text-center py-10 text-gray-500">No campaigns found matching your criteria.</div>
                )}
              </div>
            </section>
          </main>

          <footer className="text-center text-gray-500 mt-8">
            <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
          </footer>
        </div>
  );
}