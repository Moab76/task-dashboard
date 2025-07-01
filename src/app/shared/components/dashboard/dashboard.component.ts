import { Component } from '@angular/core';
import { BtnDefaultComponent } from '../btn-default/btn-default.component';
import { TaskListComponent } from '../../../features/tasks/components/task-list/task-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [BtnDefaultComponent, TaskListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
