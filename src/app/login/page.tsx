// autonomous-marketing-mockup/app/login/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white shadow-lg rounded-xl p-12 w-full max-w-md">
        <div className="flex justify-center mb-8">
          {/* Replace with your actual logo if you have one */}
          <span className="inline-flex rounded-md shadow-sm">
            <Link href="/" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 transition ease-in-out duration-150">
              <svg className="w-6 h-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.882 5c-.992 0-2.112.346-2.718 1.01A12.055 12.055 0 013 16.5c0 .592.124 1.172.374 1.728A12.043 12.043 0 0112 21.253c4.729 0 8-3.22 8-8.253a12.043 12.043 0 01-8.626-3.028A12.055 12.055 0 0121 8.5c-.606-.665-1.726-1.01-2.718-1.01-1.364 0-2.95.477-4.118 1.247" />
              </svg>
              Autonomous Marketing
            </Link>
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sign in to your account</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1">
              <input
                type="text"
                id="username"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1">
              <input
                type="password"
                id="password"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register here</Link>
        </div>
      </div>
    </div>
  );
}