import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getAll(endpoint) {
    return this.http.get(`${environment.apiUrl}/${endpoint}`);
  }

  get(endpoint, id) {
    return this.http.get(`${environment.apiUrl}/${endpoint}/${id}`);
  }

  post(endpoint, data) {
    return this.http.post(`${environment.apiUrl}/${endpoint}`, data);
  }

  put(endpoint, id, data) {
    return this.http.put(`${environment.apiUrl}/${endpoint}/${id}`, data);
  }

  delete(endpoint, id) {
    return this.http.delete(`${environment.apiUrl}/${endpoint}/${id}`);
  }

}
