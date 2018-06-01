import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth.service';

@Injectable()
export class InputService {

  inputs = new BehaviorSubject<any>([]);
  public types = [
    'text',
    'select',
    'checkbox',
    'date',
    'time',
    'datetime-local',
    'number',
  ];
  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get(`${this.authService.apiRoot}getInputs`, this.authService.getHttpOptions).subscribe(data => {
      this.inputs.next(data);
    });
  }

  addInput(newInput: { name: String; type: number; value: any; required: boolean; order: number; options: any}) {
    const data = $.param(newInput);
    this.http.post(`${this.authService.apiRoot}addInput`, data, this.authService.postHttpOptions).subscribe(authResult => {
      newInput['id'] = authResult['id'];
      if (this.types[newInput.type] === 'select') {
        for (let i = 0; i < newInput['options'].length; i++) {
          newInput['options'][i]['id'] = authResult['optionsId'][i];
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
    });
  }
}
