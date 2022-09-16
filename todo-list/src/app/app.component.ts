import { Component, OnInit, Output, Input } from '@angular/core';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // tasks: Task[] = [];
  filteredTasks: Task[] = [];

  @Input() private _filterKeyword: string = '';

  // filteredTasksGroups: 'all' | 'completed' | 'ongoing' = 'all';

  set filterKeyword(value: string) {
    this._filterKeyword = value.toLowerCase();
  }

  // filterTasksByKeyword(): void {
  //   this.filterTasks(this.filteredTasksGroups);
  //   this.filteredTasks = this.filteredTasks.filter((task: Task) =>
  //     task.text.toLowerCase().includes(this._filterKeyword)
  //   );
  // }

  // filterTasks(selector: any): void {
  //   this.filteredTasksGroups = selector;

  //   switch (selector) {
  //     case 'completed':
  //       this.filteredTasks = this.tasks.filter((task: Task) => task.checked);
  //       break;

  //     case 'ongoing':
  //       this.filteredTasks = this.tasks.filter((task: Task) => !task.checked);
  //       break;

  //     default:
  //       this.filteredTasks = this.tasks;
  //       break;
  //   }
  // }

  ngOnInit(): void {
    // this.filteredTasks = this.tasks;
  }

  // updateAppState(updateFilteredTasks?: any): void {
  //   if (updateFilteredTasks) {
  //     setTimeout(() => {
  //       this.filterTasks(this.filteredTasksGroups);
  //     }, 500);
  //   }
  // }
}
