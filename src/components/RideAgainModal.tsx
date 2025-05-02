import React from 'react';
import { Park, Coaster, usePark } from '../contexts/ParkContext';
import { motion } from 'framer-motion';
import { Card } from './Card';

interface Props {
  park: Park;
  coaster: Coaster;
  onClose: () => void;
}

export const RideAgainModal: React.FC<Props> = ({ park, coaster, onClose }) => {
  const { ride } = usePark();

  const handleRide = () => {
    ride(park.id, coaster.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg text-center"
      >
        <h2 className="text-2xl font-semibold mb-2">
          Ride again?
        </h2>
            <Card
              key={`${park.id}-${coaster.id}`}
              onClick={handleRide}
              imageUrl={coaster.imageUrl}    // ← pass the URL here
            >
              <div className="bg-slate-300 dark:bg-slate-700 rounded-lg p-4 mt-32 opacity-90">
              <p className="font-semibold text-lg ">{coaster.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {park.name}
              </p>
              <p className="mt-2">
                Times ridden: <span className="font-bold">{coaster.rideCount}</span>
              </p>
              </div>
            </Card>

        <br />
        <button
          onClick={handleRide}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition mr-2"
        >
          Ride!
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};
