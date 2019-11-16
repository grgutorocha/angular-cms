import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AuthGuardService, StorageService, StorageType } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isLogged;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuardService,
    private storageService: StorageService
  ) {
    this.isLogged = this.authGuardService.isLogged();
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.storageService.setType(StorageType.LOCAL);
      this.storageService.remove('currentUser');
      this.isLogged = this.authGuardService.isLogged();
      this.router.navigate(['/login']).then(() => console.log('Redirected'));
    });
  }
}
