import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { MapView } from './pages/MapView';
import { Reports } from './pages/Reports';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';
import { useStore } from './store/useStore';

export function App() {
  const theme = useStore((state) => state.theme);

  return (
    <Router>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className={`flex min-h-screen ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        }`}>
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}