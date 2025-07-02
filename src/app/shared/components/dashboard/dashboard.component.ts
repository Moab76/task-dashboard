import { Component, computed, inject, signal } from '@angular/core';
import { BtnDefaultComponent } from '../btn-default/btn-default.component';
import { TaskListComponent } from '../../../features/tasks/components/task-list/task-list.component';
import { TaskStoreService } from '../../../features/tasks/services/task-store';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BtnDefaultComponent, TaskListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private store = inject(TaskStoreService);

  pendingCount = this.store.pendingCount;
  
}
