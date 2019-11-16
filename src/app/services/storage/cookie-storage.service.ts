import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { StorageInterface } from './storage.interface';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService implements StorageInterface {

    constructor(private cookieService: CookieService) {}

    get(name: string): any|string {
        return this.cookieService.get(name);
    }

    set(name: string, value: string): void {
        this.cookieService.set(name, value);
    }

    remove(name: string): void {
        this.cookieService.delete(name);
    }

}
