import { Component, OnInit, Output, Input } from '@angular/core';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  tasks: Task[] = [];

  @Input() inputText: string = '';

  @Output() completedTasksCount: number = 0;
  @Output() ongoingTasksCount: number = 0;

  updateCompletedTasksCount(tasks: Task[]): number {
    return tasks.filter((task: Task) => task.checked === true).length;
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.ongoingTasksCount = this.tasks.length;
    this.completedTasksCount = this.updateCompletedTasksCount(this.tasks);
  }

  ngOnChanges(): void {
    this.tasks = this.taskService.getTasks();
    this.completedTasksCount = this.updateCompletedTasksCount(this.tasks);
  }
}
