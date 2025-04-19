import React, { useState } from 'react';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { TaskList } from './components/Task/TaskList';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <TaskList />
            </main>
          </div>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App