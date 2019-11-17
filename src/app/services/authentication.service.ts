import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpService) {}

  login(data) {
    this.http.setEndpoint('auth/login');
    return this.http.post(data);
  }

  logout() {
    this.http.setEndpoint('auth/logout');
    return this.http.post({});
  }
}
