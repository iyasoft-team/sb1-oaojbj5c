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
  

}
