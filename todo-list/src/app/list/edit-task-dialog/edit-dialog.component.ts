import { Component, Inject } from '@angular/core';

import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Task } from 'src/app/shared/task';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: Task
  ) {}

  private _editTextInput: string = '';

  editedTask: any = {};

  get editTextInput(): string {
    return this._editTextInput;
  }

  set editTextInput(value: string) {
    this._editTextInput = value;
    this.editedTask.editedText = value;
  }

  ngOnInit(): void {
    this.editTextInput = this.data.text;
    this.editedTask.taskId = this.data.id;
  }
}
