import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/scan';

@Injectable()
export class UserService {
  users = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get(`${this.authService.apiRoot}getUsers`, this.authService.getHttpOptions).subscribe(response => {
      this.users.next(response);
    });
  }

  addUser(newUser: any) {
    const data = $.param(newUser);
    this.http.post(`${this.authService.apiRoot}addUser`, data, this.authService.postHttpOptions).subscribe(authResult => {
      newUser['id'] = authResult['id'];
      const users = this.users.getValue();
      users[users.length] = newUser;
      this.users.next(users);
    });
  }

  editUser(user: any) {
    const data = $.param(user);
    const userId = parseInt(user.id, 10);
    this.http.post(`${this.authService.apiRoot}editUser`, data, this.authService.postHttpOptions).subscribe(authResult => {
      const users = this.users.getValue();
      const i = users.map(function(user) {
        return user.id;
      }).indexOf(userId);
      users[i]['permission'] = user.permission;
      this.users.next(users);
    });
  }
}