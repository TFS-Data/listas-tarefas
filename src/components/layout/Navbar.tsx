import { LayoutList, PieChart, CalendarDays, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ViewType = 'TASKS' | 'ANALYTICS' | 'CALENDAR';

interface NavbarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onSignOut: () => void;
}

export function Navbar({ activeView, onViewChange, onSignOut }: NavbarProps) {
  const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

  const navItems = [
    { id: 'TASKS' as ViewType, label: 'Tarefas', icon: LayoutList },
    { id: 'ANALYTICS' as ViewType, label: 'Análises', icon: PieChart },
    { id: 'CALENDAR' as ViewType, label: 'Calendário', icon: CalendarDays },
  ];

  return (
    <nav className="glass-panel sticky top-4 z-50 mx-4 md:mx-auto max-w-5xl mb-8">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('TASKS')}>
          <div className="bg-primary/20 p-2 rounded-xl border border-primary/30">
            <LayoutList className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">
            Task<span className="text-primary">Flow</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                  isActive 
                    ? "text-white bg-white/10 border border-white/10 shadow-lg" 
                    : "text-text-muted hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive && "text-primary")} />
                {item.label}
              </button>
            );
          })}
        </div>

        <button 
          onClick={onSignOut}
          className="flex items-center gap-2 text-text-muted hover:text-red-400 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </nav>
  );
}
