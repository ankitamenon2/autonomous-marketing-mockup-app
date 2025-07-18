'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { getFirebaseServices } from '../firebase'; // Assuming firebase.js is in the parent directory
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [auth, setAuth] = useState<import('firebase/auth').Auth | null>(null); // State to hold auth instance
  // Removed isAuthReady if not used elsewhere

  useEffect(() => {
    const { auth: firebaseAuth, db: firestoreDb, authReadyPromise } = getFirebaseServices();
    if (!firebaseAuth || !firestoreDb || !authReadyPromise) return;
    setAuth(firebaseAuth);

    authReadyPromise.then(() => {
      onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          const appId = 'default-app-id';
          if (!firestoreDb) return;
          const shopifyDocRef = doc(firestoreDb, `artifacts/${appId}/users/${user.uid}/integrations`, 'shopify');
          const shopifyDocSnap = await getDoc(shopifyDocRef);
          if (shopifyDocSnap.exists()) {
            router.push('/');
          } else {
            router.push('/onboarding');
          }
        }
      });
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!auth) {
      setError('Firebase Auth not initialized.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirection handled by onAuthStateChanged listener
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error("Login error:", err);
      setError(error.message || 'Failed to log in. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    if (!auth) {
      setError('Firebase Auth not initialized.');
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Redirection handled by onAuthStateChanged listener
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error("Google Sign-In error:", err);
      setError(error.message || 'Failed to sign in with Google.');
    }
  };

  if (!auth) { // Check if auth is initialized
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-600">Loading authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-8">Sign in to your Autonomous Marketing account</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="mt-6 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.0003 4.75C14.0203 4.75 15.8003 5.46 17.2003 6.78L20.5903 3.39C18.4403 1.23 15.4803 0 12.0003 0C7.27031 0 3.16031 2.62 0.960312 6.36L5.19031 9.56C6.22031 7.21 8.95031 4.75 12.0003 4.75Z" fill="#EA4335"/>
              <path d="M23.4903 12.27C23.4903 11.49 23.4203 10.72 23.3003 9.97H12.2503V14.65H18.6603C18.3603 16.12 17.3403 17.38 15.9303 18.29L20.1503 21.5C22.6903 19.19 23.4903 15.71 23.4903 12.27Z" fill="#4285F4"/>
              <path d="M5.19031 15.09C4.94031 14.35 4.79031 13.59 4.79031 12.82C4.79031 12.05 4.94031 11.29 5.19031 10.55L0.960312 7.35C0.350312 8.57 0.0003125 10.09 0.0003125 12.82C0.0003125 15.55 0.350312 17.07 0.960312 18.29L5.19031 15.09Z" fill="#FBBC04"/>
              <path d="M12.2503 24.00C15.2003 24.00 17.7403 22.92 19.6803 20.93L15.9303 18.29C14.9303 18.96 13.6803 19.38 12.2503 19.38C9.10031 19.38 6.42031 17.21 5.19031 14.27L0.960312 17.47C3.16031 21.21 7.27031 24.00 12.2503 24.00Z" fill="#34A853"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className="mt-8 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/create-account" className="font-medium text-indigo-600 hover:text-indigo-500">
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}
