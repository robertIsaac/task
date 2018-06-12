import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {InputService} from '../input.service';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-dt',
  templateUrl: './dt.component.html',
  styleUrls: ['./dt.component.scss']
})
export class DtComponent implements OnInit {
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
    // const a: DataTables.Settings = {
    //   'scrollX': true,
    //   'ordering': true,
    //   'orderMulti': false,
    //   'searching': true,
    //   'info': true,
    //   'paging': true,
    //   'lengthChange': true,
    //   'drawCallback': function() {
    //     $('.dataTables_scrollFoot').scroll(function() {
    //       $('.dataTables_scrollBody').scrollLeft($(this).scrollLeft());
    //       $('.dataTables_scrollHead').scrollLeft($(this).scrollLeft());
    //     });
    //   },
    //   'stripeClasses': ['strip1', 'strip2'],
    // };
    // const DT = $('#example').DataTable(a)
    //   .on( 'page.dt length.dt order.dt search.dt',   function () {
    //     DT.columns.adjust();
    //   });

    this.inputService.inputs.subscribe(inputs => {
      this.inputs = inputs;
    });
    this.taskService.tasks.subscribe(tasks => {
      this.tasks = tasks;
    });

  }

  editRow(rowId) {
    this.router.navigate(['editTask', rowId]);
  }

  deleteRow(rowId) {
    this.taskService.deleteTask(rowId);
  }

}
