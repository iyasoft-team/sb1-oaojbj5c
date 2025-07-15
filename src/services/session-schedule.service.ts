import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Session, SessionNote, TassmiiSession } from '../models/session.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { SessionSchedule } from '../models/Sessions.model';

@Injectable({
  providedIn: 'root'
})
export class SessionScheduleService {
  private baseUrl = environment.apiUrl+'/SessionSchedules'; 


  constructor(private http: HttpClient) {}
  
  getScheduledSessions(): Observable<SessionSchedule[]> {
    return this.http.get<SessionSchedule[]>(`${this.baseUrl}/`);
  }

  getTeacherSessions(teacherId: string): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.baseUrl}/teacher/${teacherId}`);
  }

  getStudentSessions(studentId: string): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.baseUrl}/student/${studentId}`);
  }

  createSession(session: Omit<SessionSchedule, 'id' | 'createdAt'>): Observable<SessionSchedule> {
    return this.http.post<SessionSchedule>(`${this.baseUrl}/AddSessionSchedulewithStudents`, session);
    
  }
}