import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  public types = [
    'text',
    'select',
    'checkbox',
    'date',
    'time',
    'datetime-local',
    'number',
  ];
  constructor() { }
}
