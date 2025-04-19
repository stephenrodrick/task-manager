import React from 'react';
import { Priority, Category, Status } from '../../types';

interface BadgeProps {
  type: 'priority' | 'category' | 'status';
  value: Priority | Category | Status;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, value, className = '' }) => {
  const getColorClasses = () => {
    if (type === 'priority') {
      switch (value) {
        case 'high':
          return 'bg-red-100 text-red-800 border-red-200';
        case 'medium':
          return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'low':
          return 'bg-green-100 text-green-800 border-green-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else if (type === 'category') {
      switch (value) {
        case 'work':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'personal':
          return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'fitness':
          return 'bg-teal-100 text-teal-800 border-teal-200';
        case 'education':
          return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else if (type === 'status') {
      switch (value) {
        case 'completed':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLabel = () => {
    // Capitalize first letter of value
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getColorClasses()} ${className}`}
    >
      {getLabel()}
    </span>
  );
};