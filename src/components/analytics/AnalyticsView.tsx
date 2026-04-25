import { motion } from 'framer-motion';
import { PieChart, CheckCircle2, Clock, BarChart3, TrendingUp } from 'lucide-react';
import type { Task } from '../../types';

interface AnalyticsViewProps {
  tasks: Task[];
}

export function AnalyticsView({ tasks }: AnalyticsViewProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const priorityCounts = {
    ALTA: tasks.filter(t => t.priority === 'ALTA').length,
    MÉDIA: tasks.filter(t => t.priority === 'MÉDIA').length,
    BAIXA: tasks.filter(t => t.priority === 'BAIXA').length,
  };

  const categoryCounts: Record<string, number> = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Tarefas', value: total, icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Concluídas', value: completed, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Pendentes', value: pending, icon: Clock, color: 'text-orange-400', bg: 'bg-orange-400/10' },
          { label: 'Taxa de Conclusão', value: `${completionRate}%`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 flex items-center gap-4"
          >
            <div className={`${stat.bg} p-3 rounded-xl border border-white/5`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <PieChart className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-xl text-white">Prioridades</h3>
          </div>
          <div className="space-y-6">
            {(['ALTA', 'MÉDIA', 'BAIXA'] as const).map(p => {
              const count = priorityCounts[p];
              const percent = total > 0 ? (count / total) * 100 : 0;
              const color = p === 'ALTA' ? 'bg-red-500' : p === 'MÉDIA' ? 'bg-orange-500' : 'bg-zinc-500';
              return (
                <div key={p} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text font-medium">{p}</span>
                    <span className="text-text-muted">{count} tarefas</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display font-bold text-xl text-white">Categorias</h3>
          </div>
          <div className="space-y-6">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const percent = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={cat} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text font-medium">{cat}</span>
                    <span className="text-text-muted">{count} tarefas</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(categoryCounts).length === 0 && (
              <p className="text-text-muted text-center py-8 italic">Nenhuma categoria definida</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
