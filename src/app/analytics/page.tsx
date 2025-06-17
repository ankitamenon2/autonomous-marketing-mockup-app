// autonomous-marketing-mockup/app/analytics/page.tsx

'use client'; // This MUST be the very first line of the file

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Import Chart.js components
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Needed for Doughnut/Pie charts
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
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
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

  // --- Mock Data for Charts ---

  // Revenue Trend Data
  const revenueLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueData = {
    labels: revenueLabels,
    datasets: [
      {
        label: 'Monthly Revenue',
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
      title: { display: true, text: 'Revenue Trend Over Time' },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.2)' },
        ticks: {
          callback: function(value: unknown) { // FIXED: value: any -> value: unknown
            return '$' + (value as number).toLocaleString(); // FIXED: explicit cast
          }
        },
      },
    },
  };

  // Conversion Funnel Data
  const funnelData = {
    labels: ['Website Visitors', 'Leads Generated', 'Opportunities', 'Customers'],
    datasets: [
      {
        label: 'Conversion Stages',
        data: [10000, 3000, 800, 200],
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

  const funnelOptions = {
    responsive: true,
    indexAxis: 'y' as const, // Makes it a horizontal bar chart
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Conversion Funnel Stages' },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function(value: unknown) { // FIXED: value: any -> value: unknown
            return (value as number) + '%'; // FIXED: explicit cast
          }
        }
      },
      y: { grid: { display: false } }
    },
  };

  // Traffic Sources Data
  const trafficData = {
    labels: ['Organic Search', 'Social Media', 'Referral', 'Paid Ads', 'Direct'],
    datasets: [
      {
        label: '# of Users',
        data: [40, 25, 15, 10, 10], // Percentages
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ],
        hoverOffset: 4,
      },
    ],
  };

  const trafficOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' as const },
      title: { display: true, text: 'Traffic Sources Distribution' },
    },
  };

  // Top Products Revenue Data
  const productsData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [
      {
        label: 'Revenue',
        data: [50000, 35000, 25000, 15000, 10000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const productsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Top 5 Products by Revenue' },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function(value: unknown) { // FIXED: value: any -> value: unknown
            return '$' + (value as number).toLocaleString(); // FIXED: explicit cast
          }
        },
      },
      y: { grid: { display: false } },
    },
  };


  return (
    <div className="min-h-screen bg-indigo-50 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
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
        {/* Analytics Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase">Total Conversions</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">2,345</p>
            <div className="flex items-center text-sm mt-2 text-green-600">
              <span className="mr-1">▲ 12%</span>
              <span className="text-gray-500">vs. last month</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase">Avg. Order Value</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">$120.50</p>
            <div className="flex items-center text-sm mt-2 text-red-600">
              <span className="mr-1">▼ 3%</span>
              <span className="text-gray-500">vs. last month</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase">Website Visitors</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">55,789</p>
            <div className="flex items-center text-sm mt-2 text-green-600">
              <span className="mr-1">▲ 8%</span>
              <span className="text-gray-500">vs. last month</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500 uppercase">Customer Retention</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">78%</p>
            <div className="flex items-center text-sm mt-2 text-green-600">
              <span className="mr-1">▲ 1.5%</span>
              <span className="text-gray-500">vs. last month</span>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trend</h3>
            <div className="h-full w-full">
              <Line data={revenueData} options={revenueOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Conversion Funnel</h3>
            <div className="h-full w-full">
              <Bar data={funnelData} options={funnelOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Traffic Sources</h3>
            <div className="h-full w-full">
              <Doughnut data={trafficData} options={trafficOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Top 5 Products by Revenue</h3>
            <div className="h-full w-full">
              <Bar data={productsData} options={productsOptions} />
            </div>
          </div>
        </section>

        {/* Date Range Selector (Placeholder) */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Data</h2>
          <div className="flex items-center space-x-4">
            <label htmlFor="date-range" className="text-gray-700">Select Date Range:</label>
            <select id="date-range" className="block w-48 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last Year</option>
              <option>Custom Range</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Apply
            </button>
          </div>
        </section>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}