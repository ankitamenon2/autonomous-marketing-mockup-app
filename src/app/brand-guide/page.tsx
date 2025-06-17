// autonomous-marketing-mockup/app/brand-guide/page.tsx

'use client'; // This MUST be the very first line of the file

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BrandGuideEditorPage() {
  const router = useRouter();

  // State for brand guide settings
  const [brandName, setBrandName] = useState('Your E-commerce Brand');
  const [targetAudience, setTargetAudience] = useState('Tech-savvy millennials interested in sustainable products.');
  const [brandVoiceFormal, setBrandVoiceFormal] = useState(50); // 0=Informal, 100=Formal
  const [brandVoiceEnthusiasm, setBrandVoiceEnthusiasm] = useState(70); // 0=Reserved, 100=Enthusiastic
  const [keyMessages, setKeyMessages] = useState('Innovation, Sustainability, Customer Delight');
  const [exclusionKeywords, setExclusionKeywords] = useState('cheap, discount, low-quality');
  const [preferredCTAs, setPreferredCTAs] = useState('Shop Now, Learn More, Discover Our Collection');
  const [aiCreativityLevel, setAiCreativityLevel] = useState('Balanced');
  const [samplePrompt, setSamplePrompt] = useState('Write a short SMS for a new customer welcome.');
  const [aiPreviewOutput, setAiPreviewOutput] = useState('');
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);


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

  const handleSaveBrandGuide = () => {
    alert('Brand Guide Saved! (This is a mock save)');
    console.log('Brand Guide Settings:', {
      brandName, targetAudience, brandVoiceFormal, brandVoiceEnthusiasm,
      keyMessages, exclusionKeywords, preferredCTAs, aiCreativityLevel
    });
  };

  const handleGeneratePreview = async () => {
    setIsLoadingPreview(true);
    setAiPreviewOutput('Generating AI preview based on your guide...');
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockOutput = `Welcome to [Brand Name]! We're excited to have you join our community. Discover our innovative and sustainable products today! Shop Now.`;
    setAiPreviewOutput(mockOutput.replace('[Brand Name]', brandName));
    setIsLoadingPreview(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Brand Guide Editor</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 hover:underline">Dashboard</Link></li>
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

      <main className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <p className="text-gray-600 mb-8">
          Define your brand's voice, tone, and messaging to guide the AI in generating on-brand content for your e-commerce marketing.
        </p>

        <section className="mb-8 border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Brand Core Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">Your Brand Name</label>
              <input
                type="text"
                id="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">Target Audience Description</label>
              <textarea
                id="targetAudience"
                rows={3}
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Demographics, interests, pain points, aspirations..."
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">Help the AI understand who you're talking to.</p>
            </div>
          </div>
        </section>

        <section className="mb-8 border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Brand Voice & Tone</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="voiceFormal" className="block text-sm font-medium text-gray-700 mb-2">Formal vs. Informal</label>
              <input
                type="range"
                id="voiceFormal"
                min="0"
                max="100"
                value={brandVoiceFormal}
                onChange={(e) => setBrandVoiceFormal(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Informal</span>
                <span>{brandVoiceFormal}%</span>
                <span>Formal</span>
              </div>
            </div>
            <div>
              <label htmlFor="voiceEnthusiasm" className="block text-sm font-medium text-gray-700 mb-2">Reserved vs. Enthusiastic</label>
              <input
                type="range"
                id="voiceEnthusiasm"
                min="0"
                max="100"
                value={brandVoiceEnthusiasm}
                onChange={(e) => setBrandVoiceEnthusiasm(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Reserved</span>
                <span>{brandVoiceEnthusiasm}%</span>
                <span>Enthusiastic</span>
              </div>
            </div>
            <div>
              <label htmlFor="aiCreativity" className="block text-sm font-medium text-gray-700 mb-1">AI Creativity Level</label>
              <select
                id="aiCreativity"
                value={aiCreativityLevel}
                onChange={(e) => setAiCreativityLevel(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>Low (More factual & direct)</option>
                <option>Balanced (Standard approach)</option>
                <option>High (More imaginative & varied)</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">Controls how adventurous the AI is with its content suggestions.</p>
            </div>
          </div>
        </section>

        <section className="mb-8 border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Messaging & Keywords</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="keyMessages" className="block text-sm font-medium text-gray-700 mb-1">Core Key Messages / USPs</label>
              <textarea
                id="keyMessages"
                rows={3}
                value={keyMessages}
                onChange={(e) => setKeyMessages(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Comma-separated (e.g., 'fast shipping, eco-friendly, unique designs')"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">Words or phrases the AI should try to include.</p>
            </div>
            <div>
              <label htmlFor="exclusionKeywords" className="block text-sm font-medium text-gray-700 mb-1">Exclusion Keywords</label>
              <textarea
                id="exclusionKeywords"
                rows={2}
                value={exclusionKeywords}
                onChange={(e) => setExclusionKeywords(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Comma-separated (e.g., 'bargain, cheap, outdated')"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">Words or phrases the AI should *avoid* using.</p>
            </div>
            <div>
              <label htmlFor="preferredCTAs" className="block text-sm font-medium text-gray-700 mb-1">Preferred Call to Actions (CTAs)</label>
              <input
                type="text"
                id="preferredCTAs"
                value={preferredCTAs}
                onChange={(e) => setPreferredCTAs(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Comma-separated (e.g., 'Shop Now, Discover, Explore')"
              />
              <p className="text-sm text-gray-500 mt-1">Examples of CTAs the AI should prioritize.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Preview AI Generation</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="samplePrompt" className="block text-sm font-medium text-gray-700 mb-1">Enter a sample prompt for AI:</label>
              <textarea
                id="samplePrompt"
                rows={2}
                value={samplePrompt}
                onChange={(e) => setSamplePrompt(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., 'Write an email subject line for a holiday sale'"
              ></textarea>
            </div>
            <button
              onClick={handleGeneratePreview}
              disabled={isLoadingPreview}
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingPreview ? 'Generating...' : 'Generate AI Preview'}
            </button>
            {aiPreviewOutput && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-800">
                <p className="font-semibold mb-2">AI Output Preview:</p>
                <p className="whitespace-pre-wrap">{aiPreviewOutput}</p>
              </div>
            )}
          </div>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleSaveBrandGuide}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Brand Guide
          </button>
        </div>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}