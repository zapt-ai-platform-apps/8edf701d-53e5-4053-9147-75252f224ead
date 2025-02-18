import React from 'react';
import { useAuth } from './features/auth/AuthProvider';
import Login from './features/auth/Login';
import ChatWidget from './components/ChatWidget';

/**
 * Dashboard component that displays the main app interface for authenticated users.
 * @returns {JSX.Element} Dashboard component.
 */
function Dashboard() {
  const { user, signOut } = useAuth();

  const handleButtonClick = (label) => {
    console.log(`Navigating to ${label}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50 text-gray-800">
      <header className="flex justify-between items-center p-4 bg-green-200 shadow-md">
        <h1 className="text-2xl font-bold">Welcome, {user?.email || 'Friend'}</h1>
        <button
          onClick={signOut}
          className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        >
          Sign Out
        </button>
      </header>
      <main className="flex-grow p-4">
        <nav className="flex flex-wrap gap-4 mb-6">
          {['My Thoughts', 'My Friend', 'Community Meeting', 'Positive Quotes'].map((item) => (
            <button
              key={item}
              onClick={() => handleButtonClick(item)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            >
              {item}
            </button>
          ))}
        </nav>
        <section>
          <p className="text-lg">
            Your personal AI friend is here to listen and offer positive guidance. Explore the features above to share your thoughts and connect with a caring community.
          </p>
        </section>
      </main>
      <footer className="p-2 text-center bg-green-200">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">
          Made on ZAPT
        </a>
      </footer>
      <ChatWidget />
    </div>
  );
}

/**
 * App component that conditionally renders Login or Dashboard based on authentication state.
 * @returns {JSX.Element} App component.
 */
export default function App() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return user ? <Dashboard /> : <Login />;
}