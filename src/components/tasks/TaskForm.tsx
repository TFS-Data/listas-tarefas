import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Priority, Category } from '../../types';

interface TaskFormProps {
  onAdd: (title: string, category: Category, priority: Priority, dueDate: string) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('TRABALHO');
  const [priority, setPriority] = useState<Priority>('MÉDIA');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(title.trim(), category, priority, dueDate);
    
    // Reset form
    setTitle('');
    setDueDate('');
    // Keep category and priority as last used for convenience
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 mb-8">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="O que precisa ser feito?"
          className="glass-input text-lg font-medium"
          required
        />
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="glass-input cursor-pointer"
            >
              <option value="TRABALHO" className="bg-surface text-white">Trabalho</option>
              <option value="PESSOAL" className="bg-surface text-white">Pessoal</option>
              <option value="ESTUDO" className="bg-surface text-white">Estudo</option>
            </select>
          </div>
          
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1">Prioridade</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="glass-input cursor-pointer"
            >
              <option value="ALTA" className="bg-surface text-white">Alta</option>
              <option value="MÉDIA" className="bg-surface text-white">Média</option>
              <option value="BAIXA" className="bg-surface text-white">Baixa</option>
            </select>
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1">Data de Vencimento</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="glass-input cursor-pointer"
              required
            />
          </div>
          
          <div className="flex items-end md:w-32">
            <button type="submit" className="glass-button w-full h-[50px]">
              <Plus className="w-5 h-5" />
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
