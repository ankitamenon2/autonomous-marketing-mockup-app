'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { getFirebaseServices } from '../firebase'; // Assuming firebase.js is in the parent directory

interface MonthlyGoal {
  id: string;
  month: string;
  year: number;
  revenueGoal: number;
  customerAcquisitionGoal: number;
  dateSet: string; // Date when the goal was set/added
}

export default function MonthlyGoalsPage() {
  const router = useRouter();
  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null); // To track which row is actively being added/edited
  const [auth, setAuth] = useState<import('firebase/auth').Auth | null>(null);
  const [db, setDb] = useState<import('firebase/firestore').Firestore | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Firebase Initialization and Authentication Check
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
      // setIsAuthReady(true); // No longer needed
    });
  }, [router]);

  // Fetch goals from Firestore
  useEffect(() => {
    if (userId && db) {
      const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id';
      const goalsCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/monthlyGoals`);

      const unsubscribe = onSnapshot(goalsCollectionRef, (snapshot) => {
        const fetchedGoals: MonthlyGoal[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MonthlyGoal[];
        setGoals(fetchedGoals);
        setIsLoading(false);
      }, (error) => {
        console.error("Error fetching monthly goals:", error);
        setIsLoading(false);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [userId, db]);


  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
    }
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

    const tempId = `new-goal-${Date.now()}`; // Temporary ID for new row
    const newEmptyGoal: MonthlyGoal = {
      id: tempId,
      month: '',
      year: new Date().getFullYear(),
      revenueGoal: 0,
      customerAcquisitionGoal: 0,
      dateSet: new Date().toISOString().split('T')[0],
    };
    setGoals(prevGoals => [...prevGoals, newEmptyGoal]);
    setEditingGoalId(tempId); // Set the new row as the one being edited
  };

  // Handle changes directly in the table cells
  const handleCellChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string,
    field: keyof MonthlyGoal
  ) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === id
          ? { ...goal, [field]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }
          : goal
      )
    );
  };

  // Function to save a specific goal to Firestore
  const handleSaveGoal = async (goalToSave: MonthlyGoal) => {
    if (!db || !userId) {
      alert('Database not ready or user not authenticated.');
      return;
    }

    // Basic validation
    if (!goalToSave.month || goalToSave.year === 0 || goalToSave.revenueGoal < 0 || goalToSave.customerAcquisitionGoal < 0) {
      alert('Please fill in all fields correctly before saving.');
      return;
    }

    setIsLoading(true);
    try {
      const appId = process.env.NEXT_PUBLIC_APP_ID || 'default-app-id';
      const goalRef = doc(db, `artifacts/${appId}/users/${userId}/monthlyGoals`, goalToSave.id);

      await setDoc(goalRef, {
        month: goalToSave.month,
        year: goalToSave.year,
        revenueGoal: goalToSave.revenueGoal,
        customerAcquisitionGoal: goalToSave.customerAcquisitionGoal,
        dateSet: goalToSave.dateSet,
      }, { merge: true }); // Use merge to update existing fields or create if not exists

      setEditingGoalId(null); // Exit editing mode for this row
      alert('Goal saved successfully!');
    } catch (error: unknown) {
      console.error("Error saving goal:", error);
      alert('Failed to save goal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-600">Loading goals...</div>
      </div>
    );
  }

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
                  {/* Removed Actions column header */}
                </tr>
              </thead>
              <tbody className="bg-white">
                {goals.map((goal) => (
                  <tr key={goal.id}>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <select
                        value={goal.month}
                        onChange={(e) => handleCellChange(e, goal.id, 'month')}
                        onBlur={() => handleSaveGoal(goal)} // Save on blur
                        className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select Month</option>
                        {monthOptions.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <input
                        type="number"
                        value={goal.year}
                        onChange={(e) => handleCellChange(e, goal.id, 'year')}
                        onBlur={() => handleSaveGoal(goal)} // Save on blur
                        className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <input
                        type="number"
                        value={goal.revenueGoal}
                        onChange={(e) => handleCellChange(e, goal.id, 'revenueGoal')}
                        onBlur={() => handleSaveGoal(goal)} // Save on blur
                        className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <input
                        type="number"
                        value={goal.customerAcquisitionGoal}
                        onChange={(e) => handleCellChange(e, goal.id, 'customerAcquisitionGoal')}
                        onBlur={() => handleSaveGoal(goal)} // Save on blur
                        className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{formatDateString(goal.dateSet)}</p>
                    </td>
                    {/* No Actions column for display/edit */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Optional: Add a general save button if auto-save on blur is not preferred, or for bulk save */}
        <div className="mt-6 text-center">
          <button
            onClick={() => alert("All changes are saved automatically on cell blur.")}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md cursor-not-allowed"
            disabled // Disable since saving is on blur
          >
            Changes Saved Automatically
          </button>
        </div>
      </main>

      <footer className="text-center text-gray-500 mt-8">
        <p>&copy; {new Date().getFullYear()} Autonomous Marketing. All rights reserved.</p>
      </footer>
    </div>
  );
}