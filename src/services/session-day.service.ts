import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Session, SessionNote, TassmiiSession } from '../models/session.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { SessionDay, SessionSchedule } from '../models/Sessions.model';

@Injectable({
  providedIn: 'root'
})
export class SessionDayService {
  private baseUrl = environment.apiUrl+'/SessionDays'; 


  constructor(private http: HttpClient) {}
  
  getSessionDaysByTeacher(id : string): Observable<SessionDay[]> {
    return this.http.get<SessionDay[]>(`${this.baseUrl}/GetSessionDaysByTeacherID/${id}`);
  }
  GetSessionDayByID(id : string): Observable<SessionDay> {
    return this.http.get<SessionDay>(`${this.baseUrl}/GetSessionDayByID/${id}`);
  }
  
  putSessionDay(id: number, sessionDay: SessionDay): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, sessionDay);
  }
}
  
