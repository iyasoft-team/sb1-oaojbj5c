import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageLine } from '../models/TajweedID';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class QuranService {
  constructor(private http: HttpClient) {}

  loadPage(pagenumber: number): Observable<PageLine[]> {
   
    return this.http.get<PageLine[]>(`${environment.apiUrl}/quran/page/${pagenumber}`).pipe(
      catchError((err) => {
        console.error('Failed to load tajweed annotations:', err);
        return throwError(() => err);
      })
    );
  }

   loadPageBySurahAyah(surah: number,ayah:number): Observable<PageLine[]> {
   
    return this.http.get<PageLine[]>(`${environment.apiUrl}/quran/pagebysurahayah/${surah}/${ayah}`).pipe(
      catchError((err) => {
        console.error('Failed to load tajweed annotations:', err);
        return throwError(() => err);
      })
    );
  }
}
