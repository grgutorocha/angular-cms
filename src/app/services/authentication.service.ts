import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpService) {}

  login(data) {
    return this.http.post('auth/login', data);
  }

  logout() {
    return this.http.post('auth/logout', {});
  }
}
