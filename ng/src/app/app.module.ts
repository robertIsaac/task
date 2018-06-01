import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { DtComponent } from './dt/dt.component';
import { InsertTaskComponent } from './insert-task/insert-task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InsertInputComponent } from './insert-input/insert-input.component';
import { LoginComponent } from './login/login.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

import { TaskService } from './task.service';
import { InputService } from './input.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    DtComponent,
    InsertTaskComponent,
    NavbarComponent,
    InsertInputComponent,
    LoginComponent,
    UserManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
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
