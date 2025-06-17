// autonomous-marketing-mockup/app/brand-guide/page.tsx

'use client'; // This MUST be the very first line of the file
// Temporary change for Git test - PLEASE REMOVE LATER

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BrandGuidePage() {
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

  return (
    <div className="min-h-screen bg-indigo-50 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Brand Guidelines</h1>
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

      <main className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction to Brand Voice & Tone</h2>
          <p className="text-gray-700 mb-4">
            Maintaining a consistent brand voice and tone is paramount, especially when leveraging AI-powered marketing tools. These guidelines ensure that all automated content, from email campaigns to social media posts, truly reflects our brand&apos;s personality and values.
          </p>
          <p className="text-gray-700 mb-4">
            Our brand voice is **authoritative, innovative, and supportive**. Our tone is adaptable, ranging from professional and informative in technical contexts to empathetic and encouraging in customer support or onboarding scenarios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Principles for AI-Generated Content</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>**Accuracy & Fact-Checking:** AI output must always be fact-checked and verified for accuracy before deployment.</li>
            <li>**Brand Alignment:** Content must align with our core values and messaging. It should sound like &apos;us&apos;.</li>
            <li>**Bias Mitigation:** Actively review AI-generated content for unintended biases and ensure inclusivity.</li>
            <li>**Human Oversight:** AI is a tool, not a replacement. Human review and approval are always the final step.</li>
            <li>**Legal & Ethical Compliance:** All generated content must comply with relevant regulations (e.g., GDPR, CCPA) and ethical marketing practices.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            AI can&apos;t generate content that truly resonates emotionally or captures nuanced understanding without careful guidance. It&apos;s a powerful assistant, not an autonomous creator of brand identity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Practical Application in AI Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Language & Style</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Use active voice predominantly.</li>
                <li>Maintain a professional yet approachable vocabulary.</li>
                <li>Avoid jargon unless audience-specific and explained.</li>
                <li>Sentence structure: Vary for readability, but favor clarity.</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Common Phrases & Keywords</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Prioritize &apos;innovate&apos;, &apos;optimize&apos;, &apos;empower&apos;.</li>
                <li>Avoid overly informal slang or excessive exclamation marks.</li>
                <li>Always refer to our product as &apos;The Autonomous Marketing Platform&apos;.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Updating & Maintaining Guidelines</h2>
          <p className="text-gray-700 mb-4">
            These guidelines are dynamic. As our brand evolves and AI capabilities advance, it&apos;s crucial that AI tools are trained on a robust dataset, and these guidelines will be updated. Please check back regularly for the latest version. Feedback and suggestions are always welcome.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit Feedback
          </button>
        </section>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}