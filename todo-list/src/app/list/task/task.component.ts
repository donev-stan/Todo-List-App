import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../shared/task';

import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: any; // BUG: When I change the type to Task

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  onTaskStatusChange(): void {
    this.taskService.updateTaskStatus(this.task.id);
  }

  onEditTask(): void {
    this.taskService.editTaskText(this.task);
  }

  onDeleteTask(): void {
    this.taskService.deleteTask(this.task.id);

    this.snackBar.open(
      `${this.task.checked ? 'Completed' : 'Ongoing'} Task Deleted!`,
      'Dismiss',
      {
        duration: 3000,
      }
    );
  }
}
