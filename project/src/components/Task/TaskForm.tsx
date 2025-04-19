import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Priority, Category, Task } from '../../types';
import { Button } from '../UI/Button';
import { useTaskContext } from '../../contexts/TaskContext';

interface TaskFormProps {
  task?: Task;
  onSubmit: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {
  const { addTask, updateTask } = useTaskContext();
  const isEditMode = !!task;
  
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<Priority>(task?.priority || 'medium');
  const [category, setCategory] = useState<Category>(task?.category || 'work');
  const [deadlineDate, setDeadlineDate] = useState(
    task?.deadline 
      ? new Date(task.deadline).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0]
  );
  const [deadlineTime, setDeadlineTime] = useState(
    task?.deadline 
      ? new Date(task.deadline).toTimeString().slice(0, 5) 
      : '12:00'
  );
  
  const [errors, setErrors] = useState({
    title: '',
    date: '',
  });

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setCategory(task.category);
      
      const date = new Date(task.deadline);
      setDeadlineDate(date.toISOString().split('T')[0]);
      
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      setDeadlineTime(`${hours}:${minutes}`);
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {
      title: '',
      date: '',
    };
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!deadlineDate) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return !newErrors.title && !newErrors.date;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Combine date and time into ISO string
    const deadlineDateTime = new Date(`${deadlineDate}T${deadlineTime}`).toISOString();
    
    if (isEditMode && task) {
      updateTask(task.id, {
        title,
        description,
        priority,
        category,
        deadline: deadlineDateTime,
      });
    } else {
      addTask({
        title,
        description,
        priority,
        category,
        status: 'pending',
        deadline: deadlineDateTime,
      });
    }
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm
          ${errors.title ? 'border-red-300' : 'border-gray-300'}`}
          placeholder="Task title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description (optional)
        </label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Add details about your task"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 
            focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 
            focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="fitness">Fitness</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Due Date
          </label>
          <input
            type="date"
            id="date"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm
            ${errors.date ? 'border-red-300' : 'border-gray-300'}`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Due Time
          </label>
          <input
            type="time"
            id="time"
            value={deadlineTime}
            onChange={(e) => setDeadlineTime(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onSubmit}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
        >
          {isEditMode ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
};