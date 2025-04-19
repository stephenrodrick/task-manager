import React from 'react';
import { Home, Calendar, PieChart, Tag, Clock, ListFilter } from 'lucide-react';
import { Button } from '../UI/Button';
import { useTaskContext } from '../../contexts/TaskContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { filters, setFilters } = useTaskContext();

  const menuItems = [
    { 
      name: 'All Tasks', 
      icon: <Home className="h-5 w-5" />, 
      action: () => setFilters({ ...filters, status: 'all', priority: 'all', category: 'all', deadlineRange: 'all' })
    },
    { 
      name: 'Today', 
      icon: <Calendar className="h-5 w-5" />, 
      action: () => setFilters({ ...filters, deadlineRange: 'today' })
    },
    { 
      name: 'This Week', 
      icon: <Clock className="h-5 w-5" />, 
      action: () => setFilters({ ...filters, deadlineRange: 'week' })
    },
    { 
      name: 'Overdue', 
      icon: <Clock className="h-5 w-5 text-red-500" />, 
      action: () => setFilters({ ...filters, deadlineRange: 'overdue' })
    },
    { 
      name: 'Completed', 
      icon: <PieChart className="h-5 w-5" />, 
      action: () => setFilters({ ...filters, status: 'completed' })
    },
  ];

  const categories = [
    { name: 'Work', value: 'work' },
    { name: 'Personal', value: 'personal' },
    { name: 'Fitness', value: 'fitness' },
    { name: 'Education', value: 'education' },
    { name: 'Other', value: 'other' },
  ];

  const priorities = [
    { name: 'High', value: 'high' },
    { name: 'Medium', value: 'medium' },
    { name: 'Low', value: 'low' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-500 bg-opacity-75 transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto pb-4">
          {/* Sidebar header (mobile only) */}
          <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">TaskFlow</h2>
            <button
              type="button"
              className="ml-4 h-10 w-10 rounded-full flex items-center justify-center text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {/* Main navigation */}
          <nav className="flex-1 px-4 py-4 space-y-6">
            <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Views
              </h3>
              <div className="space-y-1 mt-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start"
                    leftIcon={item.icon}
                    onClick={item.action}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                Categories
              </h3>
              <div className="space-y-1 mt-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => setFilters({ ...filters, category: category.value as any })}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                <ListFilter className="h-4 w-4 mr-1" />
                Priorities
              </h3>
              <div className="space-y-1 mt-2">
                {priorities.map((priority) => (
                  <Button
                    key={priority.name}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => setFilters({ ...filters, priority: priority.value as any })}
                  >
                    {priority.name}
                  </Button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};