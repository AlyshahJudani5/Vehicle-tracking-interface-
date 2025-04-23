import { create } from 'zustand';
import { Vehicle, Alert } from '../types/vehicle';
import { mockVehicles } from '../data/mockData';
import { VehicleSimulator } from '../services/vehicleSimulator';

interface StoreState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  alerts: Alert[];
  theme: 'light' | 'dark';
  simulator: VehicleSimulator;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  toggleTheme: () => void;
  acknowledgeAlert: (alertId: string) => void;
  updateVehicles: (vehicles: Vehicle[]) => void;
}

const simulator = new VehicleSimulator(mockVehicles);

export const useStore = create<StoreState>((set) => ({
  vehicles: mockVehicles,
  selectedVehicle: null,
  alerts: mockVehicles.flatMap(v => v.alerts),
  theme: 'light',
  simulator,
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  acknowledgeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      ),
    })),
  updateVehicles: (vehicles) => set({ vehicles }),
}));