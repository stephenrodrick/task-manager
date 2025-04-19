import React from 'react';
import { CheckSquare, Menu, Sun, Moon } from 'lucide-react';
import { useTaskContext } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../UI/Button';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { stats } = useTaskContext();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-200">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 lg:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          
          <div className="flex items-center ml-2 lg:ml-0">
            <CheckSquare className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">TaskFlow</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <div className="hidden md:flex space-x-4">
            <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/50 px-4 py-2 rounded-lg">
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Tasks</span>
              <span className="text-lg font-bold text-blue-800 dark:text-blue-300">{stats.total}</span>
            </div>
            
            <div className="flex flex-col items-center bg-green-50 dark:bg-green-900/50 px-4 py-2 rounded-lg">
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Completed</span>
              <span className="text-lg font-bold text-green-800 dark:text-green-300">{stats.completed}</span>
            </div>
            
            <div className="flex flex-col items-center bg-red-50 dark:bg-red-900/50 px-4 py-2 rounded-lg">
              <span className="text-xs text-red-600 dark:text-red-400 font-medium">Overdue</span>
              <span className="text-lg font-bold text-red-800 dark:text-red-300">{stats.overdue}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};