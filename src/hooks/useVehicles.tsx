import {useState, useEffect} from "react";
import {Vehicle, LocationUpdate, mockVehicles} from "../data/data.ts"; // Assuming this import is correct

export function useVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles.slice(0, 50)); // Initialize with the first 50 mock vehicles

    useEffect(() => {
        const interval = setInterval(() => {
            setVehicles((prevVehicles) =>
                prevVehicles.map((vehicle) => {
                    const latestUpdate = vehicle.locationUpdates[vehicle.locationUpdates.length - 1];

                    const newLatitude = latestUpdate.latitude + (Math.random() - 0.5) * 0.001;
                    const newLongitude = latestUpdate.longitude + (Math.random() - 0.5) * 0.001;

                    const newUpdate: LocationUpdate = {
                        date: latestUpdate.date,
                        time: latestUpdate.time,
                        latitude: newLatitude,
                        longitude: newLongitude,
                        area: latestUpdate.area,
                        ignition: latestUpdate.ignition,
                        speed: latestUpdate.speed,
                        status: latestUpdate.status,
                        distance: latestUpdate.distance,
                    };

                    return {
                        ...vehicle,
                        locationUpdates: [...vehicle.locationUpdates, newUpdate],
                    };
                })
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return {vehicles};
}
