import { Component, Output, OnInit, EventEmitter } from '@angular/core';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  tasks: Task[] = [];

  @Output() updateStats: EventEmitter<any> = new EventEmitter();

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
}
