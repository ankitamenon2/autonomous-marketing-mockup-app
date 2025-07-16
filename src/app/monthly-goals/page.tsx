'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MonthlyGoal {
  id: string;
  month: string;
  year: number;
  revenueGoal: number;
  customerAcquisitionGoal: number;
  dateSet: string; // Date when the goal was set/added
  isNew?: boolean; // Flag for newly added, unsaved rows
}

export default function MonthlyGoalsPage() {
  const router = useRouter();
  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editedGoal, setEditedGoal] = useState<MonthlyGoal | null>(null);

  // Mock data for initial goals (replace with API calls in real app)
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login');
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
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Function to add a new empty row for editing
  const handleAddNewRow = () => {
    // If another row is already being edited, prevent adding a new one
    if (editingGoalId) {
      alert('Please save or cancel the current edit before adding a new goal.');
      return;
    }

    const tempId = `new-goal-${crypto.randomUUID()}`; // Temporary ID for new row
    const newEmptyGoal: MonthlyGoal = {
      id: tempId,
      month: '',
      year: new Date().getFullYear(),
      revenueGoal: 0,
      customerAcquisitionGoal: 0,
      dateSet: new Date().toISOString().split('T')[0],
      isNew: true, // Mark as a new, unsaved row
    };
    setGoals(prevGoals => [...prevGoals, newEmptyGoal]);
    setEditingGoalId(tempId);
    setEditedGoal(newEmptyGoal);
  };

  // Function to start editing an existing goal
  const handleEditGoal = (goal: MonthlyGoal) => {
    // If another row is already being edited, prevent editing a new one
    if (editingGoalId) {
      alert('Please save or cancel the current edit before editing another goal.');
      return;
    }
    setEditingGoalId(goal.id);
    setEditedGoal({ ...goal }); // Create a mutable copy for editing
  };

  // Generic handler for input changes in the editable row
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof MonthlyGoal) => {
    if (editedGoal) {
      setEditedGoal({
        ...editedGoal,
        [field]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
      });
    }
  };

  // Function to save changes (either new or updated goal)
  const handleSaveGoal = () => {
    if (!editedGoal) return;

    // Basic validation
    if (!editedGoal.month || editedGoal.year === 0 || editedGoal.revenueGoal < 0 || editedGoal.customerAcquisitionGoal < 0) {
      alert('Please fill in all fields correctly.');
      return;
    }

    if (editedGoal.isNew) {
      // It's a new goal, assign a permanent ID
      const permanentId = `goal-${editedGoal.year}-${editedGoal.month.toLowerCase()}-${Date.now()}`;
      setGoals(prevGoals =>
        prevGoals.map(goal =>
          goal.id === editedGoal.id
            ? { ...editedGoal, id: permanentId, isNew: false } // Update with permanent ID and remove isNew flag
            : goal
        )
      );
      alert('New monthly goal added successfully!');
    } else {
      // It's an existing goal being updated
      setGoals(prevGoals =>
        prevGoals.map(goal =>
          goal.id === editedGoal.id
            ? { ...editedGoal, isNew: false } // Ensure isNew is false if it was somehow true
            : goal
        )
      );
      alert('Monthly goal updated successfully!');
    }
    setEditingGoalId(null); // Exit editing mode
    setEditedGoal(null); // Clear edited goal state
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    if (editedGoal?.isNew) {
      // If it was a new, unsaved row, remove it from the list
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== editedGoal.id));
    }
    setEditingGoalId(null); // Exit editing mode
    setEditedGoal(null); // Clear edited goal state
  };

  // Function to delete a goal
  const handleDeleteGoal = (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
      alert('Monthly goal deleted!');
    }
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

      <main className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-700">Your Current Goals</h2>
          <button
            onClick={handleAddNewRow}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Goal
          </button>
        </div>

        {goals.length === 0 && !editingGoalId ? (
          <p className="text-gray-500 text-center py-10">No monthly goals set yet. Click &quot;Add New Goal&quot; to get started!</p>
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
                    {editingGoalId === goal.id && editedGoal ? (
                      // Render editable row
                      <>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <select
                            value={editedGoal.month}
                            onChange={(e) => handleInputChange(e, 'month')}
                            className="w-full p-2 border rounded-md"
                          >
                            {monthOptions.map(month => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <input
                            type="number"
                            value={editedGoal.year}
                            onChange={(e) => handleInputChange(e, 'year')}
                            className="w-full p-2 border rounded-md"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <input
                            type="number"
                            value={editedGoal.revenueGoal}
                            onChange={(e) => handleInputChange(e, 'revenueGoal')}
                            className="w-full p-2 border rounded-md"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <input
                            type="number"
                            value={editedGoal.customerAcquisitionGoal}
                            onChange={(e) => handleInputChange(e, 'customerAcquisitionGoal')}
                            className="w-full p-2 border rounded-md"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{formatDateString(editedGoal.dateSet)}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm flex space-x-2">
                          <button
                            onClick={handleSaveGoal}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      // Render display row
                      <>
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
                      </>
                    )}
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