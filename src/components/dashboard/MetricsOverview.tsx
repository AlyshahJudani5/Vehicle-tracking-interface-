import React from 'react';
import { Car, AlertTriangle, Gauge, WifiOff } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function MetricsOverview() {
  const vehicles = useStore((state) => state.vehicles);
  const theme = useStore((state) => state.theme);

  const metrics = [
    {
      title: 'Active Vehicles',
      value: vehicles.filter((v) => v.status === 'active').length,
      icon: Car,
      color: 'text-green-500',
    },
    {
      title: 'Average Speed',
      value: `${Math.round(
        vehicles.reduce((acc, v) => acc + v.currentSpeed, 0) / vehicles.length
      )} km/h`,
      icon: Gauge,
      color: 'text-blue-500',
    },
    {
      title: 'Active Alerts',
      value: vehicles.reduce((acc, v) => acc + v.alerts.filter(a => !a.acknowledged).length, 0),
      icon: AlertTriangle,
      color: 'text-yellow-500',
    },
    {
      title: 'Offline Vehicles',
      value: vehicles.filter((v) => v.status === 'inactive').length,
      icon: WifiOff,
      color: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } p-6 rounded-lg shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {metric.title}
              </p>
              <p className="text-2xl font-semibold mt-1">{metric.value}</p>
            </div>
            <metric.icon className={`w-8 h-8 ${metric.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}