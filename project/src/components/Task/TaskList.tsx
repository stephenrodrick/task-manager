import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Task } from '../../types';
import { useTaskContext } from '../../contexts/TaskContext';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { TaskProgress } from './TaskProgress';
import { TaskFilters } from './TaskFilters';

export const TaskList: React.FC = () => {
  const { filteredTasks } = useTaskContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  
  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  return (
    <div className="py-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your tasks and track your progress
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<PlusCircle className="h-5 w-5" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Task
        </Button>
      </div>
      
      <TaskProgress />
      
      <div className="mt-6">
        <TaskFilters />
      </div>
      
      <div className="mt-6">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
            <p className="mt-1 text-gray-500">
              {filteredTasks.length === 0
                ? "You don't have any tasks matching your filters."
                : "You don't have any tasks yet. Click 'Add Task' to create your first task."}
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Task
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => handleEditTask(task)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Task"
      >
        <TaskForm
          onSubmit={() => setIsAddModalOpen(false)}
        />
      </Modal>
      
      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Task"
      >
        <TaskForm
          task={currentTask}
          onSubmit={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};