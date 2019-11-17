import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'users';

  constructor(private http: HttpService) {
    this.http.setEndpoint(this.endpoint);
  }

  getAll() {
    return this.http.getAll();
  }

  register(data) {
    return this.http.post(data);
  }

  delete(id) {
    return this.http.delete(id);
  }
}
