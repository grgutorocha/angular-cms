import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint = 'tasks';

  constructor(private http: HttpService) {}

  getAll() {
    return this.http.getAll(this.endpoint);
  }

  get(id) {
    return this.http.get(this.endpoint, id);
  }

  post(data) {
    return this.http.post(this.endpoint, data);
  }

  put(id, data) {
    return this.http.put(this.endpoint, id, data);
  }

  delete(id) {
    return this.http.delete(this.endpoint, id);
  }

}
