import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../shared/task';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: any;

  @Output() statusChanged: EventEmitter<string> = new EventEmitter();
  @Output() deleteReq: EventEmitter<string> = new EventEmitter();
  @Output() editReq: EventEmitter<Task> = new EventEmitter();

  constructor(private snackBar: MatSnackBar) {}

  onTaskStatusChange(): void {
    this.statusChanged.emit(this.task.id);
  }

  onDeleteTask(): void {
    this.deleteReq.emit(this.task.id);
  }

  onEditTask(): void {
    this.editReq.emit(this.task);
  }

  ngOnDestroy(): void {
    this.snackBar.open(
      `${this.task.checked ? 'Completed' : 'Ongoing'} Task Deleted!`,
      'Dismiss',
      {
        duration: 3000,
      }
    );
  }
}