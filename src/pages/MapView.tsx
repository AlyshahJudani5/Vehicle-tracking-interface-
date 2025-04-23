import React from 'react';
import { VehicleMap } from '../components/map/VehicleMap';

export function MapView() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Map View</h1>
      <VehicleMap />
    </div>
  );
}