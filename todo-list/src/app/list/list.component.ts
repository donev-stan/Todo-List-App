import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';
import { EditDialogComponent } from './edit-task-dialog/edit-dialog.component';

import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(private taskService: TaskService, public dialog: Dialog) {}

  @Input() tasks: Task[] = [];

  @Output() updateApp: EventEmitter<void> = new EventEmitter();

  changeTaskStatus(taskId: string): void {
    const updatedTasks = this.tasks.map((task: Task) => {
      if (task.id === taskId) task.checked = !task.checked;
      return task;
    });

    this.taskService.setTasks(updatedTasks);

    this.updateApp.emit();
  }

  deleteTask(taskId: string): void {
    const updatedTasks = this.tasks.filter((task: Task) => task.id !== taskId);
    this.taskService.setTasks(updatedTasks);

    this.updateApp.emit();
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open<string>(EditDialogComponent, {
      data: task,
    });

    dialogRef.closed.subscribe((editedTask: any) => {
      if (!editedTask) return;

      const { taskId, editedText } = editedTask;
      if (!editedText.trim()) return;

      const updatedTasks = this.tasks.map((task: Task) => {
        if (task.id === taskId) task.text = editedText.trim();
        return task;
      });

      this.taskService.setTasks(updatedTasks);
    });
  }
}
