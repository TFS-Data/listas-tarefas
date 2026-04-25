export type Priority = 'ALTA' | 'MÉDIA' | 'BAIXA';
export type Category = 'TRABALHO' | 'PESSOAL' | 'ESTUDO' | string;

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  dueDate: string; // ISO string format
  createdAt: string;
}

export const CATEGORY_COLORS: Record<string, string> = {
  'TRABALHO': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'PESSOAL': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'ESTUDO': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  'ALTA': 'bg-red-500/20 text-red-400 border-red-500/30',
  'MÉDIA': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'BAIXA': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};
