import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  inputText: string = '';

  @Output() inputTextMsg: EventEmitter<string> = new EventEmitter();

  addTaskToList(): void {
    this.inputTextMsg.emit(this.inputText);
    this.inputText = '';
  }
}
