import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
    <Header />
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {children}
    </main>
    <Footer />
  </div>
);
