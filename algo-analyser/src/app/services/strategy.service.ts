import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Strategy } from '../models/strategy.model';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  private apiUrl = 'http://127.0.0.1:8000/api/strategies/';

  constructor(private http: HttpClient) {}

  getStrategies(): Observable<Strategy[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Strategy[]>(this.apiUrl, { headers });
  }
}
