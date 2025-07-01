import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TASKS_MOCK } from './tasks.mock';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { tasks: TASKS_MOCK };
  }
}