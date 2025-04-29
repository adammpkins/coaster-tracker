import React, { useState } from 'react';
import { usePark, Park, Coaster } from '../contexts/ParkContext';
import { AddRideModal } from './AddRideModal';
import { RideAgainModal } from './RideAgainModal';
import { Card } from './Card';

export const Dashboard: React.FC = () => {
  const { parks } = usePark();
  const [addOpen, setAddOpen] = useState(false);
  const [current, setCurrent] = useState<{ park: Park; coaster: Coaster } | null>(null);

  const ridden = parks
    .flatMap(p =>
      p.coasters
        .filter(c => c.rideCount > 0)
        .map(c => ({ park: p, coaster: c }))
    )
    .sort((a, b) => b.coaster.rideCount - a.coaster.rideCount);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Rides</h2>
        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition"
        >
          Ride a New Coaster
        </button>
      </div>

      {ridden.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          You haven’t ridden any coasters yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ridden.map(({ park, coaster }) => (
            <Card
              key={`${park.id}-${coaster.id}`}
              onClick={() => setCurrent({ park, coaster })}
            >
              <p className="font-semibold text-lg">{coaster.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {park.name}
              </p>
              <p className="mt-2">
                Times ridden: <span className="font-bold">{coaster.rideCount}</span>
              </p>
            </Card>
          ))}
        </div>
      )}

      {addOpen && <AddRideModal onClose={() => setAddOpen(false)} />}
      {current && (
        <RideAgainModal
          park={current.park}
          coaster={current.coaster}
          onClose={() => setCurrent(null)}
        />
      )}
    </>
  );
};
