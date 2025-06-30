'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct Next.js import for routing
import Link from 'next/link'; // Correct Next.js import for internal links

interface MonthlyGoal {
  id: string;
  month: string;
  year: number;
  revenueGoal: number;
  customerAcquisitionGoal: number;
  dateSet: string;
}

export default function MonthlyGoalsPage() {
  const router = useRouter(); // Use Next.js router hook
  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [newMonth, setNewMonth] = useState('');
  const [newYear, setNewYear] = useState(new Date().getFullYear());
  const [newRevenueGoal, setNewRevenueGoal] = useState(0);
  const [newCustomerAcquisitionGoal, setNewCustomerAcquisitionGoal] = useState(0);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  // Mock data for initial goals (replace with API calls in real app)
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login'); // Use router.push for Next.js navigation
    }

    // Load mock goals or fetch from a mock API
    const initialGoals: MonthlyGoal[] = [
      {
        id: 'goal-2025-01',
        month: 'January',
        year: 2025,
        revenueGoal: 20000,
        customerAcquisitionGoal: 100,
        dateSet: '2024-12-01',
      },
      {
        id: 'goal-2025-02',
        month: 'February',
        year: 2025,
        revenueGoal: 22000,
        customerAcquisitionGoal: 120,
        dateSet: '2025-01-01',
      },
      {
        id: 'goal-2025-03',
        month: 'March',
        year: 2025,
        revenueGoal: 25000,
        customerAcquisitionGoal: 150,
        dateSet: '2025-02-01',
      },
    ];
    setGoals(initialGoals);
  }, [router]); // Include router in dependency array

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login'); // Use router.push for Next.js navigation
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMonth && newYear && newRevenueGoal >= 0 && newCustomerAcquisitionGoal >= 0) {
      const newGoal: MonthlyGoal = {
        id: `goal-${newYear}-${newMonth.toLowerCase()}-${Date.now()}`,
        month: newMonth,
        year: newYear,
        revenueGoal: newRevenueGoal,
        customerAcquisitionGoal: newCustomerAcquisitionGoal,
        dateSet: new Date().toISOString().split('T')[0],
      };
      setGoals([...goals, newGoal]);
      // Reset form fields
      setNewMonth('');
      setNewYear(new Date().getFullYear());
      setNewRevenueGoal(0);
      setNewCustomerAcquisitionGoal(0);
      alert('Monthly goal added!'); // Retaining alert as per original code behavior for mockup
    } else {
      alert('Please fill in all goal fields correctly.'); // Retaining alert
    }
  };

  const handleEditGoal = (goal: MonthlyGoal) => {
    setEditingGoalId(goal.id);
    setNewMonth(goal.month);
    setNewYear(goal.year);
    setNewRevenueGoal(goal.revenueGoal);
    setNewCustomerAcquisitionGoal(goal.customerAcquisitionGoal);
  };

  const handleUpdateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGoalId) {
      setGoals(goals.map(goal =>
        goal.id === editingGoalId
          ? {
              ...goal,
              month: newMonth,
              year: newYear,
              revenueGoal: newRevenueGoal,
              customerAcquisitionGoal: newCustomerAcquisitionGoal,
            }
          : goal
      ));
      setEditingGoalId(null);
      setNewMonth('');
      setNewYear(new Date().getFullYear());
      setNewRevenueGoal(0);
      setNewCustomerAcquisitionGoal(0);
      alert('Monthly goal updated!'); // Retaining alert
    }
  };

  const handleDeleteGoal = (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) { // Retaining window.confirm
      setGoals(goals.filter(goal => goal.id !== id));
      alert('Monthly goal deleted!'); // Retaining alert
    }
  };

  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatDateString = (dateString: string) => { // Renamed to avoid conflict with `formatDate` from other files
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-8 font-sans">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Monthly Goals</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-blue-600 hover:underline">Dashboard</Link></li>
            <li><Link href="/customers" className="text-blue-600 hover:underline">Customers</Link></li>
            <li><Link href="/analytics" className="text-blue-600 hover:underline">Analytics</Link></li>
            <li><Link href="/settings" className="text-blue-600 hover:underline">Settings</Link></li>
            <li><Link href="/segments" className="text-blue-600 hover:underline">Segments</Link></li>
            <li><Link href="/campaigns" className="text-blue-600 hover:underline">Campaigns</Link></li>
            {/* Monthly Goals link removed from top navigation as per Dashboard consistency */}
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
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">Set Your Monthly Marketing Goals</h2>

        {/* Goal Input Form */}
        <form onSubmit={editingGoalId ? handleUpdateGoal : handleAddGoal} className="space-y-4 mb-8 p-4 border border-indigo-200 rounded-lg bg-indigo-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
              <select
                id="month"
                value={newMonth}
                onChange={(e) => setNewMonth(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Month</option>
                {monthOptions.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="number"
                id="year"
                value={newYear}
                onChange={(e) => setNewYear(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                min="2000"
                max="2100"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="revenueGoal" className="block text-sm font-medium text-gray-700">Revenue Goal ($)</label>
            <input
              type="number"
              id="revenueGoal"
              value={newRevenueGoal}
              onChange={(e) => setNewRevenueGoal(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="customerAcquisitionGoal" className="block text-sm font-medium text-gray-700">Customer Acquisition Goal</label>
            <input
              type="number"
              id="customerAcquisitionGoal"
              value={newCustomerAcquisitionGoal}
              onChange={(e) => setNewCustomerAcquisitionGoal(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="0"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editingGoalId ? 'Update Goal' : 'Add New Goal'}
          </button>
          {editingGoalId && (
            <button
              type="button"
              onClick={() => {
                setEditingGoalId(null);
                setNewMonth('');
                setNewYear(new Date().getFullYear());
                setNewRevenueGoal(0);
                setNewCustomerAcquisitionGoal(0);
              }}
              className="w-full mt-2 px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel Edit
            </button>
          )}
        </form>

        {/* Existing Goals Table */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b pb-2">Your Current Goals</h2>
        {goals.length === 0 ? (
          <p className="text-gray-500">No monthly goals set yet. Add one above!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Revenue Goal
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer Acq. Goal
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date Set
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {goals.map((goal) => (
                  <tr key={goal.id}>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{goal.month}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{goal.year}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">${goal.revenueGoal.toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{goal.customerAcquisitionGoal.toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{formatDateString(goal.dateSet)}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm flex space-x-2">
                      <button
                        onClick={() => handleEditGoal(goal)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}
