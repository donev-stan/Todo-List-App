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

  filteredTasks: Task[] = [];

  @Output() tasks: Task[] = [];

  @Output() completedTasksCount: number = 0;
  @Output() ongoingTasksCount: number = 0;

  @Input() private _filterKeyword: string = '';

  filteredTasksGroups: 'all' | 'completed' | 'ongoing' = 'all';

  set filterKeyword(value: string) {
    this._filterKeyword = value.toLowerCase();
    this.filterTasksByKeyword();
  }

  filterTasksByKeyword(): void {
    this.filteredTasks = this.tasks.filter((task: Task) =>
      task.text.toLowerCase().includes(this._filterKeyword)
    );
  }

  filterTasks(selector: any): void {
    this.filteredTasksGroups = selector;

    switch (selector) {
      case 'completed':
        this.filteredTasks = this.tasks.filter((task: Task) => task.checked);
        break;

      case 'ongoing':
        this.filteredTasks = this.tasks.filter((task: Task) => !task.checked);
        break;

      default:
        this.filteredTasks = this.tasks;
        break;
    }
  }

  ngOnInit(): void {
    this.updateAppState();
    this.filteredTasks = this.tasks;
  }

  createNewTask($taskText: string): void {
    $taskText = $taskText.trim();
    if (!$taskText) return;

    const newTask: Task = {
      id: this.taskService.generateTaskId(),
      text: $taskText,
      checked: false,
    };

    this.tasks.push(newTask);
    this.taskService.setTasks(this.tasks);
    this.ongoingTasksCount++;
  }

  updateAppState(updateFilteredTasks?: any): void {
    this.tasks = this.taskService.getTasks();

    this.completedTasksCount = this.updateCompletedTasksCount();
    this.ongoingTasksCount = this.updateOngoingTasksCount();

    if (updateFilteredTasks) {
      setTimeout(() => {
        this.filterTasks(this.filteredTasksGroups);
      }, 500);
    }
  }

  updateCompletedTasksCount(): number {
    return this.tasks.filter((task: Task) => task.checked === true).length;
  }

  updateOngoingTasksCount(): number {
    return this.tasks.length - this.completedTasksCount;
  }
}
