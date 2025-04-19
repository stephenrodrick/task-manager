import React from 'react';
import { Edit, Trash2, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { Task } from '../../types';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { formatDate, isOverdue, getRelativeTimeString } from '../../utils/dateHelpers';
import { useTaskContext } from '../../contexts/TaskContext';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { completeTask, deleteTask } = useTaskContext();
  const overdue = task.status === 'pending' && isOverdue(task.deadline);
  
  return (
    <div 
      className={`task-card bg-white rounded-xl shadow-sm border p-5 mb-4
      ${task.status === 'completed' ? 'opacity-75 border-green-200 bg-green-50/30' : ''}
      ${overdue ? 'border-red-200 bg-red-50/30' : 'border-gray-200/60'}
      hover:border-blue-200`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => completeTask(task.id)}
          className={`mt-1 flex-shrink-0 transition-colors duration-200 ${
            task.status === 'completed'
              ? 'text-green-500 hover:text-green-600'
              : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          <CheckCircle className="h-6 w-6" />
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge type="category" value={task.category} />
            <Badge type="priority" value={task.priority} />
            {task.status === 'completed' && <Badge type="status" value="completed" />}
          </div>
          
          <h3 className={`text-lg font-semibold leading-6 mb-2 
            ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}
          >
            {task.title}
          </h3>
          
          {task.description && (
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{task.description}</p>
          )}
          
          <div className="mt-4 flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
            <span className={`${overdue ? 'text-red-600 font-medium flex items-center' : 'text-gray-500'}`}>
              {overdue ? (
                <>
                  <AlertCircle className="mr-1.5 h-4 w-4" />
                  {getRelativeTimeString(task.deadline)}
                </>
              ) : (
                formatDate(task.deadline)
              )}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 ml-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded-lg"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg"
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};