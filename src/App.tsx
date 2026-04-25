import { useState, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import type { ViewType } from './components/layout/Navbar';
import { TaskForm } from './components/tasks/TaskForm';
import { FilterBar } from './components/tasks/FilterBar';
import { TaskList } from './components/tasks/TaskList';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { CalendarView } from './components/calendar/CalendarView';
import { AuthScreen } from './components/auth/AuthScreen';
import { useTasks } from './hooks/useTasks';
import { useAuth } from './hooks/useAuth';

type FilterType = 'ALL' | 'PENDING' | 'COMPLETED';

function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { tasks, loading: tasksLoading, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [activeView, setActiveView] = useState<ViewType>('TASKS');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'PENDING':
        return tasks.filter((t) => !t.completed);
      case 'COMPLETED':
        return tasks.filter((t) => t.completed);
      case 'ALL':
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const counts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }), [tasks]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-text overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 -skew-y-6 transform origin-top-left -z-10 blur-3xl"></div>
      
      <Navbar activeView={activeView} onViewChange={setActiveView} onSignOut={signOut} />

      <main className="max-w-5xl mx-auto px-4 pb-24 relative z-10 animate-fade-in">
        {tasksLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-text-muted animate-pulse">Sincronizando com Supabase...</p>
          </div>
        ) : activeView === 'TASKS' && (
          <>
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4 tracking-tight">
                Olá, {user.email?.split('@')[0]} <br className="sm:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  Espaço de Foco
                </span>
              </h1>
              <p className="text-text-muted text-lg max-w-2xl">
                Gerencie suas tarefas com elegância e eficiência. 
                Priorize o que importa e acompanhe seu progresso.
              </p>
            </div>

            <TaskForm onAdd={addTask} />

            <div className="mt-12">
              <FilterBar 
                currentFilter={filter} 
                onFilterChange={setFilter} 
                counts={counts}
              />
              
              <TaskList 
                tasks={filteredTasks} 
                onToggle={toggleTask} 
                onDelete={deleteTask} 
              />
            </div>
          </>
        )}

        {activeView === 'ANALYTICS' && (
          <div className="space-y-8">
            <div className="mb-12">
              <h1 className="text-4xl font-bold font-display text-white mb-4 tracking-tight">Análises</h1>
              <p className="text-text-muted text-lg">Acompanhe seu desempenho e estatísticas das tarefas.</p>
            </div>
            <AnalyticsView tasks={tasks} />
          </div>
        )}

        {activeView === 'CALENDAR' && (
          <div className="space-y-8">
            <div className="mb-12">
              <h1 className="text-4xl font-bold font-display text-white mb-4 tracking-tight">Calendário</h1>
              <p className="text-text-muted text-lg">Visualize suas tarefas ao longo do mês.</p>
            </div>
            <CalendarView tasks={tasks} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
