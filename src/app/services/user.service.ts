import { AuthService } from './auth.service';
import { User } from './../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

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

  editUser(username: string, user: User): Observable<unknown> {
    const options = {
      params: new HttpParams().set('username', username)
    };
    return this.http.put('http://192.168.1.194:8080/users/update', user, options);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('http://192.168.1.194:8080/users');
  }

  deleteUsers(usernames: string[]): Observable<unknown> {
    const usernamesStr = usernames.join(',');
    const options = {
      params: new HttpParams().set('usernames', usernamesStr)
    };
    return this.http.delete('http://192.168.1.194:8080/users/remove', options);
  }

  getCurrentUser(): Observable<User> {
    const username = this.authService.getUsername();
    if (username) {
      const options = {
        params: new HttpParams().set('username', username)
      };
      return this.http.get<User>('http://192.168.1.194:8080/users', options);
    }
    return new Observable<User>(subscriber => {
      subscriber.error('No user currently logged in');
    });
  }

}

