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
      JSON.parse(localStorage.getItem('tasks')!) || [
        {
          id: 'P07E',
          text: 'Using Injectable',
          checked: true,
        },
        {
          id: 'KLFG',
          text: 'Material Theme and Components',
          checked: true,
        },
        {
          id: '6H*K',
          text: 'Using Interface to assure correct Task Model',
          checked: true,
        },
        {
          id: '9F2C',
          text: 'Passing data between Components',
          checked: true,
        },
        {
          id: '38FC',
          text: 'Working with local storage',
          checked: true,
        },
        {
          id: 'H81K',
          text: 'Get data from a json file',
          checked: false,
        },
        {
          id: '08IN',
          text: 'Implement Observables',
          checked: false,
        },
      ]
    );
  }
}
