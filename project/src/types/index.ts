export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'fitness' | 'education' | 'other';
export type Status = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  status: Status;
  deadline: string; // ISO string format
  createdAt: string; // ISO string format
}

export interface TaskFilter {
  status: Status | 'all';
  priority: Priority | 'all';
  category: Category | 'all';
  deadlineRange: 'all' | 'today' | 'week' | 'month' | 'overdue';
}