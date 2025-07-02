// task-store.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { Task } from './task-data';

@Injectable({
  providedIn: 'root' // torna acessível globalmente
})
export class TaskStoreService {
  private readonly _tarefas = signal<Task[]>([]);
  private readonly _tarefas_excluidas = signal<Task[]>([]);

  // Getter para acesso externo
  readonly tarefas = this._tarefas;
  readonly tarefas_excluidas = this._tarefas_excluidas;

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

  addTask(novaTask: Task) {
    this._tarefas_excluidas.update(tasks => [...tasks, novaTask]);
  }

}
