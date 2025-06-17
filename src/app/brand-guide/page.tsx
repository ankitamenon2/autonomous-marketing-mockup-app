// autonomous-marketing-mockup/app/brand-guide/page.tsx

'use client'; // This MUST be the very first line of the file

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BrandGuidePage() {
  const router = useRouter();

  // State for AI Content Customization options
  const [impactLevel, setImpactLevel] = useState(60);
  const [formalityLevel, setFormalityLevel] = useState(50);
  const [keywords, setKeywords] = useState('innovative, user-friendly, efficient');
  const [aiPrompt, setAiPrompt] = useState('Generate a compelling SMS message announcing a new product launch, emphasizing its simplicity and effectiveness for small businesses.');

  // State for editable Brand Guide content
  const [introPara1, setIntroPara1] = useState(
    'Maintaining a consistent brand voice and tone is paramount, especially when leveraging AI-powered marketing tools. These guidelines ensure that all automated content, from email campaigns to social media posts, truly reflects our brand&apos;s personality and values.'
  );
  const [introPara2, setIntroPara2] = useState(
    'Our brand voice is **authoritative, innovative, and supportive**. Our tone is adaptable, ranging from professional and informative in technical contexts to empathetic and encouraging in customer support or onboarding scenarios.'
  );

  const [principles, setPrinciples] = useState([
    'Accuracy & Fact-Checking: AI output must always be fact-checked and verified for accuracy before deployment.',
    'Brand Alignment: Content must align with our core values and messaging. It should sound like &apos;us&apos;.',
    'Bias Mitigation: Actively review AI-generated content for unintended biases and ensure inclusivity.',
    'Human Oversight: AI is a tool, not a replacement. Human review and approval are always the final step.',
    'Legal & Ethical Compliance: All generated content must comply with relevant regulations (e.g., GDPR, CCPA) and ethical marketing practices.',
  ]);

  const [aiLimitationsText, setAiLimitationsText] = useState(
    'AI can&apos;t generate content that truly resonates emotionally or captures nuanced understanding without careful guidance. It&apos;s a powerful assistant, not an autonomous creator of brand identity.'
  );

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

  const handleSaveAllSettings = () => {
    // In a real application, you'd send all these settings to a backend API
    console.log('Saving All Brand Settings & Content:', {
      impactLevel,
      formalityLevel,
      keywords,
      aiPrompt,
      introPara1,
      introPara2,
      principles,
      aiLimitationsText,
      // ... and other editable sections if added
    });
    alert('All brand settings and content saved! (This is a mockup)');
    // Optionally, give user feedback or refresh
  };

  const handlePrincipleChange = (index: number, value: string) => {
    const newPrinciples = [...principles];
    newPrinciples[index] = value;
    setPrinciples(newPrinciples);
  };

  const handleAddPrinciple = () => {
    setPrinciples([...principles, 'New Principle']);
  };

  const handleRemovePrinciple = (index: number) => {
    const newPrinciples = principles.filter((_, i) => i !== index);
    setPrinciples(newPrinciples);
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Brand Guidelines & AI Configuration</h1>
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
        {/* Editable Introduction Section */}
        <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Introduction to Brand Voice & Tone</h2>
          <div className="mb-4">
            <label htmlFor="introPara1" className="block text-gray-700 text-sm font-medium mb-2">Paragraph 1:</label>
            <textarea
              id="introPara1"
              rows={3}
              value={introPara1}
              onChange={(e) => setIntroPara1(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="introPara2" className="block text-gray-700 text-sm font-medium mb-2">Paragraph 2:</label>
            <textarea
              id="introPara2"
              rows={3}
              value={introPara2}
              onChange={(e) => setIntroPara2(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
        </section>

        {/* AI Content Customization Section */}
        <section className="mb-8 p-6 bg-indigo-50 rounded-lg border border-indigo-200">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">AI Content Customization</h2>
          <p className="text-gray-700 mb-6">
            Configure the AI&apos;s output to perfectly match your brand&apos;s desired tone, style, and messaging.
          </p>

          {/* NEW: Impact Level Slider */}
          <div className="mb-6">
            <label htmlFor="impact" className="block text-gray-700 text-sm font-medium mb-2">
              Impact Level: <span className="font-bold text-indigo-700">{impactLevel}%</span>
            </label>
            <input
              type="range"
              id="impact"
              min="0"
              max="100"
              value={impactLevel}
              onChange={(e) => setImpactLevel(Number(e.target.value))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer range-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Controls how assertive or influential the AI&apos;s generated content is.
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="formality" className="block text-gray-700 text-sm font-medium mb-2">
              Formality Level: <span className="font-bold text-indigo-700">{formalityLevel}%</span>
            </label>
            <input
              type="range"
              id="formality"
              min="0"
              max="100"
              value={formalityLevel}
              onChange={(e) => setFormalityLevel(Number(e.target.value))}
              className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer range-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Controls the degree of formal versus casual language used.
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="keywords" className="block text-gray-700 text-sm font-medium mb-2">
              Key Brand Keywords (comma-separated):
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

          <div className="mb-6">
            <label htmlFor="aiPrompt" className="block text-gray-700 text-sm font-medium mb-2">
              AI Generation Prompt for Customer Communication (e.g., SMS, Email):
            </label>
            <textarea
              id="aiPrompt"
              rows={4}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              placeholder="e.g., Generate a friendly email introducing our new loyalty program."
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Provide a specific instruction for the AI to draft customer messages.
            </p>
          </div>
        </section>

        {/* Editable Key Principles Section */}
        <section className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Key Principles for AI-Generated Content</h2>
          <div className="space-y-3">
            {principles.map((principle, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={principle}
                  onChange={(e) => handlePrincipleChange(index, e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={() => handleRemovePrinciple(index)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  aria-label={`Remove principle ${index + 1}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={handleAddPrinciple}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add New Principle
            </button>
          </div>
          <p className="text-gray-700 mt-4 mb-4">
            <label htmlFor="aiLimitationsText" className="block text-gray-700 text-sm font-medium mb-2">AI Capabilities Disclaimer:</label>
            <textarea
              id="aiLimitationsText"
              rows={3}
              value={aiLimitationsText}
              onChange={(e) => setAiLimitationsText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </p>
        </section>

        {/* Static sections (for now) - you can make these editable too if needed */}
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
        <button
          onClick={handleSaveAllSettings}
          className="mt-8 px-8 py-4 bg-blue-700 text-white font-bold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 w-full"
        >
          Save All Brand Guide & AI Settings
        </button>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}