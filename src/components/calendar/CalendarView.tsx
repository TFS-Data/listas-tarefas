import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import type { Task } from '../../types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CalendarViewProps {
  tasks: Task[];
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="glass-panel p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-xl border border-primary/30">
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display font-bold text-2xl text-white capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h3>
        </div>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="glass-button-secondary p-2 px-3">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextMonth} className="glass-button-secondary p-2 px-3">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-text-muted uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-t border-l border-border/50">
        {days.map((day) => {
          const dayTasks = tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate + 'T12:00:00'), day));
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[120px] p-2 border-r border-b border-border/50 transition-colors",
                !isCurrentMonth ? "bg-black/20" : "hover:bg-white/5",
                isToday && "bg-primary/5"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={cn(
                  "text-sm font-medium p-1 w-8 h-8 flex items-center justify-center rounded-lg",
                  isToday ? "bg-primary text-white" : isCurrentMonth ? "text-white" : "text-text-muted"
                )}>
                  {format(day, 'd')}
                </span>
              </div>
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map(task => (
                  <div
                    key={task.id}
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded border truncate",
                      task.completed ? "bg-surface/50 border-border/50 text-text-muted line-through" : "bg-primary/20 border-primary/30 text-primary-hover font-medium"
                    )}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-[10px] text-text-muted pl-1 italic">
                    + {dayTasks.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
