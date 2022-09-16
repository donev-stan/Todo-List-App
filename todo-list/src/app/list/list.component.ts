import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
    this.tasks = this.taskService.getTasks();

    this.taskService.tasksUpdated.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });

    this.taskService.updateTaskCounts();
  }
}
