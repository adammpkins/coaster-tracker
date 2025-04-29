import React, { useState } from 'react';
import { usePark, Park } from '../contexts/ParkContext';
import { motion } from 'framer-motion';

interface Props { onClose: () => void; }

export const AddRideModal: React.FC<Props> = ({ onClose }) => {
  const { parks, ride } = usePark();
  const [parkId, setParkId] = useState<string>('');
  const [query, setQuery] = useState('');

  const park = parks.find(p => p.id === parkId);
  const suggestions = park
    ? park.coasters.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleAdd = (coasterId: string) => {
    ride(parkId, coasterId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Add a Ride</h2>

        {/* Park selector */}
        <label className="block mb-2">
          <span className="text-sm">Park</span>
          <select
            value={parkId}
            onChange={e => { setParkId(e.target.value); setQuery(''); }}
            className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
          >
            <option value="">— Select Park —</option>
            {parks.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>

        {/* Coaster search */}
        {park && (
          <label className="block mb-4">
            <span className="text-sm">Coaster</span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Start typing…"
              className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
            />
            {query && (
              <ul className="max-h-40 overflow-auto mt-1 bg-white dark:bg-gray-700 rounded shadow-inner">
                {suggestions.map(c => (
                  <li
                    key={c.id}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleAdd(c.id)}
                  >
                    {c.name}
                  </li>
                ))}
                {suggestions.length === 0 && (
                  <li className="p-2 text-gray-500">No matches</li>
                )}
              </ul>
            )}
          </label>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};
