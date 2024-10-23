import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  private _user: any = {};

  get user() {
    return this._user;
  }

  login(data: any) {
    return this.httpClient
      .post<any>(this.baseUrl + '/auth/login', data)
      .pipe(
        tap((res) => {
          if (res.ok === true) {
            this._user = {
              id: res.id,
              username: res.username,
              email: data.email,
              token: res.token,
            };
          } else {
            this._user = null;
          }
        }),
        map((res) => res.ok),
        catchError((err) => of(err.error.msg))
      );
  }

  validarToken(): Observable<boolean>{

    const token = JSON.parse(localStorage.getItem('user')!);

    if(token){
      return new Observable((suscriber) => {
        suscriber.next(true);
      });
    } else {
      return new Observable((suscriber) => {
        suscriber.next(false);
      });
    }
  }

}
