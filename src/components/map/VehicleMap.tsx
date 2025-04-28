import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L, { Marker as LeafletMarker }  from "leaflet";
import "leaflet/dist/leaflet.css";
import { useVehicles } from "../../hooks/useVehicles.tsx";
import { Car, Dot } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';
import { Vehicle} from "../../data/data.ts"; // Assuming this import is correct


const createIconFromComponent = (component: JSX.Element) => {
    return new L.Icon({
        iconUrl: 'data:image/svg+xml;base64,' + btoa(ReactDOMServer.renderToStaticMarkup(component)),
        iconSize: [30, 30],
        iconAnchor: [15, 30],
    });
};

interface MapProps {
    onVehicleSelect: (id: string) => void;
    selectedVehicleId: string | null;
}

type MarkerRef = {
    [key: string]: LeafletMarker; // Vehicle numbers as keys, Leaflet markers as values
};

export default function VehicleMap({ onVehicleSelect, selectedVehicleId }: MapProps) {
    const { vehicles } = useVehicles();
    const [map, setMap] = useState<L.Map | null>(null);
    const markersRef = useRef<MarkerRef>({});

    const [selectedVehicleJourney, setSelectedVehicleJourney] = useState<any[]>([]);

    const startingPointIcon = createIconFromComponent(<Dot size={50} color="black" />);

    function getLocationUpdatesLastHour(vehicle: Vehicle) {
        const updatesWithDate = vehicle.locationUpdates.map((update: any) => {
            const [day, month, year] = update.date.split("/");
            const formattedDate = `${year}-${month}-${day}`;
            const timeParts = update.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
            if (!timeParts) {
                throw new Error("Invalid time format");
            }
            let [_, hours, minutes, period] = timeParts;
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);

            if (period.toUpperCase() === "PM" && hours !== 12) {
                hours += 12;
            } else if (period.toUpperCase() === "AM" && hours === 12) {
                hours = 0;
            }

            const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
            const formattedDateTime = `${formattedDate}T${formattedTime}`;
            const date = new Date(formattedDateTime);
            return { ...update, dateObject: date };
        });

        const latestUpdate = updatesWithDate.reduce((latest, current) => {
            return current.dateObject > latest.dateObject ? current : latest;
        });


        const oneHourBefore = new Date(latestUpdate.dateObject.getTime() - (30 * 60 * 1000));
        const updatesLastHour = updatesWithDate.filter(update => update.dateObject >= oneHourBefore);

        return updatesLastHour.map((update) => ({
            date: update.date,
            time: update.time,
            latitude: update.latitude,
            longitude: update.longitude,
            area: update.area,
            ignition: update.ignition,
            speed: update.speed,
            status: update.status,
            distance: update.distance
        }));
    }

    useEffect(() => {
        if (map && selectedVehicleId) {
            const vehicle = (vehicles).find((v) => v.vehicleNumber === selectedVehicleId);
            if (vehicle) {
                const recentUpdates = getLocationUpdatesLastHour(vehicle);
                const journey = recentUpdates.map((update) => [update.latitude, update.longitude]);
                setSelectedVehicleJourney(journey);

                const firstUpdate = recentUpdates[0];
                if (firstUpdate) {
                    map.setView([firstUpdate.latitude, firstUpdate.longitude], 15);
                }

                const marker = markersRef.current[selectedVehicleId];
                if (marker) marker.openPopup();
            }
        }
    }, [selectedVehicleId, vehicles, map]);

    return (
        <MapContainer
            center={[24.8007, 67.0711]}
            zoom={13}
            className="h-full w-full"
            style={{ position: "absolute" }}
            // @ts-expect-error: Ignoring error because the map component is dynamically loaded
            whenReady={(event: L.LeafletEvent) => setMap(event.target)}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {vehicles.map((vehicle) => {
                const recentUpdates = getLocationUpdatesLastHour(vehicle);
                if (recentUpdates.length === 0) return null;

                const latestUpdate = recentUpdates[recentUpdates.length - 1];
                const vehicleIcon = createIconFromComponent(<Car size={30} color="blue" />);

                return (
                    <Marker
                        key={vehicle.vehicleNumber}
                        position={[latestUpdate.latitude, latestUpdate.longitude]}
                        icon={vehicleIcon}
                        ref={(marker) => {
                            if (marker) markersRef.current[vehicle.vehicleNumber] = marker;
                        }}
                        eventHandlers={{
                            click: () => onVehicleSelect(vehicle.vehicleNumber),
                        }}
                    >
                        <Popup offset={[0, -20]}>
                            <div className="p-0">
                                <h3 className="font-semibold">{vehicle.vehicleNumber}</h3>
                                <p>Area: {latestUpdate.area}</p>
                                <p>Time: {latestUpdate.time}</p>
                                <p>Date: {latestUpdate.date}</p>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}

            {selectedVehicleJourney.length > 0 && (
                <>
                    <Polyline
                        positions={selectedVehicleJourney}
                        color="blue"
                        weight={4}
                        opacity={0.7}
                    />
                    <Marker
                        position={selectedVehicleJourney[0]}
                        icon={startingPointIcon}
                    >
                        <Popup offset={[0, -20]}>
                            <div className="p-0">
                                <h3 className="font-semibold">Starting Point</h3>
                                <p>Journey Start</p>
                            </div>
                        </Popup>
                    </Marker>
                </>
            )}
        </MapContainer>
    );
}
