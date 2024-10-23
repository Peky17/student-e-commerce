import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeatroService {
  private baseUrl = environment.baseUrl;

  private _user: any = JSON.parse(localStorage.getItem('user')!);

  get user() {
    return this._user;
  }
  constructor(private httpClient: HttpClient) {}

  getAllTeatros(): Observable<any> {
    const headers = {
      'x-auth-token': this.user.token,
    };
    return this.httpClient.get<any>(`${this.baseUrl}/teatros/getAllTeatros`, {
      headers,
    });
  }

  getTeatroById(id_teatro: string): Observable<any> {
    const headers = {
      'x-auth-token': this.user.token,
    };
    return this.httpClient.get<any>(
      `${this.baseUrl}/teatros/searchTeatroById/${id_teatro}`,
      {
        headers,
      }
    );
  }

  getAllObrasInTeatro(id_teatro: string): Observable<any> {
    const headers = {
      'x-auth-token': this.user.token,
    };
    return this.httpClient.get<any>(
      `${this.baseUrl}/teatros/getAllObrasByTeatro/${id_teatro}`,
      {
        headers,
      }
    );
  }
}
