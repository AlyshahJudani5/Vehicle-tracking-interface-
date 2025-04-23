export interface Vehicle {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  status: 'active' | 'maintenance' | 'inactive';
  lastLocation: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
  currentSpeed: number;
  maxSpeed: number;
  fuelLevel: number;
  mileage: number;
  driver: string;
  route: string;
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'speed' | 'fuel' | 'maintenance' | 'geofence';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  acknowledged: boolean;
}