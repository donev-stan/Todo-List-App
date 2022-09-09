import { Component, Input, OnInit } from '@angular/core';

import { Task } from '../shared/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.tasks);
  }
}
