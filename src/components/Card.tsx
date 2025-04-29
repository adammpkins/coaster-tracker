import React from 'react';

export const Card: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <div
    onClick={onClick}
    className={`
      bg-white dark:bg-gray-800 rounded-xl shadow-md 
      hover:shadow-lg transition p-4 cursor-pointer
    `}
  >
    {children}
  </div>
);
