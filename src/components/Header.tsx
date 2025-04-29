import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    setDark(document.documentElement.classList.contains('dark'));
  };

  // sync state if user had pref in HTML
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <h1 className="text-xl font-bold">🎢 Coaster Tracker</h1>
        <button
          onClick={toggle}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun /> : <Moon />}
        </button>
      </div>
    </header>
  );
};
