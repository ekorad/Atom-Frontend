import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // * mock function
  // TODO: implement server-side checking
  checkUsernameExists(username: string): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      setTimeout(() => {
        if (username === 'ekorad') {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }
        subscriber.complete();
      }, 2000);
    });
  }

  // * mock function
  // TODO: implement server-side checking
  checkEmailExists(email: string): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      setTimeout(() => {
        if (email === 'ekorad@yahoo.com') {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }
        subscriber.complete();
      }, 2000);
    });
  }
}
