import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { InputService } from '../input.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  inputs: any[];
  tasks: any[];
  rows: any[];
  constructor(
    private authService: AuthService,
    private inputService: InputService,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedOut()) {
      this.router.navigate(['login']);
    }

    this.inputService.inputs.subscribe(inputs => {
      this.inputs = inputs;
    });
    this.taskService.tasks.subscribe(tasks => {
      this.tasks = tasks;
      console.log(tasks);
    });

  }

  editRow(rowId) {
    this.router.navigate(['editTask', rowId]);
  }

  deleteRow(rowId) {
    this.taskService.deleteTask(rowId);
  }

}
