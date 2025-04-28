import React from 'react';
import {useVehicles} from '../../hooks/useVehicles.tsx';
import {Clock, MapPin, Car} from 'lucide-react';
import {ScrollArea} from "../ui/ScrollArea.tsx";
import {useStore} from "../../store/useStore.ts";

interface VehicleListProps {
    onVehicleSelect: (id: string) => void;
    selectedVehicleId: string | null;
}

export const ListVehicles: React.FC<VehicleListProps> = ({onVehicleSelect, selectedVehicleId}) => {
    const {vehicles} = useVehicles();
    const theme = useStore((state) => state.theme);

    return (
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <div className="p-4">
                <h2 className="mb-4 text-lg font-semibold">Vehicles Overview</h2>
                <div className="space-y-2">
                    {vehicles.map((vehicle) => {
                        // Get the latest location update for each vehicle
                        const latestUpdate = vehicle.locationUpdates[vehicle.locationUpdates.length - 1];

                        return (
                            <button
                                key={vehicle.vehicleNumber}
                                onClick={() => onVehicleSelect(vehicle.vehicleNumber)}
                                className={`w-full rounded-lg border p-4 text-left transition-colors 
                                ${theme === 'dark' ? '' : 'hover:bg-[#F4F4F5]'}  
                                ${selectedVehicleId === vehicle.vehicleNumber ? 'border-primary bg-accent' : ''}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Car className="h-5 w-5"/>
                                        <div>
                                            <h3 className="font-medium">{vehicle.vehicleNumber}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                    {/* Display the latest area */}
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4"/>
                                        <span>{latestUpdate?.area}</span>
                                    </div>
                                    {/* Display the latest time */}
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4"/>
                                        <span>{latestUpdate?.time}</span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </ScrollArea>
    );
};
