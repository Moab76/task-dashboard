import { Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { TarefasComponent } from './shared/components/tarefas/tarefas.component';


export const routes: Routes = [
    {path: "", redirectTo: "dashboard", pathMatch: "full"},
    {path: "dashboard", component: DashboardComponent},
    {path: "tarefas", component: TarefasComponent}
];
    