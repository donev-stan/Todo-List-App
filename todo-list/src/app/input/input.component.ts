import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  inputText: string = '';

  @Output() inputTextMsg: EventEmitter<string> = new EventEmitter();

  addTaskToList(): void {
    this.inputTextMsg.emit(this.inputText);
    console.log(this.inputText);
  }

  constructor() {}
  ngOnInit(): void {}
}
