import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  endpoint;

  constructor(private http: HttpClient) {}

  setEndpoint(endpoint) {
    this.endpoint = endpoint;
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}/${this.endpoint}`);
  }

  get(id) {
    return this.http.get(`${environment.apiUrl}/${this.endpoint}/${id}`);
  }

  post(data) {
    return this.http.post(`${environment.apiUrl}/${this.endpoint}`, data);
  }

  put(id, data) {
    return this.http.put(`${environment.apiUrl}/${this.endpoint}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${environment.apiUrl}/${this.endpoint}/${id}`);
  }

}
