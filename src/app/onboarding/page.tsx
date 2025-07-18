'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { getFirebaseServices } from '../firebase'; // Assuming firebase.js is in the parent directory

export default function OnboardingPage() {
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState('');
  const [shopifyApiKey, setShopifyApiKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const router = useRouter();
  const [auth, setAuth] = useState<import('firebase/auth').Auth | null>(null);
  const [db, setDb] = useState<import('firebase/firestore').Firestore | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const { auth: firebaseAuth, db: firestoreDb, authReadyPromise } = getFirebaseServices();
    if (!firebaseAuth || !firestoreDb || !authReadyPromise) return;
    setAuth(firebaseAuth);
    setDb(firestoreDb);

    authReadyPromise.then(() => {
      const currentUser = firebaseAuth.currentUser;
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUserId(currentUser.uid);
      setIsLoading(false);
    });
  }, [router]);

  const handleConnectShopify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId || !db) {
      setError('User not authenticated or database not ready.');
      return;
    }

    if (!shopifyStoreUrl || !shopifyApiKey) {
      setError('Please enter both Shopify Store URL and API Key.');
      return;
    }

    setIsLoading(true);
    try {
      const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id';
      const shopifyDocRef = doc(db, `artifacts/${appId}/users/${userId}/integrations`, 'shopify');
      await setDoc(shopifyDocRef, {
        storeUrl: shopifyStoreUrl,
        apiKey: shopifyApiKey,
        connectedAt: new Date().toISOString(),
      });
      setSuccess('Shopify connected successfully! Account created.');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error("Shopify connection error:", err);
      setError(error.message || 'Failed to connect Shopify. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Connect Your Store</h2>
        <p className="text-center text-gray-600 mb-8">Integrate with Shopify to unlock full marketing automation.</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <form onSubmit={handleConnectShopify} className="space-y-5">
          <div>
            <label htmlFor="shopifyStoreUrl" className="block text-sm font-medium text-gray-700">Shopify Store URL</label>
            <input
              type="url"
              id="shopifyStoreUrl"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., your-store-name.myshopify.com"
              value={shopifyStoreUrl}
              onChange={(e) => setShopifyStoreUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="shopifyApiKey" className="block text-sm font-medium text-gray-700">Shopify Admin API Access Token</label>
            <input
              type="password"
              id="shopifyApiKey"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={shopifyApiKey}
              onChange={(e) => setShopifyApiKey(e.target.value)}
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              Find this in your Shopify Admin under Apps &gt; Develop apps &gt; Your Custom App &gt; API credentials.
            </p>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Shopify'}
          </button>
        </form>
      </div>
    </div>
  );
}
