import React, { useEffect } from 'react';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { VehicleList } from '../components/VehicleList';
import { useStore } from '../store/useStore';

export function Dashboard() {
  const simulator = useStore((state) => state.simulator);
  const updateVehicles = useStore((state) => state.updateVehicles);
  const vehicles = useStore((state) => state.vehicles);

  useEffect(() => {
    const unsubscribe = simulator.subscribe(updateVehicles);
    simulator.start();
    
    return () => {
      simulator.stop();
      unsubscribe();
    };
  }, [simulator, updateVehicles]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      <MetricsOverview />
      <VehicleList vehicles={vehicles} onVehicleSelect={() => {}} />
    </div>
  );
}