import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TaskFormComponent } from './task-form.component';
import { TaskData, Task} from '../../services/task-data';
import { group } from 'console';

describe('TaskFormComponent', () => {
  let comp: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let serviceSpy: jasmine.SpyObj<TaskData>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('TaskData', ['create']);
    serviceSpy.create.and.returnValue(of({} as Task));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TaskFormComponent],
      providers: [{ provide: TaskData, useValue: serviceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('inicializa o form vazio', () => {
    expect(comp.form.value).toEqual({ title: null, description: null, dueDate: null });
  });

  it('chama create no submit', () => {
    comp.form.setValue({ title: 'Teste', description: '', dueDate: null });
    comp.onSubmit();
    expect(serviceSpy.create).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Teste' }));
  });
});
