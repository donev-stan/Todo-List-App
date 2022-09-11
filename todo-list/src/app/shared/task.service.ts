import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks: Task[] = this.retrieveData();

  getTasks(): Task[] {
    return this._tasks;
  }

  setTasks(tasks: Task[]): void {
    this._tasks = tasks;
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
  }

  generateTaskId(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  retrieveData(): Task[] {
    return (
      JSON?.parse(localStorage?.getItem('tasks')!) || [
        {
          id: '1',
          text: 'Learn Angular Framework',
          checked: false,
        },
        {
          id: '2',
          text: 'Learn Angular Styling Library',
          checked: false,
        },
        {
          id: '3',
          text: 'Watch Angular Tutorials',
          checked: true,
        },
      ]
    );
  }
}
