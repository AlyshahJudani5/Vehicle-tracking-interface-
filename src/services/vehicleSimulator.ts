import { Vehicle } from '../types/vehicle';

const SPEED_VARIATION = 10; // km/h
const LOCATION_VARIATION = 0.001; // degrees
const UPDATE_INTERVAL = 2000; // ms

export class VehicleSimulator {
  private subscribers: ((vehicles: Vehicle[]) => void)[] = [];
  private vehicles: Vehicle[] = [];
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(initialVehicles: Vehicle[]) {
    this.vehicles = initialVehicles;
  }

  subscribe(callback: (vehicles: Vehicle[]) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  start() {
    if (this.interval) return;
    
    this.interval = setInterval(() => {
      this.updateVehicles();
      this.notifySubscribers();
    }, UPDATE_INTERVAL);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private updateVehicles() {
    this.vehicles = this.vehicles.map(vehicle => {
      if (vehicle.status !== 'active') return vehicle;

      const speedDelta = (Math.random() - 0.5) * SPEED_VARIATION;
      const newSpeed = Math.max(0, Math.min(vehicle.maxSpeed, vehicle.currentSpeed + speedDelta));

      const latDelta = (Math.random() - 0.5) * LOCATION_VARIATION;
      const lngDelta = (Math.random() - 0.5) * LOCATION_VARIATION;

      return {
        ...vehicle,
        currentSpeed: Math.round(newSpeed),
        lastLocation: {
          latitude: vehicle.lastLocation.latitude + latDelta,
          longitude: vehicle.lastLocation.longitude + lngDelta,
          timestamp: new Date().toISOString(),
        },
        fuelLevel: Math.max(0, vehicle.fuelLevel - Math.random() * 0.1),
      };
    });
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.vehicles));
  }
}