import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  private _inputText: string = '';

  @Output() inputTextMsg: EventEmitter<string> = new EventEmitter();
  @Output() filterKeyword: EventEmitter<string> = new EventEmitter();

  get inputText(): string {
    return this._inputText;
  }

  set inputText(value: string) {
    this._inputText = value;
    this.filterKeyword.emit(this._inputText);
  }

  addTaskToList(): void {
    this.inputTextMsg.emit(this._inputText);
    this._inputText = '';
    this.filterKeyword.emit(this._inputText);
  }
}
