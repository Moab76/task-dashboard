// src/app/features/tasks/services/task-data.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TaskData } from './task-data';
import { TASKS_MOCK } from '../../../core/mocks/tasks.mock';
import { Task } from './task-data';

describe('TaskData (Service)', () => {
  let service: TaskData;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskData]
    });
    service = TestBed.inject(TaskData);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve recuperar todas as tasks', () => {
    service.getAll().subscribe(tasks => {
      expect(tasks.length).toBe(TASKS_MOCK.length);
      expect(tasks).toEqual(TASKS_MOCK);
    });

    const req = httpMock.expectOne('api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(TASKS_MOCK);
  });
  it('create() faz POST e retorna o novo Task', () => {
    const novo: Task = { id: 42, title: 'X', completed: false /*…*/ };
    service.create({ title: 'X', completed: false })
      .subscribe(task => expect(task).toEqual(novo));
    const req = httpMock.expectOne('api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(novo);
  });
});
