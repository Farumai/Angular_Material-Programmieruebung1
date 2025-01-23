import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() showForm: boolean | undefined;
  @Output() buttonClickedEvent = new EventEmitter();

  buttonClicked() {
    this.buttonClickedEvent.emit();
  }
}
