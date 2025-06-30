'use client';

import React, { useEffect } from 'react';
// Removed Next.js specific imports to resolve build errors
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// Import Chart.js components
import { Line, Bar } from 'react-chartjs-2'; // Removed Doughnut as it's unused in this specific component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  // Removed ArcElement as Doughnut is no longer used
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
  // Removed ArcElement registration
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  // Removed useRouter hook as Link and router.push are being replaced with <a> and window.location.href
  // const router = useRouter();

  // Authentication check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      window.location.href = '/login'; // Reverted to window.location.href for redirection
    }
  }, []); // Empty dependency array as router is no longer used

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login'; // Reverted to window.location.href for redirection
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
      const value = base + Math.sin(i * 0.4) * volatility + (i * trend);
      return Math.max(0, Math.round(value + Math.random() * 5));
    });
  };

  const highValueVIPsData = generateSegmentData(10, 5, 1);
  const recentPurchasersData = generateSegmentData(8, 4, 0.5);
  const churnRisksData = generateSegmentData(3, 2, -0.1);
  const newSignupsData = generateSegmentData(5, 3, 0.2);

  const campaignPerformanceData = {
    labels: campaignPerformanceLabels,
    datasets: [
      {
        label: 'High-Value VIPs (Purchases)',
        data: highValueVIPsData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Recent Purchasers (Purchases)',
        data: recentPurchasersData,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Churn Risks (Purchases)',
        data: churnRisksData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'New Sign-ups (Purchases)',
        data: newSignupsData,
        borderColor: 'rgb(54, 162, 235)',
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
        text: 'Campaign Performance by Customer Segment (Total Purchases)',
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
        title: { display: true, text: 'Number of Purchases', font: { size: 14 } }
      },
    },
  };

  // --- Mock Data for Total Revenue vs. Goal Graph (Bar Chart) ---
  const revenueGoalLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const actualRevenueData = [15000, 18000, 22000, 20000, 25000, 28000];
  const targetRevenueData = [16000, 19000, 21000, 23000, 26000, 29000];

  const revenueGoalData = {
    labels: revenueGoalLabels,
    datasets: [
      {
        label: 'Actual Revenue',
        data: actualRevenueData,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Target Revenue',
        data: targetRevenueData,
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
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
        ticks: {
          callback: function(value: unknown) {
            return '$' + (value as number).toLocaleString();
          }
        },
      },
    },
  };


  return (
    <div className="min-h-screen bg-indigo-50 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-blue-600 font-semibold underline">Dashboard</a></li>
            <li><a href="/customers" className="text-blue-600 hover:underline">Customers</a></li>
            <li><a href="/analytics" className="text-blue-600 hover:underline">Analytics</a></li>
            <li><a href="/settings" className="text-blue-600 hover:underline">Settings</a></li>
            <li><a href="/segments" className="text-blue-600 hover:underline">Segments</a></li>
            <li><a href="/campaigns" className="text-blue-600 hover:underline">Campaigns</a></li>
            {/* Monthly Goals link intentionally removed from top navigation as per user's specific request */}
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
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Campaign Performance by Customer Segment</h3>
            <div className="h-full w-full">
              <Line data={campaignPerformanceData} options={campaignPerformanceOptions} />
            </div>
          </div>

          {/* Total Revenue vs. Goal Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96 relative">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Revenue vs. Goal</h3>
            <div className="h-full w-full">
              <Bar data={revenueGoalData} options={revenueGoalOptions} />
            </div>
            {/* Button to Monthly Goals Screen */}
            <div className="absolute bottom-4 right-4">
                <a
                  href="/monthly-goals"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h4m-4 4h4m-5 4h10a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Set Monthly Goals
                </a>
            </div>
          </div>
        </section>

        {/* Campaign Recommendations Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign Recommendations to Meet Goals</h2>
          <p className="text-gray-600 mb-4">Based on your current performance and set goals, here are some campaign strategies to consider:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>**Launch a Flash Sale for High-Value Products:** Target VIP customers with exclusive, time-sensitive discounts to boost immediate revenue.</li>
            <li>**Re-engagement Campaign for Churn Risks:** Send personalized offers or content to customers identified as churn risks to encourage repeat purchases.</li>
            <li>**Upsell/Cross-sell to Recent Purchasers:** Introduce complementary products or premium tiers to customers who have recently made a purchase.</li>
            <li>**Welcome Series with a Strong First-Purchase Incentive:** Optimize your onboarding campaigns for new sign-ups to convert them into first-time buyers more quickly.</li>
            <li>**Optimize Ad Spend on Best-Performing Channels:** Reallocate budget towards channels and campaigns that have historically shown the highest ROI.</li>
          </ul>
        </section>

        {/* Content Generation Link Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Generation Hub</h2>
          <p className="text-gray-600 mb-4">Leverage AI to create tailored marketing messages for various customer cohorts.</p>
          <a
            href="/content-generator"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.28 7.22a.75.75 0 00-1.06 1.06L9.94 10l-2.72 2.72a.75.75 0 101.06 1.06L11 11.06l2.72 2.72a.75.75 0 101.06-1.06L12.06 10l2.72-2.72a.75.75 0 00-1.06-1.06L11 8.94l-2.72-2.72z" />
            </svg>
            Generate AI Content
          </a>
        </section>


        {/* Recent Activities Feed (mock) */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-700">Campaign &quot;Summer Sale&quot; launched.</span>
              <span className="text-gray-500">2 hours ago</span>
            </li>
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-700">10 new customers added to &quot;New Sign-ups&quot; segment.</span>
              <span className="text-gray-500">Yesterday</span>
            </li>
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-700">Email sequence &quot;Welcome Series&quot; completed for 50 users.</span>
              <span className="text-gray-500">2 days ago</span>
            </li>
            <li className="py-3 flex justify-between items-center text-sm">
              <span className="text-gray-700">Low stock alert for Product X triggered.</span>
              <span className="text-gray-500">3 days ago</span>
            </li>
          </ul>
          <div className="mt-4 text-right">
            <a href="/activities" className="text-blue-600 hover:underline text-sm">View all activities</a>
          </div>
        </section>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}
//sjsjjsjss