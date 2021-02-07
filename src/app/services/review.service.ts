import { Observable } from 'rxjs';
import { Review } from './../models/review';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  addReview(review: Review): Observable<unknown> {
    return this.http.post('http://192.168.1.194:8080/review/add', review);
  }

}
