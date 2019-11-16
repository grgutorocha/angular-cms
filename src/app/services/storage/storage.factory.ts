import { Injectable } from '@angular/core';

import { StorageType } from './storage.constants';

import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { CookieStorageService } from './cookie-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StorageFactory {

    constructor(
        private localStorageService: LocalStorageService,
        private sessionStorageService: SessionStorageService,
        private cookieStorageService: CookieStorageService
    ) {}

    getStorage(storageType: string) {
        switch (storageType) {
            case StorageType.LOCAL:
                return this.localStorageService;
            case StorageType.SESSION:
                return this.sessionStorageService;
            default:
                return this.cookieStorageService;
        }
    }

}
