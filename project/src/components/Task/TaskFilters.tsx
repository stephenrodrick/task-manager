import React from 'react';
import { Filter, X } from 'lucide-react';
import { useTaskContext } from '../../contexts/TaskContext';
import { Button } from '../UI/Button';

export const TaskFilters: React.FC = () => {
  const { filters, setFilters } = useTaskContext();
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, status: e.target.value as any });
  };
  
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, priority: e.target.value as any });
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, category: e.target.value as any });
  };
  
  const handleDeadlineRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, deadlineRange: e.target.value as any });
  };
  
  const clearFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      category: 'all',
      deadlineRange: 'all',
    });
  };

  const selectClasses = `
    mt-1 block w-full rounded-lg border-gray-200 bg-white py-2 pl-3 pr-10 text-sm
    focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
    transition-colors duration-200
  `;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-600 hover:text-gray-900"
          leftIcon={<X className="h-4 w-4" />}
        >
          Clear All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={handleStatusChange}
            className={selectClasses}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority-filter"
            value={filters.priority}
            onChange={handlePriorityChange}
            className={selectClasses}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={handleCategoryChange}
            className={selectClasses}
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="fitness">Fitness</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="deadline-filter" className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <select
            id="deadline-filter"
            value={filters.deadlineRange}
            onChange={handleDeadlineRangeChange}
            className={selectClasses}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>
    </div>
  );
};