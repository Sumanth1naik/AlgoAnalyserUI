import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://127.0.0.1:8000/api/upload-strategy/';  // Replace with your backend endpoint

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
