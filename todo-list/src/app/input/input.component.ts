import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  constructor(private taskService: TaskService) {}

  private _inputText: string = '';

  @Output() filterKeyword: EventEmitter<string> = new EventEmitter();

  get inputText(): string {
    return this._inputText;
  }

  set inputText(value: string) {
    this._inputText = value;
    this.filterKeyword.emit(this._inputText);
  }

  addTaskToList(): void {
    this._inputText.trim();
    if (!this._inputText) return;

    this.taskService.addNewTask(this._inputText);
    this._inputText = '';

    this.filterKeyword.emit(this._inputText);
  }
}
