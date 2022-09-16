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

  private _filterKeyword: string = 'all';

  tasksUpdated: EventEmitter<Task[]> = new EventEmitter();
  taskCountUpdated: EventEmitter<any> = new EventEmitter();

  set filterKeyword(value: string) {
    console.log(value);

    this._filterKeyword = value;
    this.tasksUpdated.emit(this.filterTasks(this._filterKeyword));
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

    this.tasks.push(newTask);
    this.tasksUpdated.emit(this.filterTasks(this._filterKeyword));
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

    this.taskCountUpdated.emit(updatedCounts);
  }

  updateTaskStatus(taskId: string): void {
    this.tasks.forEach((task: Task) => {
      if (task.id === taskId) task.checked = !task.checked;
    });

    setTimeout(() => {
      this.tasksUpdated.emit(this.filterTasks(this._filterKeyword));
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

      this.tasksUpdated.emit(this.filterTasks(this._filterKeyword));
      this.setToLocalStorage();
    });
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== taskId);

    this.tasksUpdated.emit(this.filterTasks(this._filterKeyword));
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
          id: 'asda',
          text: 'Task List To Do 1',
          checked: false,
        },
        {
          id: 'oaishda',
          text: 'Task List To Do 2',
          checked: false,
        },
        {
          id: 'asddfbdfa',
          text: 'Task List To Do 3',
          checked: false,
        },
        {
          id: 'asdaqwed',
          text: 'Task List To Do 4',
          checked: true,
        },
        {
          id: 'asd1231da',
          text: 'Task List To Do 5',
          checked: true,
        },
        {
          id: 'asd4e3wfw32a',
          text: 'Task List To Do 6',
          checked: true,
        },
      ]
    );
  }
}
