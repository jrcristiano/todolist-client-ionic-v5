import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const KEY = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  authorizeUser() {
    if (this.tokenService.hasToken()) {
      const AuthenticatedUserApi = environment.api_url + '/api/v1/authenticated';


      this.http.get(AuthenticatedUserApi).subscribe((res: User) => {
        this.setUser(JSON.stringify(res));
      })
    }
  }

  setUser(user): void {
    window.localStorage.setItem(KEY, user);
  }

  getUser(): string {
    return window.localStorage.getItem(KEY);
  }

  hasUserLogged(): boolean {
    return !!this.getUser();
  }

  removeUser(): void {
    window.localStorage.removeItem(KEY);
  }

}
