import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservacionesService {
  private baseUrl = environment.baseUrl;

  private _user: any = JSON.parse(localStorage.getItem('user')!);

  get user() {
    return this._user;
  }
  constructor(private httpClient: HttpClient) {}

  createReservacion(reservacionData: any): Observable<any> {
    const headers = {
      'x-auth-token': this.user.token,
    };
    return this.httpClient.post<any>(
      `${this.baseUrl}/reservaciones/createReservacion`,
      reservacionData,
      {
        headers,
      }
    );
  }

  getReservacionesByUser(id_user: string): Observable<any> {
    const headers = {
      'x-auth-token': this.user.token,
    };
    return this.httpClient.get<any>(
      `${this.baseUrl}/reservaciones/getAllReservacionesByUser/${id_user}`,
      {
        headers,
      }
    );
  }
}
