import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  allTasksCount: number = 0;
  completedTasksCount: number = 0;
  ongoingTasksCount: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.taskCountUpdated.subscribe(
      ({ allCount, completedCount, ongoingCount }) => {
        this.allTasksCount = allCount;
        this.completedTasksCount = completedCount;
        this.ongoingTasksCount = ongoingCount;
      }
    );
  }

  changeSeleltedTasks(selector: string): void {
    this.taskService.filterKeyword = selector;
  }
}
