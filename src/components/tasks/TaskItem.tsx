import { motion } from 'framer-motion';
import { Calendar, Trash2, Check } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Task } from '../../types';
import { CATEGORY_COLORS, PRIORITY_COLORS } from '../../types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

  let formattedDate = '';
  if (task.dueDate) {
    try {
      const parsedDate = parseISO(task.dueDate);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = format(parsedDate, "dd 'de' MMM", { locale: ptBR });
      } else {
        formattedDate = task.dueDate;
      }
    } catch (error) {
      formattedDate = task.dueDate;
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={cn(
        "group relative flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border transition-all duration-300",
        task.completed 
          ? "bg-surface/30 border-border/30 opacity-60 grayscale-[0.3]" 
          : "bg-surface/80 border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      <div className="flex items-start gap-4 flex-1">
        {/* Custom Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-1",
            task.completed
              ? "bg-primary border-primary"
              : "border-text-muted hover:border-primary/50"
          )}
        >
          <motion.div
            initial={false}
            animate={{ scale: task.completed ? 1 : 0, opacity: task.completed ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        </button>

        <div className="flex flex-col gap-2 flex-1">
          <h3 className={cn(
            "font-display font-medium text-lg transition-colors duration-300",
            task.completed ? "text-text-muted line-through" : "text-white group-hover:text-primary-100"
          )}>
            {task.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className={cn(
              "px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border",
              CATEGORY_COLORS[task.category] || CATEGORY_COLORS['PESSOAL']
            )}>
              {task.category}
            </span>
            
            <span className={cn(
              "px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border",
              PRIORITY_COLORS[task.priority]
            )}>
              {task.priority}
            </span>

            {formattedDate && (
              <div className="flex items-center gap-1.5 text-text-muted text-xs font-medium ml-1 bg-background/50 px-2 py-1 rounded-md border border-border/50">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center sm:pl-4 sm:border-l border-border/50 sm:mt-0 mt-2 self-end sm:self-stretch">
        <button
          onClick={() => onDelete(task.id)}
          className="p-2.5 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300"
          title="Excluir tarefa"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
