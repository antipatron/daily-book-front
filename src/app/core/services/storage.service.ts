import {Injectable} from '@angular/core';
import {tick} from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  public remove(key: string, local = true): void {
    if (local) {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  }

  public add(key: string, value: any, local = true): void {
    const parsedValue = JSON.stringify(value);
    if (local) {
      localStorage.setItem(key, parsedValue);
    } else {
      sessionStorage.setItem(key, parsedValue);
    }
  }

  public get(key: string): any {
    const localItem = localStorage.getItem(key);
    if (localItem) {
      return JSON.parse(localItem);
    } else {
      const sessionItem = sessionStorage.getItem(key);
      if (sessionItem) {
        return JSON.parse(sessionItem);
      }
    }
  }

  logout() {
    this.clearStorage();
    /*this.keycloakService.logout(location.origin);*/
    tick(3000);
    /*this.keycloakService.login({prompt: 'login'});*/
  }

  public clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
