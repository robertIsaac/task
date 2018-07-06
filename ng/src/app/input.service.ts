import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth.service';
import {TaskService} from "./task.service";
import {ShareDataService} from "./share-data.service";

@Injectable()
export class InputService {

  inputs = new BehaviorSubject<any>([]);
  public types;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private shareDataService: ShareDataService,
    private taskService: TaskService,
  ) {
    if (this.authService.isLoggedIn()) {
      this.http.get(`${this.authService.apiRoot}getInputs`, this.authService.getHttpOptions).subscribe(data => {
        this.inputs.next(data);
      });
    }
    this.types = this.shareDataService.types;
  }

  addInput(newInput: { name: String; type: number; value: any; required: boolean; order: number; options: any}) {
    // const tempInput = newInput;
    // tempInput.options = this.authService.encode_body(newInput.options);
    // const data = this.authService.encode_body(tempInput);
    // console.log(data);
    this.http.post(`${this.authService.apiRoot}addInput`, newInput, this.authService.getHttpOptions).subscribe(response => {
      newInput['id'] = response['id'];
      if (this.types[newInput.type] === 'select') {
        for (let i = 0; i < newInput['options'].length; i++) {
          newInput['options'][i]['id'] = response['optionsId'][i];
        }
      }
      const inputs = this.inputs.getValue();
      inputs[inputs.length] = newInput;
      inputs.sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        } else if (a.order > b.order) {
          return 1;
        } else {
          return 0;
        }
      });
      this.inputs.next(inputs);
      this.taskService.adjustNewInput(newInput);
    });
  }
}
