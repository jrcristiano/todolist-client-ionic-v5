import { Injectable } from '@angular/core';

const KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  hasToken(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    window.localStorage.setItem(KEY, token);
  }

  getToken(): string {
    return window.localStorage.getItem(KEY);
  }

  removeToken(): void {
    window.localStorage.removeItem(KEY);
  }

}
