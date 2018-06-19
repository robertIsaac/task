import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InputService} from "../input.service";
import {TaskService} from "../task.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  rowId: number;
  columns: any[];
  form;
  types;
  tasks;
  row = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private inputService: InputService,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.authService.havePermission(32)) {
      this.router.navigate(['']);
    }
    this.activatedRoute.params.subscribe(response => {
      this.rowId = parseInt(response.id, 10);

      this.taskService.tasks.subscribe(data => {
        this.tasks = data;
        const i = this.tasks.map(function(task) {
          return task.id;
        }).indexOf(this.rowId);
        if (typeof this.tasks[i] == 'undefined') {
          this.row = false;
        } else {
          this.row = this.tasks[i].tasks.sort(function (a, b) {
            return a.input.order - b.input.order;
          });
          // this.row = this.tasks[i].tasks;
        }
        // if (typeof this.row == "undefined") {
        //   this.row = [];
        // }
        // console.log(this.row);
      });

    });
    this.types = this.inputService.types;
    this.inputService.inputs.subscribe(data => {
      this.columns = data;
    });
  }


  editTask(form) {
    this.taskService.editTask(this.rowId, form.value);
    this.router.navigate(['tasks']);
  }

}
