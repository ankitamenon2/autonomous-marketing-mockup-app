'use client';

import React, { useEffect, useState } from 'react';
// Removed Next.js specific imports to resolve build errors
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

export default function ContentGenerationPage() {
  // Removed useRouter hook
  // const router = useRouter();
  const [tone, setTone] = useState('Friendly');
  const [length, setLength] = useState('Concise');
  const [callToAction, setCallToAction] = useState('Shop Now');
  const [topic, setTopic] = useState('New Product Launch');
  const [keywords, setKeywords] = useState('innovative, user-friendly, efficient');

  // Mock content generation function (replace with actual AI API calls)
  const generateSampleMessage = (cohort: string, currentTone: string, currentLength: string, currentCallToAction: string, currentTopic: string, currentKeywords: string) => {
    const baseMessage = `Here's your ${currentLength.toLowerCase()} message with a ${currentTone.toLowerCase()} tone about ${currentTopic.toLowerCase()}. Keywords: ${currentKeywords}. CTA: ${currentCallToAction}.`; // Changed to const to fix lint error

    switch (cohort) {
      case 'New Customers':
        return `👋 Welcome! ${baseMessage} Don't miss out! ${currentCallToAction} for a special first-time offer!`;
      case 'Engaged Shoppers':
        return `✨ Great news! ${baseMessage} We think you'll love this. Click here to ${currentCallToAction.toLowerCase()}!`;
      case 'Inactive Users':
        return `⏳ We miss you! ${baseMessage} Come back and ${currentCallToAction.toLowerCase()} with an exclusive discount!`;
      case 'VIP Customers':
        return `💎 Exclusive for you! ${baseMessage} As a VIP, you get early access. ${currentCallToAction} now!`;
      case 'Loyalty Program Members':
        return `🌟 Points update! ${baseMessage} Redeem your rewards and ${currentCallToAction.toLowerCase()} your next favorite item!`;
      default:
        return `Sample message for ${cohort}: ${baseMessage}`;
    }
  };

  // Define 5 cohorts for sample messages
  const cohorts = [
    'New Customers',
    'Engaged Shoppers',
    'Inactive Users',
    'VIP Customers',
    'Loyalty Program Members',
  ];


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

  // Mock save function (no actual backend interaction in this mockup)
  const handleGenerateAndSave = () => {
    console.log("Generating content for all cohorts with current parameters and saving (mock):", {
      tone,
      length,
      callToAction,
      topic,
      keywords,
      cohorts: cohorts.map(cohort => ({
        name: cohort,
        message: generateSampleMessage(cohort, tone, length, callToAction, topic, keywords)
      }))
    });
    alert('Content generated and saved! (This is a mockup)');
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">AI Content Generation Hub</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-blue-600 hover:underline">Dashboard</a></li>
            <li><a href="/customers" className="text-blue-600 hover:underline">Customers</a></li>
            <li><a href="/analytics" className="text-blue-600 hover:underline">Analytics</a></li>
            <li><a href="/settings" className="text-blue-600 hover:underline">Settings</a></li>
            <li><a href="/segments" className="text-blue-600 hover:underline">Segments</a></li>
            <li><a href="/campaigns" className="text-blue-600 hover:underline">Campaigns</a></li>
            {/* Monthly Goals link removed from top navigation for consistency */}
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

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Content Generation Parameters */}
        <section className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Configure AI Generation Parameters</h2>

          {/* Tone */}
          <div className="mb-6">
            <label htmlFor="tone" className="block text-gray-700 text-sm font-medium mb-2">
              Tone:
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Friendly">Friendly</option>
              <option value="Professional">Professional</option>
              <option value="Exciting">Exciting</option>
              <option value="Informative">Informative</option>
              <option value="Empathetic">Empathetic</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Select the desired emotional and stylistic quality of the message.
            </p>
          </div>

          {/* Length */}
          <div className="mb-6">
            <label htmlFor="length" className="block text-gray-700 text-sm font-medium mb-2">
              Length:
            </label>
            <select
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Concise">Concise (e.g., SMS)</option>
              <option value="Standard">Standard (e.g., Short Email)</option>
              <option value="Detailed">Detailed (e.g., Blog Snippet)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Choose the approximate length of the generated content.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mb-6">
            <label htmlFor="callToAction" className="block text-sm font-medium text-gray-700 mb-2">
              Call to Action:
            </label>
            <input
              type="text"
              id="callToAction"
              value={callToAction}
              onChange={(e) => setCallToAction(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              placeholder="e.g., Shop Now, Learn More, Sign Up"
            />
            <p className="text-xs text-gray-500 mt-1">
              The primary action you want the customer to take.
            </p>
          </div>

          {/* Topic */}
          <div className="mb-6">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Main Topic/Goal:
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              placeholder="e.g., New feature announcement, flash sale, re-engagement"
            />
            <p className="text-xs text-gray-500 mt-1">
              What is the core subject or objective of the message?
            </p>
          </div>

          {/* Keywords */}
          <div className="mb-6">
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
              Key Keywords (comma-separated):
            </label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              placeholder="e.g., innovation, growth, customer-first"
            />
            <p className="text-xs text-gray-500 mt-1">
              The AI will prioritize using these terms in its generated content.
            </p>
          </div>

          <button
            onClick={handleGenerateAndSave}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
          >
            Generate & Save Content
          </button>
        </section>

        {/* Right Column: AI Content Previews by Cohort */}
        <section className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Content Previews by Cohort</h2>
          <p className="text-gray-700 mb-6">
            Review sample messages tailored for different customer segments based on your configurations.
          </p>

          <div className="space-y-6">
            {cohorts.map((cohort, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-indigo-700 mb-3">{cohort}</h3>
                <textarea
                  className="w-full h-24 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 resize-none"
                  readOnly
                  value={generateSampleMessage(cohort, tone, length, callToAction, topic, keywords)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">
                  This is a dynamically generated preview. Actual AI output may vary.
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}
