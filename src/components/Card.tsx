// src/components/Card.tsx
import React from 'react';

export const Card: React.FC<{
  imageUrl?: string;
  onClick?: () => void;
}> = ({ imageUrl, onClick, children }) => (
  <div
    onClick={onClick}
    className="relative rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer hover:scale-105 duration-200 ease-in-out"
    style={{
      backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
      backgroundSize: 'cover',
    }}
  >
    {/* overlay so text stays legible */}
    <div className=" p-4">
      {children}
    </div>
  </div>
);
