import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { TaskData } from '../../services/task-data';
import { TASKS_MOCK } from '../../../../core/mocks/tasks.mock';

describe('TaskListComponent', () => {
  let comp: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockService: jasmine.SpyObj<TaskData>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('TaskData', ['getAll']);
    mockService.getAll.and.returnValue(of(TASKS_MOCK));

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{ provide: TaskData, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renderiza tarefas mockadas', () => {
    const items = fixture.debugElement.queryAll(By.css('.task-item'));
    expect(items.length).toBe(TASKS_MOCK.length);
  });
});
