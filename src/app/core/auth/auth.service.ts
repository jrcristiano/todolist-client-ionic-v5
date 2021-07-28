import { User } from './../models/user';
import { UserService } from './../user/user.service';
import { TokenService } from './../token/token.service';
import { environment } from '../../../environments/environment';
import { Oauth } from '../models/oauth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const api = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService) { }

  authenticate(username: string, password: string): Observable<Oauth> {
    return this.http.post<Oauth>(api + '/oauth/token', {
      username,
      password,
      client_id: environment.api_client_id,
      client_secret: environment.api_client_secret,
      grant_type: environment.api_grant_type,
      scope: environment.api_scope,
    })
    .pipe(tap(res => {
      const token = res.access_token;
      this.tokenService.setToken(token);
      this.userService.putAuthenticatedUserAtLocalStorage();
    }));
  }

  register(userData: User): Observable<any> {
    return this.http.post<User>(api + '/api/users', userData);
  }
}
