// task-store.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { Task } from './task-data';

@Injectable({
  providedIn: 'root' // torna acessível globalmente
})
export class TaskStoreService {
  private readonly _tarefas = signal<Task[]>([]);

  // Getter para acesso externo
  readonly tarefas = this._tarefas;

  // Computed para tarefas pendentes
  readonly pendingCount = computed(() =>
    this._tarefas().filter(t => !t.completed).length
  );

  // Ações
  setTarefas(tarefas: Task[]) {
    this._tarefas.set(tarefas);
  }

  updateTask(updated: Task) {
    this._tarefas.update(tasks =>
      tasks.map(task => task.id === updated.id ? updated : task)
    );
  }
}
