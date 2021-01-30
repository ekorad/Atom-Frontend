import { User } from './../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  checkUsernameExists(username: string): Observable<boolean> {
    const getParams = new HttpParams().set('username', username);
    return this.http.get<boolean>('http://192.168.1.194:8080/users/check', { params: getParams });
  }

  checkEmailExists(email: string): Observable<boolean> {
    const getParams = new HttpParams().set('email', email);
    return this.http.get<boolean>('http://192.168.1.194:8080/users/check', { params: getParams });
  }

  registerNewUser(user: User): Observable<unknown> {
    return this.http.post('http://192.168.1.194:8080/users/add', user);
  }

}

