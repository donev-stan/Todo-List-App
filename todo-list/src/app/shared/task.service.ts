import { Injectable } from '@angular/core';
import { Task } from './task';

import { Dialog } from '@angular/cdk/dialog';
import { EditDialogComponent } from '../list/edit-task-dialog/edit-dialog.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(public dialog: Dialog) {}

  private tasks: Task[] = this.retrieveData();

  private allTasksCount: number = 0;
  private completedTasksCount: number = 0;
  private ongoingTasksCount: number = 0;

  private _filterKeyword: string = 'all';

  tasksUpdated: Subject<Task[]> = new Subject();
  taskCountUpdated: Subject<any> = new Subject();

  set filterKeyword(value: string) {
    console.log(value);

    this._filterKeyword = value;
    this.tasksUpdated.next(this.filterTasks(this._filterKeyword));
  }

  getTasks(): Task[] {
    return this.filterTasks(this._filterKeyword);
  }

  filterTasks(keyword: string): Task[] {
    switch (keyword) {
      case 'all':
        return this.tasks.slice();

      case 'completed':
        return this.tasks.filter((task: Task) => task.checked);

      case 'ongoing':
        return this.tasks.filter((task: Task) => !task.checked);

      default:
        return this.tasks.filter((task: Task) =>
          task.text.toLowerCase().includes(keyword.toLowerCase())
        );
    }
  }

  addNewTask(taskText: string): void {
    const newTask: Task = {
      id: this.generateTaskId(),
      text: taskText,
      checked: false,
    };

    this._filterKeyword = 'all';
    this.tasks.push(newTask);
    this.tasksUpdated.next(this.filterTasks(this._filterKeyword));
    this.updateTaskCounts();
    this.setToLocalStorage();
  }

  updateTaskCounts(): void {
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

    this.taskCountUpdated.next(updatedCounts);
  }

  updateTaskStatus(taskId: string): void {
    this.tasks.forEach((task: Task) => {
      if (task.id === taskId) task.checked = !task.checked;
    });

    setTimeout(() => {
      this.tasksUpdated.next(this.filterTasks(this._filterKeyword));
    }, 500);

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

      this.tasksUpdated.next(this.filterTasks(this._filterKeyword));
      this.setToLocalStorage();
    });
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== taskId);

    this.tasksUpdated.next(this.filterTasks(this._filterKeyword));
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
    return (
      JSON.parse(localStorage.getItem('tasks')!) || [
        {
          id: 'uniqueId1',
          text: 'The Basics',
          checked: true,
        },
        {
          id: 'uniqueId2',
          text: 'Components & Data Binding',
          checked: true,
        },
        {
          id: 'uniqueId3',
          text: 'Directives',
          checked: true,
        },
        {
          id: 'uniqueId4',
          text: 'Services & Dependency Injection',
          checked: true,
        },
        {
          id: 'uniqueId5',
          text: 'Routing',
          checked: false,
        },
        {
          id: 'uniqueId6',
          text: 'Observables',
          checked: false,
        },
        {
          id: 'uniqueId7',
          text: 'Forms',
          checked: false,
        },
        {
          id: 'uniqueId8',
          text: 'Pipes',
          checked: false,
        },
        {
          id: 'uniqueId9',
          text: 'Http Requests',
          checked: false,
        },
      ]
    );
  }
}
