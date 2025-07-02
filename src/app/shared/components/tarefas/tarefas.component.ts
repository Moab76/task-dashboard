import { Component } from '@angular/core';
import { TaskListComponent } from '../../../features/tasks/components/task-list/task-list.component';

@Component({
  selector: 'app-tarefas',
  imports: [TaskListComponent],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.scss'
})
export class TarefasComponent {

}
