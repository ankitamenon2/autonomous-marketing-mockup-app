'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [isBillingDropdownOpen, setIsBillingDropdownOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  // Dummy state for various settings (replace with actual state management/API calls)
  const [companyName, setCompanyName] = useState('Autonomous Marketing Co.');
  const [emailAddress, setEmailAddress] = useState('admin@example.com');
  const [ecommercePlatform, setEcommercePlatform] = useState('Shopify');
  const [twilioApiKey, setTwilioApiKey] = useState('sk_xxxxxxxxxxxxxxx');
  const [sendgridApiKey, setSendgridApiKey] = useState('SG.yyyyyyyyyyyyyyyy');
  const [aiTone, setAiTone] = useState('Professional & Engaging');
  const [aiCreativity, setAiCreativity] = useState('Medium');
  const [dailySendTime, setDailySendTime] = useState('09:00 AM');
  const [freqCapDays, setFreqCapDays] = useState(7);
  const [dataSyncFrequency, setDataSyncFrequency] = useState('Daily');
  const [lowCreditAlert, setLowCreditAlert] = useState(true);
  const [campaignFailureAlert, setCampaignFailureAlert] = useState(true);

  // Function to simulate saving settings
  const handleSaveSettings = (section: string) => {
    alert(`Settings saved for ${section}! (This is a mock save)`);
    console.log(`Saving ${section} settings:`, {
      companyName, emailAddress, ecommercePlatform, twilioApiKey, sendgridApiKey,
      aiTone, aiCreativity, dailySendTime, freqCapDays, dataSyncFrequency,
      lowCreditAlert, campaignFailureAlert
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 hover:underline">Dashboard</Link></li>
            <li><Link href="/customers" className="text-blue-600 hover:underline">Customers</Link></li>
            <li><Link href="/analytics" className="text-blue-600 hover:underline">Analytics</Link></li>
            <li><Link href="/settings" className="text-blue-600 font-semibold underline">Settings</Link></li>
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

      <main className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto flex flex-col md:flex-row">
        <nav className="md:w-1/4 pr-6 mb-6 md:mb-0 border-b md:border-b-0 md:border-r border-gray-200">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => { setActiveSection('general'); setIsBillingDropdownOpen(false); }}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  activeSection === 'general' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                General
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveSection('integrations'); setIsBillingDropdownOpen(false); }}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  activeSection === 'integrations' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Integrations
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveSection('ai_content'); setIsBillingDropdownOpen(false); }}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  activeSection === 'ai_content' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                AI & Content
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveSection('automation_defaults'); setIsBillingDropdownOpen(false); }}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  activeSection === 'automation_defaults' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Automation Defaults
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveSection('data_segmentation'); setIsBillingDropdownOpen(false); }}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  activeSection === 'data_segmentation' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Data & Segmentation
              </button>
            </li>
            <li>
              <button
                onClick={() => { setActiveSection('notifications'); setIsBillingDropdownOpen(false); }}
                className={`w-full text-left p-2 rounded-md transition-colors ${
                  activeSection === 'notifications' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Notifications
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSection('billing');
                  setIsBillingDropdownOpen(!isBillingDropdownOpen);
                }}
                className={`w-full text-left p-2 rounded-md transition-colors flex justify-between items-center ${
                  activeSection === 'billing' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>Account & Billing</span>
                <svg
                  className={`h-5 w-5 transform transition-transform ${isBillingDropdownOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isBillingDropdownOpen && (
                <ul className="pl-4 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/settings/billing/manage-subscription"
                      className="block w-full text-left p-2 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      Manage Subscription
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/billing/history"
                      className="block w-full text-left p-2 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
                    >
                      View Billing History
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <div className="md:w-3/4 md:pl-6">
          {activeSection === 'general' && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">General Settings</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-1">Contact Email Address</label>
                  <input
                    type="email"
                    id="emailAddress"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <button
                  onClick={() => handleSaveSettings('general')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save General Settings
                </button>
                 <p className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                    Clicking &apos;Save General Settings&apos; will update your core company contact and information across the system. These changes will reflect immediately.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'integrations' && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">API & E-commerce Integrations</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="ecommercePlatform" className="block text-sm font-medium text-gray-700 mb-1">E-commerce Platform</label>
                  <select
                    id="ecommercePlatform"
                    value={ecommercePlatform}
                    onChange={(e) => setEcommercePlatform(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Shopify">Shopify</option>
                    <option value="WooCommerce">WooCommerce</option>
                    <option value="Magento">Magento</option>
                    <option value="Custom">Custom API</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Connect your online store for seamless data sync.</p>
                </div>
                <div>
                  <label htmlFor="twilioApiKey" className="block text-sm font-medium text-gray-700 mb-1">Twilio API Key</label>
                  <input
                    type="password"
                    id="twilioApiKey"
                    value={twilioApiKey}
                    onChange={(e) => setTwilioApiKey(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">For SMS messaging. Keep this secure.</p>
                </div>
                <div>
                  <label htmlFor="sendgridApiKey" className="block text-sm font-medium text-gray-700 mb-1">SendGrid API Key</label>
                  <input
                    type="password"
                    id="sendgridApiKey"
                    value={sendgridApiKey}
                    onChange={(e) => setSendgridApiKey(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">For email campaigns.</p>
                </div>
                <button
                  onClick={() => handleSaveSettings('integrations')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Integrations
                </button>
                 <p className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                    Clicking &apos;Save Integrations&apos; will update API keys and platform connections. Incorrect keys may disrupt campaign sending or data sync.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'ai_content' && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">AI & Content Configuration</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="aiTone" className="block text-sm font-medium text-gray-700 mb-1">AI Tone of Voice</label>
                  <select
                    id="aiTone"
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>Professional & Engaging</option>
                    <option>Friendly & Casual</option>
                    <option>Direct & Sales-Oriented</option>
                    <option>Humorous & Playful</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Sets the overall tone for AI-generated messages.</p>
                </div>
                <div>
                  <label htmlFor="aiCreativity" className="block text-sm font-medium text-gray-700 mb-1">AI Creativity Level</label>
                  <select
                    id="aiCreativity"
                    value={aiCreativity}
                    onChange={(e) => setAiCreativity(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>Low (More factual)</option>
                    <option>Medium (Balanced)</option>
                    <option>High (More imaginative)</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Controls how adventurous the AI is with its content.</p>
                </div>
                <div>
                  <label htmlFor="brandKeywords" className="block text-sm font-medium text-gray-700 mb-1">Brand Keywords (Include)</label>
                  <textarea
                    id="brandKeywords"
                    rows={3}
                    placeholder="e.g., 'rugged, performance, adventure'"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">Comma-separated words the AI should frequently use.</p>
                </div>
                <button
                  onClick={() => handleSaveSettings('ai_content')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save AI & Content Settings
                </button>
                 <p className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                    Saving these settings will influence the tone, creativity, and keyword usage of all future AI-generated content.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'automation_defaults' && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Campaign Automation Defaults</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="dailySendTime" className="block text-sm font-medium text-gray-700 mb-1">Default Daily Campaign Send Time</label>
                  <input
                    type="time"
                    id="dailySendTime"
                    value={dailySendTime}
                    onChange={(e) => setDailySendTime(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">Set a default time for automated daily campaigns.</p>
                </div>
                <div>
                  <label htmlFor="freqCapDays" className="block text-sm font-medium text-gray-700 mb-1">Frequency Capping (Days)</label>
                  <input
                    type="number"
                    id="freqCapDays"
                    value={freqCapDays}
                    onChange={(e) => setFreqCapDays(parseInt(e.target.value))}
                    min="1"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <p className="text-sm text-gray-500 mt-1">Prevent sending more than one message per customer within this many days across all automated campaigns.</p>
                </div>
                <div className="flex items-center">
                  <input
                    id="globalOptOut"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="globalOptOut" className="ml-2 block text-sm text-gray-900">
                    Enable Global Opt-Out (Customers can opt-out of all communications)
                  </label>
                </div>
                <button
                  onClick={() => handleSaveSettings('automation_defaults')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Automation Defaults
                </button>
                 <p className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                    These settings define the default behavior for new automated campaigns. Changes will apply to future campaigns but not modify existing ones unless explicitly updated.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'data_segmentation' && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Data & Segmentation</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="dataSyncFrequency" className="block text-sm font-medium text-gray-700 mb-1">Data Sync Frequency</label>
                  <select
                    id="dataSyncFrequency"
                    value={dataSyncFrequency}
                    onChange={(e) => setDataSyncFrequency(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>Real-time</option>
                    <option>Hourly</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">How often customer data is synced from your e-commerce platform.</p>
                </div>
                <div>
                  <label htmlFor="dataRetentionPolicy" className="block text-sm font-medium text-gray-700 mb-1">Data Retention Policy</label>
                  <select
                    id="dataRetentionPolicy"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>7 Years</option>
                    <option>5 Years</option>
                    <option>3 Years</option>
                    <option>1 Year</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Define how long customer data is stored.</p>
                </div>
                <button
                  onClick={() => handleSaveSettings('data_segmentation')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Data & Segmentation Settings
                </button>
                 <p className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                    Changes to data and segmentation settings affect how customer data is processed and organized for targeting. Data retention changes may impact compliance.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'notifications' && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Notifications & Alerts</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    id="lowCreditAlert"
                    type="checkbox"
                    checked={lowCreditAlert}
                    onChange={(e) => setLowCreditAlert(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="lowCreditAlert" className="ml-2 block text-sm text-gray-900">
                    Alert me when API credits (SMS/Email) are low
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="campaignFailureAlert"
                    type="checkbox"
                    checked={campaignFailureAlert}
                    onChange={(e) => setCampaignFailureAlert(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="campaignFailureAlert" className="ml-2 block text-sm text-gray-900">
                    Notify me of campaign failures or errors
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="performanceThresholdAlert"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="performanceThresholdAlert" className="ml-2 block text-sm text-gray-900">
                    Send alerts for significant performance drops (e.g., conversion rate)
                  </label>
                </div>
                <button
                  onClick={() => handleSaveSettings('notifications')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Notification Settings
                </button>
                 <p className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                    Saving these notification preferences will update how and when you receive alerts about your campaigns and account status.
                </p>
              </div>
            </section>
          )}

          {activeSection === 'billing' && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Account & Billing Overview</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800 rounded-md">
                  <p className="font-semibold">Current Plan: Professional Tier</p>
                  <p className="text-sm mt-1">Next billing date: July 1, 2025</p>
                  <p className="text-sm mt-1">Usage: 80% of monthly SMS credits used</p>
                  <p className="text-sm mt-1">For detailed information, please use the links in the sidebar.</p>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'manage-subscription' && (
             <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Manage Your Subscription</h2>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-gray-700">This section would typically integrate with your payment provider (e.g., Stripe, Paddle) to allow you to:</p>
                    <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
                        <li>View your current plan details</li>
                        <li>Upgrade or downgrade your subscription</li>
                        <li>Change billing frequency</li>
                        <li>Update payment methods</li>
                        <li>Cancel your subscription</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-4">In a live application, this would redirect to a secure external portal or load sensitive billing forms here.</p>
                </div>
             </section>
          )}

          {activeSection === 'view-history' && (
             <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Billing History</h2>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-gray-700">Here you would see a comprehensive list of your past invoices and transactions.</p>
                    <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
                        <li>Invoice number</li>
                        <li>Date</li>
                        <li>Amount</li>
                        <li>Status (Paid, Pending, etc.)</li>
                        <li>Download link for PDF invoices</li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-4">This data would be fetched from your billing provider&apos;s API.</p>
                </div>
             </section>
          )}

        </div>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}