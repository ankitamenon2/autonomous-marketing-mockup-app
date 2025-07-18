'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFirebaseServices } from '../firebase';

export default function CreateCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form states for Campaign Details
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('Email');
  const [campaignDescription, setCampaignDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Form states for Audience
  const [targetAudienceType, setTargetAudienceType] = useState('All Customers');
  const [minTotalSpent, setMinTotalSpent] = useState(0);
  const [lastPurchaseDaysAgo, setLastPurchaseDaysAgo] = useState(0);

  // Form states for Content & Budget
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [callToActionLink, setCallToActionLink] = useState('');
  const [budget, setBudget] = useState(0);
  const [campaignGoal, setCampaignGoal] = useState('Conversions');

  const [auth, setAuth] = useState<import('firebase/auth').Auth | null>(null);
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

  const handleNextStep = () => {
    // Basic validation for current step before moving on
    if (step === 1) {
      if (!campaignName || !campaignType || !startDate || !endDate) {
        alert('Please fill in all campaign details.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmitCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, send all collected data to a backend API
    console.log('New Campaign Data:', {
      campaignName,
      campaignType,
      campaignDescription,
      startDate,
      endDate,
      targetAudienceType,
      minTotalSpent,
      lastPurchaseDaysAgo,
      messageSubject,
      messageBody,
      callToActionLink,
      budget,
      campaignGoal,
    });
    alert('Campaign Created Successfully! (Mock submission)');
    router.push('/campaigns');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-600">Loading form...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Create New Campaign</h1>
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

      <main className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200'}`}>1. Campaign Details</span>
            <span className="h-0.5 w-8 bg-gray-300 mx-2"></span>
            <span className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200'}`}>2. Audience Targeting</span>
            <span className="h-0.5 w-8 bg-gray-300 mx-2"></span>
            <span className={`px-3 py-1 rounded-full ${step >= 3 ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200'}`}>3. Content & Budget</span>
          </div>
        </div>

        <form onSubmit={handleSubmitCampaign} className="space-y-6">
          {/* Step 1: Campaign Details */}
          {step === 1 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Campaign Details</h2>
              <div>
                <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  id="campaignName"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Summer Flash Sale"
                  required
                />
              </div>
              <div>
                <label htmlFor="campaignType" className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                <select
                  id="campaignType"
                  value={campaignType}
                  onChange={(e) => setCampaignType(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                  <option value="Push Notification">Push Notification</option>
                  <option value="In-App Message">In-App Message</option>
                  <option value="Social Media">Social Media Post</option>
                  <option value="Automation">Automated Series</option>
                </select>
              </div>
              <div>
                <label htmlFor="campaignDescription" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  id="campaignDescription"
                  rows={3}
                  value={campaignDescription}
                  onChange={(e) => setCampaignDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Briefly describe the campaign's purpose."
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleNextStep}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-right"
              >
                Next: Audience
              </button>
            </section>
          )}

          {/* Step 2: Audience Targeting */}
          {step === 2 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Audience Targeting</h2>
              <div>
                <label htmlFor="targetAudienceType" className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <select
                  id="targetAudienceType"
                  value={targetAudienceType}
                  onChange={(e) => setTargetAudienceType(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="All Customers">All Customers</option>
                  <option value="New Sign-ups (Last 30 Days)">New Sign-ups (Last 30 Days)</option>
                  <option value="High-Value VIPs">High-Value VIPs</option>
                  <option value="Cart Abandoners (Last 24h)">Cart Abandoners (Last 24h)</option>
                  <option value="Inactive Users (90+ Days)">Inactive Users (90+ Days)</option>
                  <option value="Custom Segment">Custom Segment (define below)</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">Select a predefined segment or define custom criteria.</p>
              </div>

              {targetAudienceType === 'Custom Segment' && (
                <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Custom Segment Criteria</h3>
                  <div>
                    <label htmlFor="minTotalSpent" className="block text-sm font-medium text-gray-700 mb-1">Minimum Total Spent ($)</label>
                    <input
                      type="number"
                      id="minTotalSpent"
                      value={minTotalSpent}
                      onChange={(e) => setMinTotalSpent(Number(e.target.value))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastPurchaseDaysAgo" className="block text-sm font-medium text-gray-700 mb-1">Last Purchase (Days Ago)</label>
                    <input
                      type="number"
                      id="lastPurchaseDaysAgo"
                      value={lastPurchaseDaysAgo}
                      onChange={(e) => setLastPurchaseDaysAgo(Number(e.target.value))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Target customers who haven&apos;t purchased in this many days (e.g., 90 for inactive).</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next: Content
                </button>
              </div>
            </section>
          )}

          {/* Step 3: Content & Budget */}
          {step === 3 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Content & Budget</h2>
              <div>
                <label htmlFor="messageSubject" className="block text-sm font-medium text-gray-700 mb-1">Message Subject (for Email/Push)</label>
                <input
                  type="text"
                  id="messageSubject"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Your Summer Sale Savings Are Here!"
                />
              </div>
              <div>
                <label htmlFor="messageBody" className="block text-sm font-medium text-gray-700 mb-1">Message Body</label>
                <textarea
                  id="messageBody"
                  rows={8}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Compose your campaign message here. Use AI Content Generation for help!"
                ></textarea>
                <Link href="/content-generator" target="_blank" className="text-sm text-blue-600 hover:underline mt-1 block">
                  Open AI Content Generator <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <div>
                <label htmlFor="callToActionLink" className="block text-sm font-medium text-gray-700 mb-1">Call to Action Link (URL)</label>
                <input
                  type="url"
                  id="callToActionLink"
                  value={callToActionLink}
                  onChange={(e) => setCallToActionLink(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., https://yourstore.com/sale"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Campaign Budget ($)</label>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  min="0"
                />
                <p className="text-sm text-gray-500 mt-1">Allocate budget for paid campaigns (e.g., SMS cost, ad spend).</p>
              </div>
              <div>
                <label htmlFor="campaignGoal" className="block text-sm font-medium text-gray-700 mb-1">Primary Campaign Goal</label>
                <select
                  id="campaignGoal"
                  value={campaignGoal}
                  onChange={(e) => setCampaignGoal(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="Conversions">Conversions (Purchases)</option>
                  <option value="Engagement">Engagement (Clicks/Opens)</option>
                  <option value="Awareness">Brand Awareness</option>
                  <option value="Lead Generation">Lead Generation</option>
                </select>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Create Campaign
                </button>
              </div>
            </section>
          )}
        </form>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}
