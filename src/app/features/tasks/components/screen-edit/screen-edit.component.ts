import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task, TaskData } from '../../services/task-data';

@Component({
  selector: 'app-screen-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './screen-edit.component.html',
  styleUrl: './screen-edit.component.scss'
})
export class ScreenEditComponent implements OnInit {

  @Input() task!: Task;
  @Output() fechar = new EventEmitter<void>();
  @Output() taskEditada = new EventEmitter<Task>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder, private taskData: TaskData) { }

  ngOnInit(): void {
    const formattedDueDate = this.formatDateForInput(this.task.dueDate);

    this.form = this.fb.group({
      id: [this.task.id],
      title: [this.task.title, [Validators.required, Validators.minLength(3)]],
      description: [this.task.description],
      dueDate: [formattedDueDate],
      completed: [this.task.completed],
    });
  }

  // Formata o dueDate para o input datetime-local
  private formatDateForInput(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  submit(): void {
    if (this.form.valid) {
      const formData = { ...this.form.value };

      if (formData.dueDate) {
        formData.dueDate = new Date(formData.dueDate).toISOString();
      }

      //  Emite imediatamente para o pai fechar o modal
      this.taskEditada.emit(formData);
      this.fechar.emit();
    
    }
  }
}
