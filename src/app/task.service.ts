import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth.service';
import {InputService} from './input.service';

@Injectable()
export class TaskService {
  tasks = new BehaviorSubject<any>([]);
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private inputService: InputService
  ) {
    this.http.get(`${this.authService.apiRoot}getTasks`, this.authService.getHttpOptions).subscribe(response => {
      // console.log(typeof response);
      const keys = Object.keys(response);
      for (const key of keys) {
        response[key].tasks.sort(function (a, b) {
          return a.input.order - b.input.order;
        });
      }
      this.tasks.next(response);
    });
  }

  insertTask(newTask: any) {
    // const data = $.param(newTask);
    const data = this.authService.encode_body(newTask);
    this.http.post(`${this.authService.apiRoot}addTask`, data, this.authService.postHttpOptions).subscribe(response => {
      const addTask = {};
      addTask['id'] = response['id'];
      const now = new Date();
      addTask['created_at'] = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      addTask['user'] = {};
      addTask['user']['name'] = localStorage.getItem('name');
      addTask['tasks'] = [];
      let i = 0;
      console.log(newTask);
      const keys = Object.keys(newTask);
      for (const key of keys) {
        addTask['tasks'][i] = {};
        addTask['tasks'][i]['value'] = newTask[key];
        addTask['tasks'][i]['input'] = {};
        addTask['tasks'][i]['input']['type'] = 0;
        i++;
      }
      // for (const task of newTask) {
      //   console.log(task);
      //   addTask['tasks'][i++]['value'] = task;
      // }
      const tasks = this.tasks.getValue();
      tasks[tasks.length] = addTask;
      this.tasks.next(tasks);
    });
  }

  editTask(rowId: number, task: any) {
    task.id = rowId;
    // const data = $.param(task);
    const data = this.authService.encode_body(task);
    this.http.post(`${this.authService.apiRoot}editTask`, data, this.authService.postHttpOptions).subscribe(response => {
      const tasks = this.tasks.getValue();
      const index = tasks.map(function(task) {
        return task.id;
      }).indexOf(rowId);
      const keys = Object.keys(tasks[index].tasks);
      for (const key of keys) {
        if (this.inputService.types[tasks[index].tasks[key].input.type] == 'select') {
          tasks[index].tasks[key]['option_id'] = task[tasks[index].tasks[key]['input_id']];
          tasks[index].tasks[key]['option']['id'] = task[tasks[index].tasks[key]['input_id']];
        } else {
          tasks[index].tasks[key]['value'] = task[tasks[index].tasks[key]['input_id']];
        }
      }
      this.tasks.next(tasks);
    });
  }

  deleteTask(rowId: any) {
    // const data = $.param({rowId: rowId});
    const data = this.authService.encode_body({rowId: rowId});
    this.http.post(`${this.authService.apiRoot}deleteTask`, data, this.authService.postHttpOptions).subscribe(response => {
      const tasks = this.tasks.getValue();
      const index = tasks.map(function(task) {
        return task.id;
      }).indexOf(rowId);
      tasks.pop(index);
      this.tasks.next(tasks);
    });
  }
}
