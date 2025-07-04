import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageLine } from '../models/TajweedID';


@Injectable({
  providedIn: 'root'
})
export class QuranService {
  private username = 'madrasaty';
  private password = 'P@ssword2025';
  private devurl  ="https://localhost:7210/api/Quran/page"
  private apiUrl = 'https://196.179.202.34:503/api/quran/page';

  constructor(private http: HttpClient) {}

  loadPage(pagenumber: number): Observable<PageLine[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${this.username}:${this.password}`)
    });

    return this.http.get<PageLine[]>(`${this.apiUrl}/${pagenumber}`, { headers }).pipe(
      catchError((err) => {
        console.error('Failed to load tajweed annotations:', err);
        return throwError(() => err);
      })
    );
  }
}
