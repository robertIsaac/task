import { Component, OnInit } from '@angular/core';
import {InputService} from '../input.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {TaskService} from '../task.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-insert-task',
  templateUrl: './insert-task.component.html',
  styleUrls: ['./insert-task.component.scss']
})
export class InsertTaskComponent implements OnInit {
  columns: any[];
  form;
  types;
  constructor(
    private inputService: InputService,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedOut()) {
      this.router.navigate(['login']);
    }
    if (!this.authService.havePermission(32)) {
      this.router.navigate(['']);
    }
    this.types = this.inputService.types;
    this.inputService.inputs.subscribe(data => {
      this.columns = data;
    });
  }

  insertTask(form) {
    this.taskService.insertTask(form.value);
    form.reset();
  }

}
