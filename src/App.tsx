import React from 'react';
import { ParkProvider } from './contexts/ParkContext';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import './index.css';

export const App: React.FC = () => (
  <ParkProvider>
    <Layout>
      <Dashboard />
    </Layout>
  </ParkProvider>
);
