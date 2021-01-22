import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  getRequest(url) {
    return this.http.get(`${this.baseUrl}${url}`)
      .pipe(map(res => res));
  }

  postRequest(url, payload) {
    return this.http.post(`${this.baseUrl}${url}`, payload)
      .pipe(map(res => res));
  }

  putRequest(url, payload) {
    return this.http.put(`${this.baseUrl}${url}`, payload)
      .pipe(map(res => res));
  }

  deleteRequest(url) {
    return this.http.delete(`${this.baseUrl}${url}`)
      .pipe(map(res => res));
  }
}
