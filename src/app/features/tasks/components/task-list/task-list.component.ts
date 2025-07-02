import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Task, TaskData } from '../../services/task-data';
import { CommonModule, DatePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TaskStoreService } from '../../services/task-store';
import { ScreenEditComponent } from "../screen-edit/screen-edit.component";
import { ScreenConfirmComponent } from "../screen-confirm/screen-confirm.component";
import { BaseOptions } from 'node:vm';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ScreenEditComponent, ScreenConfirmComponent], // DatePipe adicionado aqui
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [DatePipe]
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskData);
  private datePipe = inject(DatePipe);
  private store = inject(TaskStoreService);

  mostrarOverley = false;
  tarefas = this.store.tarefas;
  tarefaEditando: Task | null = null;

  abrirFormulario(tarefa: Task) {
    this.mostrarOverley = true;
    console.log('Abrindo modal para tarefa:', tarefa);
    this.tarefaEditando = tarefa;
    document.body.style.overflow = 'hidden';
  }

  fecharFormulario(event?: Event) {
    if (!event || (event.target as Element).classList.contains('modal-overlay')) {

    console.log('Tentando fechar modal', event);
      this.tarefaEditando = null;
      this.mostrarOverley = false;
      this.exibirConfirmacao = false
      document.body.style.overflow = '';
    }
  }

  // Sinal para o valor do select
  selectedFilter = signal<'todas' | 'urgente' | 'normal'>('todas');

  loading = signal(true);
  error = signal<string | null>(null);

  // Contadores computados
  urgentCount = computed(() =>
    this.tarefas().filter(task => this.getPriority(task) === 'urgente').length
  );

  normalCount = computed(() =>
    this.tarefas().filter(task => this.getPriority(task) === 'normal').length
  );

  // Tarefas filtradas e ordenadas
  filteredTasks = computed(() => {
    const filterValue = this.selectedFilter();
    const allTasks = this.tarefas();

    let filtered = filterValue === 'todas'
      ? allTasks
      : allTasks.filter(task => this.getPriority(task) === filterValue);

    // Ordenação segura com tratamento de datas
    return filtered.sort((a, b) => {
      const aPriority = this.getPriority(a);
      const bPriority = this.getPriority(b);

      // Prioridade: urgentes primeiro
      if (aPriority === 'urgente' && bPriority !== 'urgente') return -1;
      if (bPriority === 'urgente' && aPriority !== 'urgente') return 1;

      // Converter para Date se necessário
      const aDate = this.convertToDate(a.dueDate);
      const bDate = this.convertToDate(b.dueDate);

      // Comparação segura
      return (aDate?.getTime() || Infinity) - (bDate?.getTime() || Infinity);
    });
  });

  constructor() { }

  async ngOnInit() {
    await this.fetchTasks();
  }

  private async fetchTasks() {
    this.loading.set(true);
    this.error.set(null);

    try {
      const dados = await lastValueFrom(this.taskService.getAll());
      this.tarefas.set(dados);
    } catch (err) {
      console.error('Erro ao buscar tarefas:', err);
      this.error.set('Falha ao carregar tarefas. Tente novamente mais tarde.');
    } finally {
      this.loading.set(false);
    }
  }

  getPriority(task: Task): 'normal' | 'urgente' {
    if (!task.dueDate) return 'normal';

    const dueDate = this.convertToDate(task.dueDate);
    if (!dueDate) return 'normal';

    const now = new Date();
    const diffMs = dueDate.getTime() - now.getTime();

    // Considera urgente se faltar menos de 2 horas
    return diffMs < 2 * 60 * 60 * 1000 ? 'urgente' : 'normal';
  }

  getPriorityLabel(priority: 'normal' | 'urgente'): string {
    return priority === 'urgente' ? 'Urgente' : 'Normal';
  }

  async toggleCompletion(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };

    try {
      // Atualização otimista
      this.tarefas.update(tasks =>
        tasks.map(t => t.id === task.id ? updatedTask : t)
      );

      // Persistir no servidor
      await lastValueFrom(this.taskService.update(updatedTask));
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);

      // Reverter em caso de erro
      this.tarefas.update(tasks =>
        tasks.map(t => t.id === task.id ? task : t)
      );

      this.error.set('Falha ao atualizar tarefa. Tente novamente.');
    }
  }

  // Atualiza o filtro quando o select muda
  updateFilter(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedFilter.set(select.value as 'todas' | 'urgente' | 'normal');
  }

  public getSafeDate(dateValue: any): Date | null {
    return this.convertToDate(dateValue);
  }

  public formatDate(dateValue: any): string | null {
    const date = this.convertToDate(dateValue);
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') : null;
  }

  private convertToDate(dateValue: any): Date | null {
    if (!dateValue) return null;
    if (dateValue instanceof Date) return dateValue;
    try {
      return new Date(dateValue);
    } catch (e) {
      console.warn('Data inválida:', dateValue);
      return null;
    }
  }

  async salvarEdicao(taskEditada: Task) {
    try {
      this.tarefas.update(tarefas =>
        tarefas.map(t => t.id === taskEditada.id ? taskEditada : t)
      );

      await lastValueFrom(this.taskService.update(taskEditada));

      this.tarefaEditando = null;
      document.body.style.overflow = '';
    } catch (err) {
      console.error('Erro ao salvar tarefa editada:', err);
      this.error.set('Erro ao salvar tarefa. Tente novamente.');
    }
  }


  exibirConfirmacao = false;
  private resolverPromise: ((valor: boolean) => void) | null = null;

  onEventoRecebido(dados: boolean) {
    if (this.resolverPromise) {
      this.resolverPromise(dados);
      this.resolverPromise = null;
    }
  }

  async excluirTarefa(task: Task) {
    if (task.id) {
      try {
        this.exibirConfirmacao = true;
        this.mostrarOverley = true;

        const dadosRecebidos = await new Promise<boolean>((resolve) => {
          this.resolverPromise = resolve;
        });

        if (dadosRecebidos) {
          const id = task.id.toString();

          // Atualização otimista: remove a tarefa da lista antes da requisição
          this.tarefas.update(tasks => tasks.filter(t => t.id !== task.id));
          this.store.addTask(task);

          // Faz a requisição de exclusão
          await lastValueFrom(this.taskService.delete(id));

          console.log("Tarefa excluída com sucesso");
        }
      } catch (err) {
        console.error('Erro ao excluir tarefa:', err);

        // Reverte a atualização otimista em caso de erro
        this.tarefas.update(tasks => [...tasks, task]);

        this.error.set('Falha ao excluir tarefa. Tente novamente.');
      }
    } else {
      console.error('Tentativa de excluir tarefa sem ID');
    }
  }
} 