import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDate } from '../utils/formatters';

export function Alerts() {
  const alerts = useStore((state) => state.alerts);
  const acknowledgeAlert = useStore((state) => state.acknowledgeAlert);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Alerts</h1>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`mb-4 p-4 rounded-lg border ${
                alert.severity === 'high'
                  ? 'border-red-200 bg-red-50'
                  : alert.severity === 'medium'
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className={`w-5 h-5 mr-2 ${
                    alert.severity === 'high'
                      ? 'text-red-500'
                      : alert.severity === 'medium'
                      ? 'text-yellow-500'
                      : 'text-blue-500'
                  }`} />
                  <div>
                    <p className="font-semibold">{alert.message}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(alert.timestamp)}
                    </p>
                  </div>
                </div>
                
                {!alert.acknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="flex items-center px-3 py-1 text-sm text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}