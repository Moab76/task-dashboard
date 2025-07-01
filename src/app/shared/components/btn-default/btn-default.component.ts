import { Component } from '@angular/core';
import { TaskFormComponent } from '../../../features/tasks/components/task-form/task-form.component';

@Component({
  selector: 'app-btn-default',
  standalone: true,
  imports: [
    TaskFormComponent
  ],
  templateUrl: './btn-default.component.html',
  styleUrl: './btn-default.component.scss'
})
export class BtnDefaultComponent {
  mostrarFormulario = false;

  abrirFormulario() {
    this.mostrarFormulario = true;
    document.body.style.overflow = 'hidden'; // Impede scroll na página principal
  }

  fecharFormulario(event?: Event) {
    // Fecha apenas se clicar no overlay, não no conteúdo
    if (!event || (event.target as Element).classList.contains('modal-overlay')) {
      this.mostrarFormulario = false;
      document.body.style.overflow = ''; // Restaura o scroll
    }
  }

}
