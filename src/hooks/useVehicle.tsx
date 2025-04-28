import { useState, useEffect } from "react";

import { Vehicle, mockVehicles as vehicles } from "../data/data"

export function useVehicle(vehicleNumber: string) {
    // Custom hook to fetch data for a single vehicle
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        // Find the vehicle in imported data3.ts by vehicleNumber
        const foundVehicle = vehicles.find(
            (v: Vehicle) => v.vehicleNumber === vehicleNumber
        );

        // Set the found vehicle in state if it exists
        if (foundVehicle) {
            setVehicle(foundVehicle);
        } else {
            console.warn(`Vehicle with number ${vehicleNumber} not found.`);
            setVehicle(null); // Handle case where vehicle is not found
        }
    }, [vehicleNumber]);

    return { vehicle };
}
