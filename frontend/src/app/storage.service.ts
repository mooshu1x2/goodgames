import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  public storeData(key, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key): any {
    if (localStorage.getItem(key) === null) {
      return false;
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  public deleteData(key): void {
    console.log('Delete Data');
    if (key) {
      console.log('Deleting key ' + key);
      localStorage.removeItem(key);
    }
  }

  // user verification auth service
  public isAuthenticated(): boolean {
    if (this.getData('userKey')) {
      return true;
    } else {
      return false;
    }
  }

  public resetStorage(): void {
    localStorage.clear();
  }
}
