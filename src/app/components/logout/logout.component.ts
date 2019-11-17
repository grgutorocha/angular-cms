import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AuthGuardService } from '../../services';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html'
})
export class LogoutComponent {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authGuardService: AuthGuardService
  ) {}

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.authGuardService.removeCurrentUser();
      this.router.navigate(['/login']);
    });
  }

}
