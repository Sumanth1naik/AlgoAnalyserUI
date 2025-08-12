import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenResponse } from './types';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}
  private currentUsername: string | null = null;

 login(username: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/token/`, { username, password }).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.logout();
      }
      return throwError(() => error);
    })
  );
  
}


  register(username: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register/`, { username, email, password });
  }

setTokens(access: string, refresh: string, username: string): void {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('username', username);
  this.currentUsername = username;
}

getAccessToken(): string | null {
  return localStorage.getItem('access_token');
}

getUsername(): string | null {
  return localStorage.getItem('username');
}

clearTokens(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}


  logout(): void {
  this.clearTokens();
}


  isLoggedIn(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('access_token');
  return !!token;
}

}
