import { Vehicle } from '../types/vehicle';
import { VehicleCard } from './VehicleCard';

interface VehicleListProps {
  vehicles: Vehicle[];
  onVehicleSelect: (id: string) => void;
}

export function VehicleList({ vehicles, onVehicleSelect }: VehicleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onClick={onVehicleSelect}
        />
      ))}
    </div>
  );
}