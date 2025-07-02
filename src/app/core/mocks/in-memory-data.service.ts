import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TASKS_MOCK } from './tasks.mock';
import { Task } from '../../features/tasks/services/task-data';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { tasks: TASKS_MOCK };
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(t => t.id || 0)) + 1 : 1;
  }
}