import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks: Task[] = [
    {
      id: 1,
      text: 'Learn Angular Framework',
      checked: false,
    },
    {
      id: 2,
      text: 'Learn Angular Styling Library',
      checked: false,
    },
    {
      id: 3,
      text: 'Watch Angular Tutorials',
      checked: true,
    },
  ];

  getTasks(): Task[] {
    return this._tasks;
  }

  setTasks(tasks: Task[]): void {
    this._tasks = tasks;
  }
}
