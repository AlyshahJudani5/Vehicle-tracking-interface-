import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Settings() {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-5 h-5 mr-2" />
                  Switch to Dark Mode
                </>
              ) : (
                <>
                  <Sun className="w-5 h-5 mr-2" />
                  Switch to Light Mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}