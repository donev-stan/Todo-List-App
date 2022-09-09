import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  completedTasksCount: number = 0;
  ongoingTasksCount: number = 0;
}
