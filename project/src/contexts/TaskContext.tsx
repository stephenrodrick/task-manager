import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskFilter, Priority, Category, Status } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { isOverdue, isToday, isThisWeek, isThisMonth } from '../utils/dateHelpers';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  filters: TaskFilter;
  setFilters: React.Dispatch<React.SetStateAction<TaskFilter>>;
  filteredTasks: Task[];
  stats: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
    todayTasks: number;
    todayCompleted: number;
  };
}

const defaultFilter: TaskFilter = {
  status: 'all',
  priority: 'all',
  category: 'all',
  deadlineRange: 'all',
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filters, setFilters] = useState<TaskFilter>(defaultFilter);

  // Apply filters to tasks
  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }

    // Filter by priority
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }

    // Filter by category
    if (filters.category !== 'all' && task.category !== filters.category) {
      return false;
    }

    // Filter by deadline range
    if (filters.deadlineRange !== 'all') {
      if (filters.deadlineRange === 'today' && !isToday(task.deadline)) {
        return false;
      }
      if (filters.deadlineRange === 'week' && !isThisWeek(task.deadline)) {
        return false;
      }
      if (filters.deadlineRange === 'month' && !isThisMonth(task.deadline)) {
        return false;
      }
      if (filters.deadlineRange === 'overdue' && (!isOverdue(task.deadline) || task.status === 'completed')) {
        return false;
      }
    }

    return true;
  });

  // Calculate stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'completed').length,
    pending: tasks.filter((task) => task.status === 'pending').length,
    overdue: tasks.filter((task) => task.status === 'pending' && isOverdue(task.deadline)).length,
    todayTasks: tasks.filter((task) => isToday(task.deadline)).length,
    todayCompleted: tasks.filter((task) => isToday(task.deadline) && task.status === 'completed').length,
  };

  // Add new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  // Update task
  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Complete task
  const completeTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
        filters,
        setFilters,
        filteredTasks,
        stats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};