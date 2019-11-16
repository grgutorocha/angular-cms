import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email, password) {
    return this.http.post(`${environment.apiUrl}/auth/login`, { email, password });
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/auth/logout`, {});
  }
}
