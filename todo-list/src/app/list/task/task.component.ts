import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/task';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: any = {};

  updateTaskStatus(taskId: number): void {
    const tasks = this.taskService.getTasks();

    const updatedTasks = tasks.map((task: Task) => {
      if (task.id === taskId) {
        task.checked = !task.checked;
      }
      return task;
    });

    this.taskService.setTasks(updatedTasks);
  }

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}
}
