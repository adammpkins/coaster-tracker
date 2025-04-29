import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} Coaster Tracker. Built with 💖 by you.
    </div>
  </footer>
);
