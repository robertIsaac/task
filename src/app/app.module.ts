import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TaskService } from './task.service';
import { InputService } from './input.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { EditTaskComponent } from './edit-task/edit-task.component';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { InsertTaskComponent } from './insert-task/insert-task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InsertInputComponent } from './insert-input/insert-input.component';
import { LoginComponent } from './login/login.component';
import { UserManagerComponent } from './user-manager/user-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    InsertTaskComponent,
    NavbarComponent,
    InsertInputComponent,
    LoginComponent,
    UserManagerComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    InputService,
    AuthService,
    TaskService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
