import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthenticationService,
  StorageService,
  StorageType
} from '../../services';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html'
})
export class LogoutComponent {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) {}

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.storageService.setType(StorageType.LOCAL);
      this.storageService.remove('currentUser');
      this.router.navigate(['/login']).then(() => console.log('Redirected'));
    });
  }

}
