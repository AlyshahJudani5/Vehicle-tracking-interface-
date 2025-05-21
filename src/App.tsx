import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { MapView } from './pages/MapView';
import { Reports } from './pages/Reports';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';
import { LoginPage } from './components/login/loginPage.tsx'; // Make sure the path is correct
import { useStore } from './store/useStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.userName ? <>{children}</> : <Navigate to="/login" replace />;
}

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.userName) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
      <Router>
        <div className={theme === 'dark' ? 'dark' : ''}>
          <div className={`flex min-h-screen ${
              !isLoggedIn
                  ? ''
                  : theme === 'dark'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 text-gray-900'
          }`}>
            {isLoggedIn && <Sidebar onLogout={handleLogout}/>}
            <main className="flex-1 ml-64 p-8">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)}/>} />
                  <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/map" element={<PrivateRoute><MapView /></PrivateRoute>} />
                  <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
                  <Route path="/alerts" element={<PrivateRoute><Alerts /></PrivateRoute>} />
                  <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
  );
}
