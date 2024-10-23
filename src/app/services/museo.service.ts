import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MuseoService {
  private baseUrl = environment.baseUrl;

  private _user: any = JSON.parse(localStorage.getItem('user')!);

  get user() {
    return this._user;
  }
  constructor(private httpClient: HttpClient) {}

  getAllMuseos(): Observable<any> {
    const headers = {
      'x-auth-token': this.user.token,
    };
    return this.httpClient.get<any>(`${this.baseUrl}/museos/getAllMuseos`, {
      headers,
    });
  }

  getMuseoById(id: string): Observable<any> {
    const headers = {
      'x-auth-token': this.user.token,
    };
    return this.httpClient.get<any>(
      `${this.baseUrl}/museos/searchMuseo/${id}`,
      {
        headers,
      }
    );
  }
}
