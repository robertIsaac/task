import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth.service';

@Injectable()
export class TaskService {
  tasks = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get(`${this.authService.apiRoot}getTasks`, this.authService.getHttpOptions).subscribe(response => {
      this.tasks.next(response);
    });
  }

  insertTask(newTask: any) {
    const data = $.param(newTask);
    this.http.post(`${this.authService.apiRoot}addTask`, data, this.authService.postHttpOptions).subscribe(result => {
      const addTask = {};
      addTask['id'] = result['id'];
      addTask['user'] = {};
      addTask['user']['name'] = localStorage.getItem('name');
      addTask['tasks'] = [];
      let i = 0;
      console.log(newTask);
      for (const key of Object.keys(newTask)) {
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
      console.log(tasks);
    });
  }
}
