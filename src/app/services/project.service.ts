import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  endpoint = 'projects';

  constructor(private http: HttpService) {
    this.http.setEndpoint(this.endpoint);
  }

  getAll() {
    return this.http.getAll();
  }

  get(id) {
    return this.http.get(id);
  }

  post(data) {
    return this.http.post(data);
  }

  put(id, data) {
    return this.http.put(id, data);
  }

  delete(id) {
    return this.http.delete(id);
  }

}
