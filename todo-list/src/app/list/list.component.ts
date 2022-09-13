import { Component, Output, OnInit, EventEmitter } from '@angular/core';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';
import { EditDialogComponent } from './edit-task-dialog/edit-dialog.component';

import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private taskService: TaskService, public dialog: Dialog) {}

  tasks: Task[] = [];

  @Output() updateStats: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  onTaskStatusChange(taskId: string): void {
    const updatedTasks = this.tasks.map((task: Task) => {
      if (task.id === taskId) task.checked = !task.checked;
      return task;
    });

    this.taskService.setTasks(updatedTasks);

    this.updateStats.emit();
  }

  deleteTask(taskId: string): void {
    const updatedTasks = this.tasks.filter((task: Task) => task.id !== taskId);
    this.taskService.setTasks(updatedTasks);
    this.tasks = updatedTasks;

    this.updateStats.emit();
  }

  openDialog(task: Task): void {
    const dialogRef = this.dialog.open<string>(EditDialogComponent, {
      data: task,
    });

    dialogRef.closed.subscribe((editedTask: any) => {
      if (!editedTask) return;

      const { taskId, editedText } = editedTask;
      if (!editedText.trim()) return;

      const updatedTasks = this.tasks.map((task: Task) => {
        if (task.id === taskId) task.text = editedText;
        return task;
      });

      this.taskService.setTasks(updatedTasks);
    });
  }
}
