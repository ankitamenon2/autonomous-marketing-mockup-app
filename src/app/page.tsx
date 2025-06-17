// autonomous-marketing-mockup/app/page.tsx

'use client'; // This MUST be the very first line of the file

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Import Chart.js components
import { Line, Bar } from 'react-chartjs-2'; // Import Bar for the second chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // ADDED: Required for Bar charts
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
  BarElement, // ADDED: Registered BarElement here
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const router = useRouter();

  // Authentication check
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

  // --- Mock Data for Dashboard Cards ---
  const overviewMetrics = {
    campaignsActive: { value: 12, label: 'Active Campaigns', trend: 'up', change: 2 },
    customersEngaged: { value: 7800, label: 'Customers Engaged', trend: 'up', change: 15 },
    conversionRate: { value: 3.5, label: 'Conversion Rate', trend: 'up', change: 0.5 },
    totalRevenue: { value: 125000, label: 'Total Revenue', trend: 'up', change: 10 },
  };

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatPercentage = (value: number) => `${value}%`;

  // --- Mock Data for Campaign Performance Graph (Multiple Segments) ---
  const campaignPerformanceLabels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

  const generateSegmentData = (base: number, volatility: number, trend: number) => {
    return Array.from({ length: 30 }, (_, i) => {
      const value = base + Math.sin(i * 0.4) * volatility + (i * trend); // FIXED: Changed 'let' to 'const'
      return Math.max(0, Math.round(value + Math.random() * 50));
    });
  };

  const highValueVIPsData = generateSegmentData(600, 150, 5);
  const recentPurchasersData = generateSegmentData(400, 100, 3);
  const churnRisksData = generateSegmentData(200, 70, -2);
  const newSignupsData = generateSegmentData(100, 50, 1);

  const campaignPerformanceData = {
    labels: campaignPerformanceLabels,
    datasets: [
      {
        label: 'High-Value VIPs',
        data: highValueVIPsData,
        borderColor: 'rgb(75, 192, 192)', // Teal
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Recent Purchasers',
        data: recentPurchasersData,
        borderColor: 'rgb(153, 102, 255)', // Purple
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Churn Risks',
        data: churnRisksData,
        borderColor: 'rgb(255, 99, 132)', // Red
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'New Sign-ups',
        data: newSignupsData,
        borderColor: 'rgb(54, 162, 235)', // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const campaignPerformanceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { font: { size: 14 } }
      },
      title: {
        display: true,
        text: 'Campaign Performance by Customer Segment',
        font: { size: 18 },
        color: '#333'
      },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    hover: { mode: 'nearest' as const, intersect: true },
    scales: {
      x: { grid: { display: false }, title: { display: true, text: 'Day', font: { size: 14 } } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.2)' },
        title: { display: true, text: 'Engagement / Conversion Score', font: { size: 14 } }
      },
    },
  };

  // --- Mock Data for Total Revenue vs. Goal Graph (Bar Chart) ---
  const revenueGoalLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']; // Example months
  const actualRevenueData = [15000, 18000, 22000, 20000, 25000, 28000];
  const targetRevenueData = [16000, 19000, 21000, 23000, 26000, 29000];

  const revenueGoalData = {
    labels: revenueGoalLabels,
    datasets: [
      {
        label: 'Actual Revenue',
        data: actualRevenueData,
        backgroundColor: 'rgba(75, 192, 192, 0.8)', // Teal bars
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Target Revenue',
        data: targetRevenueData,
        backgroundColor: 'rgba(153, 102, 255, 0.8)', // Purple bars
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueGoalOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Total Revenue vs. Goal',
        font: { size: 18 },
        color: '#333'
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.2)' },
        ticks: { callback: function(value: any) { return '$' + value.toLocaleString(); } }
      },
    },
  };


  return (
    <div className="min-h-screen bg-indigo-50 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 font-semibold underline">Dashboard</Link></li>
            <li><Link href="/customers" className="text-blue-600 hover:underline">Customers</Link></li>
            <li><Link href="/analytics" className="text-blue-600 hover:underline">Analytics</Link></li>
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
        {/* Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(overviewMetrics).map(([key, metric]) => (
            <div key={key} className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500 uppercase">{metric.label}</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {key.includes('Revenue') ? formatCurrency(metric.value) : key.includes('Rate') ? formatPercentage(metric.value) : metric.value.toLocaleString()}
              </p>
              <div className="flex items-center text-sm mt-2">
                <span className={`mr-1 ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                  {metric.trend === 'up' && '▲ '}
                  {metric.trend === 'down' && '▼ '}
                  {metric.change !== 0 ? `${metric.change}${key.includes('Rate') ? '%' : ''}` : ''}
                </span>
                <span className="text-gray-500">vs. last month</span>
              </div>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Campaign Performance Graph */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Campaign Performance by Segment</h3>
            <div className="h-full w-full">
              <Line data={campaignPerformanceData} options={campaignPerformanceOptions} />
            </div>
          </div>

          {/* Total Revenue vs. Goal Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Revenue vs. Goal</h3>
            <div className="h-full w-full">
              <Bar data={revenueGoalData} options={revenueGoalOptions} />
            </div>
          </div>
        </section>

        {/* Brand Guide Card */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Brand Guidelines</h2>
          <p className="text-gray-600 mb-4">Ensure all AI-generated content and campaigns adhere to your brand&apos;s voice and style.</p>
          <Link
            href="/brand-guide"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L14.586 5A2 2 0 0115 5.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h7V5.414L10.586 3A.5.5 0 0010 2.414V2H6a.5.5 0 00-.5.5v1A.5.5 0 006 4zM9 9a1 1 0 000 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            Edit Brand Guide
          </Link>
        </section>


        {/* Recent Activities Feed (mock) */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-700">Campaign "Summer Sale" launched.</span>
              <span className="text-gray-500">2 hours ago</span>
            </li>
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-700">10 new customers added to "New Sign-ups" segment.</span>
              <span className="text-gray-500">Yesterday</span>
            </li>
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-700">Email sequence "Welcome Series" completed for 50 users.</span>
              <span className="text-gray-500">2 days ago</span>
            </li>
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-700">Low stock alert for Product X triggered.</span>
              <span className="text-gray-500">3 days ago</span>
            </li>
          </ul>
          <div className="mt-4 text-right">
            <Link href="/activities" className="text-blue-600 hover:underline text-sm">View all activities</Link>
          </div>
        </section>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}