// autonomous-marketing-mockup/app/analytics/page.tsx

'use client'; // This MUST be the very first line of the file

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Import Chart.js components
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Required for Pie charts
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

  // --- Mock Data for Analytics Metrics ---
  const overviewMetrics = {
    totalRevenue: { value: 75000, label: 'Total Revenue', trend: 'up', change: 15 },
    totalOrders: { value: 1250, label: 'Total Orders', trend: 'up', change: 10 },
    averageOrderValue: { value: 60.00, label: 'Avg. Order Value', trend: 'stable', change: 0 },
    conversionRate: { value: 2.5, label: 'Conversion Rate', trend: 'up', change: 0.2 },
  };

  const formatCurrency = (amount: number) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatPercentage = (value: number) => `${value}%`;

  // --- Date Range State (Mocked) ---
  const [selectedDateRange, setSelectedDateRange] = useState('last30days');

  // --- Mock Data for Charts ---

  // Revenue Trend (Line Chart)
  const revenueTrendLabels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const revenueTrendDataPoints = Array.from({ length: 30 }, (_, i) => 2000 + Math.sin(i * 0.5) * 800 + Math.random() * 300);

  const revenueTrendData = {
    labels: revenueTrendLabels,
    datasets: [
      {
        label: 'Daily Revenue ($)',
        data: revenueTrendDataPoints,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const revenueTrendOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to take available height
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false, text: 'Daily Revenue Trend' },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.2)' },
        ticks: { callback: function(value: any) { return '$' + value.toLocaleString(); } }
      }
    }
  };

  // Conversion Funnel (Bar Chart)
  const funnelLabels = ['Visitors', 'Added to Cart', 'Initiated Checkout', 'Purchases'];
  const funnelDataPoints = [10000, 3500, 1500, 250];

  const conversionFunnelData = {
    labels: funnelLabels,
    datasets: [
      {
        label: 'Count',
        data: funnelDataPoints,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)', // Red
          'rgba(54, 162, 235, 0.7)', // Blue
          'rgba(255, 206, 86, 0.7)', // Yellow
          'rgba(75, 192, 192, 0.7)', // Green/Teal
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

  const conversionFunnelOptions = {
    indexAxis: 'y' as const, // Makes it a horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false, text: 'Conversion Funnel' },
    },
    scales: {
      x: { beginAtZero: true, grid: { color: 'rgba(200, 200, 200, 0.2)' } },
      y: { grid: { display: false } }
    }
  };

  // Traffic Sources (Pie Chart)
  const trafficSourceLabels = ['Direct', 'Organic Search', 'Social Media', 'Paid Ads', 'Referral'];
  const trafficSourceDataPoints = [25, 30, 15, 20, 10]; // Percentages

  const trafficSourceData = {
    labels: trafficSourceLabels,
    datasets: [
      {
        label: '% of Traffic',
        data: trafficSourceDataPoints,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
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

  const trafficSourceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const, // Position legend on the right for pie chart
      },
      title: { display: false, text: 'Traffic Sources' },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      }
    }
  };

  // Top Products (Bar Chart)
  const topProductLabels = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  const topProductDataPoints = [15000, 12000, 9000, 7500, 6000];

  const topProductsData = {
    labels: topProductLabels,
    datasets: [
      {
        label: 'Revenue ($)',
        data: topProductDataPoints,
        backgroundColor: 'rgba(153, 102, 255, 0.7)', // Purple
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const topProductsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false, text: 'Top 5 Products by Revenue' },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.2)' },
        ticks: { callback: function(value: any) { return '$' + value.toLocaleString(); } }
      }
    }
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

      <main className="bg-white p-6 rounded-lg shadow-md">
        {/* Analytics Header & Date Range */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Performance Overview</h2>
          <div className="flex items-center space-x-3">
            <label htmlFor="dateRange" className="text-gray-700 text-sm">View:</label>
            <select
              id="dateRange"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="today">Today</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>
        </div>

        {/* Overview Metrics Cards */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(overviewMetrics).map(([key, metric]) => (
            <div key={key} className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500 uppercase">{metric.label}</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {key.includes('Revenue') || key.includes('Value') ? formatCurrency(metric.value) : key.includes('Rate') ? formatPercentage(metric.value) : metric.value.toLocaleString()}
              </p>
              <div className="flex items-center text-sm mt-2">
                <span className={`mr-1 ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                  {metric.trend === 'up' && '▲ '}
                  {metric.trend === 'down' && '▼ '}
                  {metric.change !== 0 ? `${metric.change}%` : ''}
                </span>
                <span className="text-gray-500">vs. Prior Period</span>
              </div>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trend</h3>
            <div className="h-full w-full">
                <Line data={revenueTrendData} options={revenueTrendOptions} />
            </div>
          </div>

          {/* Conversion Funnel Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Conversion Funnel</h3>
            <div className="h-full w-full">
                <Bar data={conversionFunnelData} options={conversionFunnelOptions} />
            </div>
          </div>

          {/* Traffic Sources Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Traffic Sources</h3>
            <div className="h-4/5 w-4/5 flex items-center justify-center"> {/* Adjust size for pie chart */}
                <Pie data={trafficSourceData} options={trafficSourceOptions} />
            </div>
          </div>

          {/* Top Products Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Top 5 Products by Revenue</h3>
            <div className="h-full w-full">
                <Bar data={topProductsData} options={topProductsOptions} />
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}