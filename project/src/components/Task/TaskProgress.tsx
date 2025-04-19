import React from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export const TaskProgress: React.FC = () => {
  const { stats } = useTaskContext();
  
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const todayCompletionRate = stats.todayTasks > 0 ? Math.round((stats.todayCompleted / stats.todayTasks) * 100) : 0;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">
                  {completionRate}% Complete
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {stats.completed}/{stats.total} Tasks
                </span>
              </div>
              <div className="progress-bar">
                <div
                  style={{ width: `${completionRate}%` }}
                  className="progress-bar-fill"
                ></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-700 text-center mb-1">
                {stats.completed}
              </div>
              <div className="text-xs font-medium text-green-600 text-center">
                Completed
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-700 text-center mb-1">
                {stats.pending}
              </div>
              <div className="text-xs font-medium text-yellow-600 text-center">
                Pending
              </div>
            </div>
            
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-700 text-center mb-1">
                {stats.overdue}
              </div>
              <div className="text-xs font-medium text-red-600 text-center">
                Overdue
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h3>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-indigo-700">
                  {todayCompletionRate}% Complete
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {stats.todayCompleted}/{stats.todayTasks} Tasks
                </span>
              </div>
              <div className="progress-bar bg-indigo-100">
                <div
                  style={{ width: `${todayCompletionRate}%` }}
                  className="progress-bar-fill bg-indigo-600"
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h4 className="text-base font-semibold text-gray-900 mb-3">Activity Overview</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {stats.total === 0 ? (
                "You don't have any tasks yet. Add your first task to start tracking your progress!"
              ) : stats.pending === 0 ? (
                "🎉 Great job! You've completed all of your tasks."
              ) : stats.overdue > 0 ? (
                `⚠️ You have ${stats.overdue} overdue task${stats.overdue !== 1 ? 's' : ''}. Let's get them done!`
              ) : stats.todayTasks > 0 ? (
                `📅 You have ${stats.todayTasks - stats.todayCompleted} task${stats.todayTasks - stats.todayCompleted !== 1 ? 's' : ''} scheduled for today.`
              ) : (
                `📋 You have ${stats.pending} pending task${stats.pending !== 1 ? 's' : ''} to complete.`
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};