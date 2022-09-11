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
  /*
  // Could be done without the getter and setter & the private attribute on the property _inputText
  private _inputText: string = '';

  get inputText(): string {
    return this._inputText;
  }

  set inputText(value: string) {
    this._inputText = value;
  }
 */

  inputText: string = '';

  @Output() completedTasksCount: number = 0;
  @Output() ongoingTasksCount: number = 0;

  ngOnInit(): void {
    this.updateStats();
  }

  createNewTask(): void {
    this.inputText = this.inputText.trim();
    if (!this.inputText) return;

    const newTask: Task = {
      id: this.taskService.generateTaskId(),
      text: this.inputText,
      checked: false,
    };

    this.tasks.push(newTask);
    this.taskService.setTasks(this.tasks);
    this.ongoingTasksCount++;

    this.inputText = '';
  }

  onTaskStatusChange(): void {
    this.updateStats();
  }

  updateStats(): void {
    this.tasks = this.taskService.getTasks();
    this.completedTasksCount = this.updateCompletedTasksCount(this.tasks);
    this.ongoingTasksCount = this.tasks.length - this.completedTasksCount;
  }

  updateCompletedTasksCount(tasks: Task[]): number {
    return tasks.filter((task: Task) => task.checked === true).length;
  }
}
