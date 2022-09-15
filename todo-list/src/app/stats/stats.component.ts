import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @Input() completedTasksCount: number = 0;
  @Input() ongoingTasksCount: number = 0;

  @Output() filterTasks: EventEmitter<string> = new EventEmitter();

  chnageSeleltedTasks(selector: string): void {
    this.filterTasks.emit(selector);
  }
}
