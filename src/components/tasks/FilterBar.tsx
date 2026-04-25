import { Filter } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type FilterType = 'ALL' | 'PENDING' | 'COMPLETED';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
  };
}

export function FilterBar({ currentFilter, onFilterChange, counts }: FilterBarProps) {
  const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

  const filterOptions: { label: string; value: FilterType; count: number }[] = [
    { label: 'Todas', value: 'ALL', count: counts.all },
    { label: 'Pendentes', value: 'PENDING', count: counts.pending },
    { label: 'Concluídas', value: 'COMPLETED', count: counts.completed },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-text-muted" />
        <h2 className="font-display font-medium text-lg text-white">Filtros</h2>
      </div>
      
      <div className="flex bg-surface/80 p-1.5 rounded-xl border border-border/50 backdrop-blur-sm w-full sm:w-auto overflow-x-auto custom-scrollbar">
        {filterOptions.map(({ label, value, count }) => {
          const isActive = currentFilter === value;
          return (
            <button
              key={value}
              onClick={() => onFilterChange(value)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap',
                isActive 
                  ? 'bg-primary/20 text-primary border border-primary/20 shadow-sm' 
                  : 'text-text-muted hover:text-white hover:bg-white/5 border border-transparent'
              )}
            >
              {label}
              <span className={cn(
                'px-2 py-0.5 rounded-full text-xs',
                isActive ? 'bg-primary/20 text-primary-hover' : 'bg-background/80 text-text-muted'
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
