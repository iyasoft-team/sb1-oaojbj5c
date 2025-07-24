import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student, StudentlEval } from '../models/user.model';
import { environment } from '../environment/environment';
import { Recitation } from '../models/Sessions.model';

@Injectable({
  providedIn: 'root'
})
export class RecitationService {

  constructor(private http: HttpClient) {}
    apiUrl = `${environment.apiUrl}/Recitations`
  
getRecitationsBySessionID(Id : string): Observable<Recitation[]> {
  return this.http.get<Recitation[]>(`${this.apiUrl}/GetRecitationsBySessionDayID/`+Id)
}
getRecitationByID(Id : string) : Observable<Recitation> {

    return this.http.get<Recitation>(`${this.apiUrl}/GetRecitationByID/`+Id)
}
updateRecitationStatus(id: number, status: number): Observable<void> {
  return this.http.patch<void>(`${this.apiUrl}/${id}/status`, status, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
}
 updateRecitationHomework(id: number, homework: UpdateHomeworkDto): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/homework`, homework, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
export interface UpdateHomeworkDto {
  scheduledSurah: number;
  scheduledAyah: number;
}

