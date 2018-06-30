import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  editUserPermission = '';
  users: any;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.users.subscribe(response => {
      this.users = response;
    });
  }

  changePermission(userId) {
    if (userId == '') {
      this.editUserPermission = '';
      return;
    }
    const selectedUser = this.users.find(user => {
      return user.id == userId;
    });
    this.editUserPermission = selectedUser.permission;
  }

  addUser(form) {
    this.userService.addUser(form.value);
    form.reset();
  }

  editUser(form) {
    this.userService.editUser(form.value);
    form.reset();
  }

}
