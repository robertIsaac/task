import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  apiRoot: string;
  postHttpOptions;
  getHttpOptions;
  private permission: number;
  constructor(private http: HttpClient) {
    this.apiRoot = `${window.location.origin}/api/`;
    // this.apiRoot = `http://localhost:8000/api/`;
    if (this.isLoggedIn()) {
      this.setHeaders();
    }
  }
  login(email: string, password: string ) {
    return new Promise((resolve, reject) => {
      if (this.isLoggedIn()) {
        resolve();
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        })
      };
      // const data = $.param();
      const data = this.encode_body({email: email, password: password});
      this.http.post(`${this.apiRoot}auth/login`, data, httpOptions).subscribe(authResult => {
        if (this.setSession(authResult)) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  private setSession(authResult) {
    const token = authResult.token;
    const jwt = this.parseJwt(token);
    if (typeof authResult.token === 'undefined') {
      return false;
    } else {
      localStorage.setItem('token', token);
      localStorage.setItem('exp', jwt.exp);
      localStorage.setItem('permission', jwt.permission);
      localStorage.setItem('name', jwt.name);
      this.setHeaders();
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.removeItem('permission');
    localStorage.removeItem('name');
    this.postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    };
    this.getHttpOptions = {
      headers: new HttpHeaders({
      })
    };
  }

  public isLoggedIn() {
    const expiration = parseInt(localStorage.getItem('exp'), 10);
    const now = Math.round(new Date().valueOf() / 1000);
    return expiration > now;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  // test() {
  //   const token = localStorage.getItem('token');
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${token}`
  //     })
  //   };
  //   this.http.get(`${this.apiRoot}test`, httpOptions).subscribe(response => {
  //     alert(response);
  //   });
  // }

  setHeaders() {
    const token = localStorage.getItem('token');
    this.permission = parseInt(localStorage.getItem('permission'), 10);
    this.getHttpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    this.postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  havePermission(pagePermission) {
    return pagePermission <= this.permission;
  }

  encode_body(data) {
    return new URLSearchParams(data).toString();
  }
}
