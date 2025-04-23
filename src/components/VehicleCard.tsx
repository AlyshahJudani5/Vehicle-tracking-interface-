import React from 'react';
import { Car, Fuel, MapPin } from 'lucide-react';
import { Vehicle } from '../types/vehicle';
import { formatDate, formatFuelLevel, formatMileage } from '../utils/formatters';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (id: string) => void;
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(vehicle.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{vehicle.plateNumber}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${
          vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
          vehicle.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {vehicle.status}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Car className="w-4 h-4 mr-2" />
          <span>{vehicle.make} {vehicle.model} ({vehicle.year})</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>Last seen: {formatDate(vehicle.lastLocation.timestamp)}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center">
            <Fuel className="w-4 h-4 mr-2" />
            <span>Fuel: {formatFuelLevel(vehicle.fuelLevel)}</span>
          </div>
          <span>Mileage: {formatMileage(vehicle.mileage)}</span>
        </div>
      </div>
    </div>
  );
}