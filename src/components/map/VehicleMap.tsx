import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useStore } from '../../store/useStore';
import 'leaflet/dist/leaflet.css';

function VehicleMarkers() {
  const vehicles = useStore((state) => state.vehicles);
  const setSelectedVehicle = useStore((state) => state.setSelectedVehicle);
  const map = useMap();

  useEffect(() => {
    // Fit map bounds to include all vehicles
    if (vehicles.length > 0) {
      const bounds = vehicles.reduce(
        (bounds, vehicle) => bounds.extend([
          vehicle.lastLocation.latitude,
          vehicle.lastLocation.longitude
        ]),
        map.getBounds()
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [vehicles, map]);

  return (
    <>
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={[vehicle.lastLocation.latitude, vehicle.lastLocation.longitude]}
          eventHandlers={{
            click: () => setSelectedVehicle(vehicle),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{vehicle.plateNumber}</h3>
              <p className="text-sm">
                {vehicle.make} {vehicle.model}
              </p>
              <p className="text-sm">Speed: {vehicle.currentSpeed} km/h</p>
              <p className="text-sm">Status: {vehicle.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export function VehicleMap() {
  return (
    <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[40.7128, -74.006]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <VehicleMarkers />
      </MapContainer>
    </div>
  );
}