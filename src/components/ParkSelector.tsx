import React from 'react';
import { usePark } from '../contexts/ParkContext';
import { useNavigate } from 'react-router-dom';

export const ParkSelector: React.FC = () => {
  const { parks } = usePark();
  const nav = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Where are you riding today?</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {parks.map(p => (
          <button
            key={p.id}
            className="p-4 border rounded-lg hover:bg-gray-100 transition"
            onClick={() => nav(`/track?park=${p.id}`)}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
};
