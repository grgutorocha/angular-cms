import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { StorageService, StorageType } from './storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    this.storageService.setType(StorageType.LOCAL);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLogged()) {
      return true;
    }

    this.router.navigate(['/login']).then(() => console.log('Redirected'));

    return false;
  }

  getCurrentUser() {
    return this.storageService.get('currentUser');
  }

  isLogged() {
    return this.getCurrentUser();
  }
}
