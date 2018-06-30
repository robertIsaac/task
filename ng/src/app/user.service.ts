import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import 'rxjs/add/operator/scan';

@Injectable()
export class UserService {
  users = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient, private authService: AuthService) {
    this.http.get(`${this.authService.apiRoot}getUsers`, this.authService.getHttpOptions).subscribe(response => {
      this.users.next(response);
    });
  }

  addUser(newUser: any) {
    // const data = $.param(newUser);
    const data = this.authService.encode_body(newUser);
    this.http.post(`${this.authService.apiRoot}addUser`, data, this.authService.postHttpOptions).subscribe(response => {
      newUser['id'] = response['id'];
      const users = this.users.getValue();
      users[users.length] = newUser;
      this.users.next(users);
    });
  }

  editUser(user: any) {
    // const data = $.param(user);
    const userId = parseInt(user.id, 10);
    const data = this.authService.encode_body(user);
    this.http.post(`${this.authService.apiRoot}editUser`, data, this.authService.postHttpOptions).subscribe(response => {
      const users = this.users.getValue();
      const i = users.map(function(user) {
        return user.id;
      }).indexOf(userId);
      users[i]['permission'] = user.permission;
      this.users.next(users);
    });
  }
}
