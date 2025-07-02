import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-screen-confirm',
  standalone: true,
  imports: [],
  templateUrl: './screen-confirm.component.html',
  styleUrl: './screen-confirm.component.scss'
})
export class ScreenConfirmComponent {
  @Output() acaoConcluida = new EventEmitter<boolean>();
  @Output() fechar = new EventEmitter<void>();

  confirmar() {
    this.acaoConcluida.emit(true);
    this.fechar.emit();
  }

  cancelar() {
    this.acaoConcluida.emit(false);
    this.fechar.emit();
  }
}
