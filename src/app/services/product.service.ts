import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('http://192.168.1.194:8080/products');
  }

  getAllByIds(ids: number[]): Observable<Product[]> {
    const idString = ids.join(',');
    const options = {
      params: new HttpParams().set('IdsAtOnce', idString)
    }
    return this.http.get<Product[]>('http://192.168.1.194:8080/products/produse', options);
  }

  getById(id: number): Observable<Product> {
    const options = {
      params: new HttpParams().set('id', id.toString())
    };
    return this.http.get<Product>('http://192.168.1.194:8080/products/product', options);
  }
}
