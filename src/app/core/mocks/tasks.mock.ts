import { Task } from '../../features/tasks/services/task-data';

export const TASKS_MOCK: Task[] = [
  { id: 1, title: 'Tarefa A', description: 'Desc A', dueDate: new Date(), completed: false },
  { id: 2, title: 'Tarefa B', description: 'Desc B', dueDate: new Date(), completed: true },
];