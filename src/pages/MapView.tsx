import {useState} from 'react';
import VehicleMap from '../components/map/VehicleMap';
import {useVehicles} from "../hooks/useVehicles";
import Header from "../components/layout/Header";
import {ListVehicles} from "../components/vehicles/ListVehicles";
import {VehicleDetailPanel} from "../components/vehicles/VehicleDetailPanel";
import {NotificationCenter} from "../components/notification/Notification.tsx";

export function MapView() {
    const {vehicles} = useVehicles();
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
    const [isPanelOpen] = useState(true);

    const handleSearch = (query: string) => {
        const vehicleExists = vehicles.some((v) => v.vehicleNumber === query);
        if (vehicleExists) {
            setSelectedVehicleId(query);
        } else {
            alert("Vehicle not found!");
        }
    };

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold mb-8">Map View</h1>
            </div>

            <main className="flex h-screen flex-col overflow-hidden bg-background">
                {/* Header */}
                <Header onSearch={handleSearch}/>

                <div className="relative flex flex-1 overflow-hidden">
                    {/* Map */}
                    <div className="relative flex-1">
                        <VehicleMap onVehicleSelect={setSelectedVehicleId} selectedVehicleId={selectedVehicleId}/>
                    </div>
                    {/* Side Panel */}
                    <div className={`w-96 transform transition-transform duration-300 ease-in-out
                        ${isPanelOpen ? "translate-x-0" : "translate-x-full"}`}>
                        <div className="h-full border-l bg-background">
                            {/* Conditionally render ListVehicles and VehicleDetailPanel */}
                            {!selectedVehicleId ? (
                                <ListVehicles
                                    onVehicleSelect={setSelectedVehicleId}
                                    selectedVehicleId={selectedVehicleId}
                                />
                            ) : (
                                <VehicleDetailPanel
                                    vehicleId={selectedVehicleId}
                                    onClose={() => setSelectedVehicleId(null)}
                                />
                            )}
                        </div>
                    </div>
                    {/* Notification Center */}
                    <NotificationCenter/>
                </div>
            </main>
        </>
    );
}
