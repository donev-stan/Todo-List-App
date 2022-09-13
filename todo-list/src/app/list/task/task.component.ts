import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../shared/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: any;

  @Output() statusChanged: EventEmitter<string> = new EventEmitter();
  @Output() deleteReq: EventEmitter<string> = new EventEmitter();
  @Output() editReq: EventEmitter<Task> = new EventEmitter();

  onTaskStatusChange(): void {
    this.statusChanged.emit(this.task.id);
  }

  onDeleteTask(): void {
    this.deleteReq.emit(this.task.id);
  }

  onEditTask(): void {
    this.editReq.emit(this.task);
  }
}
