import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Coaster {
  id: string;
  name: string;
  rideCount: number;
  imageUrl?: string;      // ← new
}

export interface Park { id: string; name: string; coasters: Coaster[]; }

interface ParkContextValue {
  parks: Park[];
  ride: (parkId: string, coasterId: string) => void;
}

const ParkContext = createContext<ParkContextValue | undefined>(undefined);

export const ParkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parks, setParks] = useState<Park[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('/parks.json');
      const data: Omit<Park, 'coasters'>[] = await res.json();
      const stored = JSON.parse(localStorage.getItem('rideCounts') || '{}');
      const enriched = data.map(p => ({
        ...p,
        coasters: p.coasters.map(c => ({
          ...c,
          rideCount: stored[c.id] || 0,
          imageUrl: (c as any).image || '',  // assume your JSON gives you an `image` URL
        })),
      }));
      setParks(enriched);
    })();
  }, []);

  const ride = (parkId: string, coasterId: string) => {
    setParks(prev => {
      const updated = prev.map(p =>
        p.id !== parkId
          ? p
          : {
              ...p,
              coasters: p.coasters.map(c =>
                c.id === coasterId ? { ...c, rideCount: c.rideCount + 1 } : c
              ),
            }
      );
      // persist
      const allCounts: Record<string, number> = {};
      updated.forEach(p => p.coasters.forEach(c => (allCounts[c.id] = c.rideCount)));
      localStorage.setItem('rideCounts', JSON.stringify(allCounts));
      return updated;
    });
  };

  return (
    <ParkContext.Provider value={{ parks, ride }}>
      {children}
    </ParkContext.Provider>
  );
};

export const usePark = () => {
  const ctx = useContext(ParkContext);
  if (!ctx) throw new Error('usePark must be inside ParkProvider');
  return ctx;
};
