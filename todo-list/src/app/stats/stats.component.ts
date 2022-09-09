import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  @Input() completedTasksCount: number = 0;
  @Input() ongoingTasksCount: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
