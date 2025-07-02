import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskData } from '../../services/task-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskStoreService } from '../../services/task-store';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  private store = inject(TaskStoreService);
  @Input() edicao = false;
  @Output() fechar = new EventEmitter<void>();

  public form: FormGroup;

  constructor(private fb: FormBuilder, private taskData: TaskData) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      dueDate: [null],
      completed: [false]
    });
  }

  // Getter para facilitar o acesso ao controle 'title'
  get title() {
    return this.form.get('title');
  }

  private fecharFormulario() {
    this.fechar.emit();
  }


  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      // Formatar a data para o padrão ISO (YYYY-MM-DD)
      if (formData.dueDate) {
        formData.dueDate = new Date(formData.dueDate).toISOString();
      }

      console.log('Dados do formulário:', formData);

      this.taskData.create(formData).subscribe({
        next: (novaTask) => {
          this.fecharFormulario();
          this.store.tarefas.update(list => [...list, novaTask]);
          this.fechar.emit();
          this.form.reset();
          alert('Tarefa salva com sucesso!');
          this.form.reset();
        },
        error: (err) => {
          console.error('Erro ao salvar tarefa:', err);
          alert('Ocorreu um erro ao salvar a tarefa');
        }
      });
    } else {
      // Marca todos os campos como 'touched' para mostrar erros
      this.form.markAllAsTouched();
    }
  }
}