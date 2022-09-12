import { Component, Inject } from '@angular/core';

import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: any
  ) {}

  private _editText: string = '';

  finalData: any = {};

  get editText(): string {
    return this._editText;
  }

  set editText(value: string) {
    this._editText = value;
    this.finalData.editedText = value;
  }

  ngOnInit(): void {
    this.editText = this.data.text;
    this.finalData.taskId = this.data.id;
  }
}
