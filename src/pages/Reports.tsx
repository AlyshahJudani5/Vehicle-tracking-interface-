// import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
// import { Line, Pie } from 'react-chartjs-2';
import { useStore } from '../store/useStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function Reports() {
  const vehicles = useStore((state) => state.vehicles);

  const speedData = {
    labels: vehicles.map(v => v.plateNumber),
    datasets: [
      {
        label: 'Current Speed (km/h)',
        data: vehicles.map(v => v.currentSpeed),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const statusData = {
    labels: ['Active', 'Maintenance', 'Inactive'],
    datasets: [
      {
        data: [
          vehicles.filter(v => v.status === 'active').length,
          vehicles.filter(v => v.status === 'maintenance').length,
          vehicles.filter(v => v.status === 'inactive').length,
        ],
        backgroundColor: [
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
        ],
      },
    ],
  };

  return (
          <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Kibana Dashboard</h2>
          <iframe
              src=" https://70eea4f8f288.ngrok-free.app/app/dashboards#/view/your-dashboard-id?embed=true"
            height="700"
            width="100%"
            style={{ border: 'none' }}
          ></iframe>
        {/* </div>

        // <div>
    //   <h1 className="text-2xl font-bold mb-8">Reports</h1>
      
    //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    //     <div className="bg-white p-6 rounded-lg shadow-md">
    //       <h2 className="text-xl font-semibold mb-4">Vehicle Speeds</h2>
    //       <Line data={speedData} />
    //     </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Vehicle Status Distribution</h2>
          <Pie data={statusData} />
        </div>
      </div> */}
    </div>
  );
}