'use client';

import React, { useEffect, useState } from 'react';
// Removed Next.js specific imports to resolve build errors
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// Mock customer data (replace with API calls in a real application)
const mockCustomers = [
  { id: 1, name: 'Alice Wonderland', email: 'alice@example.com', phone: '+1-555-123-4567', segment: 'High-Value VIPs', lastPurchase: '2025-06-10', totalSpent: 1250.50, repeatPurchaseCount: 3 },
  { id: 2, name: 'Bob The Builder', email: 'bob@example.com', phone: '+1-555-234-5678', segment: 'Recent Purchasers', lastPurchase: '2025-06-13', totalSpent: 75.00, repeatPurchaseCount: 1 },
  { id: 3, name: 'Charlie Chaplin', email: 'charlie@example.com', phone: '+1-555-345-6789', segment: 'Newsletter Subscribers', lastPurchase: null, totalSpent: 0, repeatPurchaseCount: 0 },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '+1-555-456-7890', segment: 'High-Value VIPs', lastPurchase: '2025-06-05', totalSpent: 1890.75, repeatPurchaseCount: 5 },
  { id: 5, name: 'Eve Harrington', email: 'eve@example.com', phone: '+1-555-567-8901', segment: 'First-Time Buyers', lastPurchase: '2025-06-12', totalSpent: 45.20, repeatPurchaseCount: 1 },
  { id: 6, name: 'Frankenstein Monster', email: 'frank@example.com', phone: '+1-555-678-9012', segment: 'Newsletter Subscribers', lastPurchase: null, totalSpent: 0, repeatPurchaseCount: 0 },
  { id: 7, name: 'Greta Garbo', email: 'greta@example.com', phone: '+1-555-789-0123', segment: 'High-Value VIPs', lastPurchase: '2025-06-01', totalSpent: 2100.00, repeatPurchaseCount: 7 },
  { id: 8, name: 'Hans Solo', email: 'hans@example.com', phone: '+1-555-890-1234', segment: 'Recent Purchasers', lastPurchase: '2025-06-11', totalSpent: 92.99, repeatPurchaseCount: 2 },
  { id: 9, name: 'Ivy Smith', email: 'ivy@example.com', phone: '+1-555-901-2345', segment: 'First-Time Buyers', lastPurchase: '2025-06-14', totalSpent: 29.50, repeatPurchaseCount: 1 },
  { id: 10, name: 'Jack Sparrow', email: 'jack@example.com', phone: '+1-555-012-3456', segment: 'Newsletter Subscribers', lastPurchase: null, totalSpent: 0, repeatPurchaseCount: 0 },
];

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

export default function CustomersPage() {
  // Removed useRouter hook
  // const router = useRouter();
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredCustomers = mockCustomers.filter(customer =>
      customer.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      customer.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
      (customer.phone && customer.phone.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setCustomers(filteredCustomers);
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-blue-600 hover:underline">Dashboard</a></li>
            <li><a href="/customers" className="text-blue-600 font-semibold underline">Customers</a></li>
            <li><a href="/analytics" className="text-blue-600 hover:underline">Analytics</a></li>
            <li><a href="/settings" className="text-blue-600 hover:underline">Settings</a></li>
            <li><a href="/segments" className="text-blue-600 hover:underline">Segments</a></li>
            <li><a href="/campaigns" className="text-blue-600 hover:underline">Campaigns</a></li>
            {/* Monthly Goals link removed from top navigation as per Dashboard consistency */}
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
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-700">Customer List</h2>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Segment
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Purchase
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Repeat Customer
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{customer.name}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{customer.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{customer.phone}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span className="relative">{customer.segment}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{formatDate(customer.lastPurchase)}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{formatCurrency(customer.totalSpent)}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {customer.repeatPurchaseCount > 1 ? `Yes (${customer.repeatPurchaseCount})` : 'No'}
                    </p>
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