import { Injectable } from '@angular/core';

import { StorageInterface } from './storage.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements StorageInterface {

    constructor() {}

    set(name: string, value: string): void {
        sessionStorage.setItem(name, value);
    }

    remove(name: string): void {
        sessionStorage.removeItem(name);
    }

    get(name: string) {
        return sessionStorage.getItem(name);
    }

}
