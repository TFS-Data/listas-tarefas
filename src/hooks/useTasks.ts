import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Task, Priority, Category } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedTasks: Task[] = data.map((t: any) => ({
          id: t.id,
          title: t.title,
          completed: t.completed,
          category: t.category,
          priority: t.priority,
          dueDate: t.due_date,
          createdAt: t.created_at,
        }));
        setTasks(mappedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title: string, category: Category, priority: Priority, dueDate: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title,
            category,
            priority,
            due_date: dueDate || null,
            completed: false,
          },
        ])
        .select();

      if (error) throw error;

      if (data) {
        const newTask: Task = {
          id: data[0].id,
          title: data[0].title,
          completed: data[0].completed,
          category: data[0].category,
          priority: data[0].priority,
          dueDate: data[0].due_date,
          createdAt: data[0].created_at,
        };
        setTasks((prev) => [newTask, ...prev]);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (id: string) => {
    const taskToToggle = tasks.find((t) => t.id === id);
    if (!taskToToggle) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !taskToToggle.completed })
        .eq('id', id);

      if (error) throw error;

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id);

      if (error) throw error;

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
}
