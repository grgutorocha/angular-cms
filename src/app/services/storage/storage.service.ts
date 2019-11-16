import { Injectable } from '@angular/core';

import { StorageInterface } from './storage.interface';
import { StorageFactory } from './storage.factory';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: StorageInterface;

  constructor(private storageFactory: StorageFactory) {}

  setType(type: string) {
    this.storage = this.storageFactory.getStorage(type);
  }

  get(name: string) {
    return this.storage.get(name);
  }

  set(name: string, value: string) {
    this.storage.set(name, value);
  }

  remove(name: string) {
    this.storage.remove(name);
  }

}
