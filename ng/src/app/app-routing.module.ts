import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DtComponent} from './dt/dt.component';
import {InsertTaskComponent} from './insert-task/insert-task.component';
import {InsertInputComponent} from './insert-input/insert-input.component';
import {LoginComponent} from './login/login.component';
import {UserManagerComponent} from './user-manager/user-manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: DtComponent
  },
  {
    path: 'insertTask',
    component: InsertTaskComponent
  },
  {
    path: 'insertOption',
    component: InsertInputComponent
  }, {
    path: 'userManager',
    component: UserManagerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
