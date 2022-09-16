import { EventEmitter, Injectable } from '@angular/core';
import { Task } from './task';

import { Dialog } from '@angular/cdk/dialog';
import { EditDialogComponent } from '../list/edit-task-dialog/edit-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(public dialog: Dialog) {}

  private tasks: Task[] = this.retrieveData();

  private allTasksCount: number = 0;
  private completedTasksCount: number = 0;
  private ongoingTasksCount: number = 0;

  tasksUpdated: EventEmitter<Task[]> = new EventEmitter();
  taskCountUpdated: EventEmitter<any> = new EventEmitter();

  defaultData = [
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
  ];

  getTasks(): Task[] {
    return this.tasks.slice();
  }

  addNewTask(taskText: string): void {
    const newTask: Task = {
      id: this.generateTaskId(),
      text: taskText,
      checked: false,
    };

    console.log(this.tasks);

    this.tasks.push(newTask);
    this.tasksUpdated.emit(this.tasks);
    this.updateTaskCounts();
    this.setToLocalStorage();
  }

  updateTaskCounts(): void {
    console.log('in service');
    console.log(this.tasks);

    this.allTasksCount = this.tasks.length;
    this.completedTasksCount = this.tasks.filter(
      (task: Task) => task.checked === true
    ).length;
    this.ongoingTasksCount = this.tasks.length - this.completedTasksCount;

    const updatedCounts = {
      allCount: this.allTasksCount,
      completedCount: this.completedTasksCount,
      ongoingCount: this.ongoingTasksCount,
    };

    console.log(updatedCounts);

    this.taskCountUpdated.emit(updatedCounts);
  }

  updateTaskStatus(taskId: string): void {
    this.tasks.forEach((task: Task) => {
      if (task.id === taskId) task.checked = !task.checked;
    });

    this.tasksUpdated.emit(this.tasks);
    this.updateTaskCounts();
    this.setToLocalStorage();
  }

  editTaskText(task: Task): void {
    const dialogRef = this.dialog.open<string>(EditDialogComponent, {
      data: task,
    });

    dialogRef.closed.subscribe((editedTask: any) => {
      if (!editedTask) return;

      const { taskId, editedText } = editedTask;
      if (!editedText.trim()) return;

      this.tasks.map((task: Task) => {
        if (task.id === taskId) task.text = editedText.trim();
        return task;
      });

      this.tasksUpdated.emit(this.tasks);
      this.setToLocalStorage();
    });
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== taskId);

    setTimeout(() => {
      this.tasksUpdated.emit(this.tasks);
    }, 300);

    this.updateTaskCounts();
    this.setToLocalStorage();
  }

  generateTaskId(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  setToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  retrieveData(): Task[] {
    return JSON.parse(localStorage.getItem('tasks')!) || this.defaultData;
  }
}
