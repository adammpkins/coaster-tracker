import React from 'react';
import { usePark } from '../contexts/ParkContext';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CoasterList: React.FC = () => {
  const { parks, ride } = usePark();
  const [params] = useSearchParams();
  const parkId = params.get('park') || '';
  const park = parks.find(p => p.id === parkId);

  if (!park) {
    return (
      <div className="p-6">
        <p className="text-red-500">Park not found.</p>
        <Link to="/" className="text-blue-500 underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Riding at {park.name}</h1>
      <ul className="space-y-4">
        {park.coasters.map(c => (
          <li
            key={c.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-500">Times ridden: {c.rideCount}</p>
            </div>
            <motion.button
              whileTap={{ scale: 1.1 }}
              onClick={() => ride(parkId, c.id)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition"
            >
              Ride {c.name}
            </motion.button>
          </li>
        ))}
      </ul>
    </div>
  );
};
