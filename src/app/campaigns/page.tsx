'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFirebaseServices } from '../firebase';

// Mock campaign data with more details
const mockCampaigns = [
  {
    id: 'c1',
    name: 'Summer Seasonal Sale',
    type: 'Email',
    status: 'Active',
    targetAudience: 'All Customers',
    startDate: '2025-07-01',
    endDate: '2025-07-31',
    messagesSent: 150000,
    openRate: '25.3%',
    clickRate: '5.8%',
    conversions: 1250,
    revenue: 75000,
  },
  {
    id: 'c2',
    name: 'Abandoned Cart Recovery',
    type: 'Automation',
    status: 'Active',
    targetAudience: 'Cart Abandoners',
    startDate: '2025-01-01',
    endDate: 'N/A', // Ongoing
    messagesSent: 2500,
    openRate: '45.1%',
    clickRate: '12.3%',
    conversions: 320,
    revenue: 18000,
  },
  {
    id: 'c3',
    name: 'New Customer Welcome Series',
    type: 'Automation',
    status: 'Active',
    targetAudience: 'New Sign-ups',
    startDate: '2025-01-01',
    endDate: 'N/A', // Ongoing
    messagesSent: 5000,
    openRate: '55.0%',
    clickRate: '18.0%',
    conversions: 800,
    revenue: 12000,
  },
  {
    id: 'c4',
    name: 'Spring Collection Launch',
    type: 'SMS',
    status: 'Completed',
    targetAudience: 'Engaged Purchasers',
    startDate: '2025-03-10',
    endDate: '2025-03-15',
    messagesSent: 10000,
    openRate: 'N/A', // SMS usually doesn't have open rate
    clickRate: '7.2%',
    conversions: 500,
    revenue: 40000,
  },
  {
    id: 'c5',
    name: 'Loyalty Program Announcement',
    type: 'Email',
    status: 'Paused',
    targetAudience: 'Existing Customers',
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    messagesSent: 20000,
    openRate: '20.0%',
    clickRate: '3.5%',
    conversions: 150,
    revenue: 5000,
  },
];

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns] = useState(mockCampaigns);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [auth, setAuth] = useState<import('firebase/auth').Auth | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { auth: firebaseAuth, authReadyPromise } = getFirebaseServices();
    if (!firebaseAuth || !authReadyPromise) return;
    setAuth(firebaseAuth);
    authReadyPromise.then(() => {
      const currentUser = firebaseAuth.currentUser;
      if (!currentUser) {
        router.push('/login');
      } else {
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

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = filterStatus === 'All' || campaign.status === filterStatus;
    const matchesType = filterType === 'All' || campaign.type === filterType;
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-600">Loading campaigns...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Campaign Management</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 hover:underline">Dashboard</Link></li>
            <li><Link href="/customers" className="text-blue-600 hover:underline">Customers</Link></li>
            <li><Link href="/analytics" className="text-blue-600 hover:underline">Analytics</Link></li>
            <li><Link href="/settings" className="text-blue-600 hover:underline">Settings</Link></li>
            <li><Link href="/segments" className="text-blue-600 hover:underline">Segments</Link></li>
            <li><Link href="/campaigns" className="text-blue-600 font-semibold underline">Campaigns</Link></li>
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

      <main className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h2 className="text-2xl font-semibold text-gray-700">All Campaigns</h2>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto">
            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full md:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="All">Filter by Status</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>

            {/* Filter by Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="block w-full md:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="All">Filter by Type</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="Automation">Automation</option>
              <option value="Social">Social</option>
            </select>

            {/* Search Input */}
            <div className="relative w-full md:w-auto">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Create New Campaign Button */}
            <Link
              href="/create-campaign"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full md:w-auto"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Campaign
            </Link>
          </div>
        </div>

        {/* Campaign List Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Campaign Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Target Audience
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Messages Sent
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Open Rate
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Click Rate
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{campaign.name}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{campaign.type}</p>
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
                    <p className="text-gray-900 whitespace-no-wrap">{campaign.targetAudience}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{campaign.startDate} - {campaign.endDate}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{campaign.messagesSent.toLocaleString()}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{campaign.openRate}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{campaign.clickRate}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{campaign.conversions.toLocaleString()}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${campaign.revenue.toLocaleString()}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm space-x-3">
                    <button
                        onClick={() => alert(`Viewing details for: ${campaign.name}`)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        View
                    </button>
                    <button
                        onClick={() => alert(`Editing: ${campaign.name}`)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                        Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-10 text-gray-500">No campaigns found matching your criteria.</div>
          )}
        </div>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}

