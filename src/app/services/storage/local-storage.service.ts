import { Injectable } from '@angular/core';

import { StorageInterface } from './storage.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageInterface {

    constructor() {}

    set(name: string, value: string): void {
        localStorage.setItem(name, value);
    }

    remove(name: string): void {
        localStorage.removeItem(name);
    }

    get(name: string) {
        return localStorage.getItem(name);
    }

}
