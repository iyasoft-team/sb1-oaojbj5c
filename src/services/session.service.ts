import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Session, SessionNote } from '../models/session.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private baseUrl = environment.apiUrl+'/sessions'; // adjust to your backend

  constructor(private http: HttpClient) {}
  getSession(id:string): Observable<Session> {
    return this.http.get<Session>(`${this.baseUrl}/${id}`);
  }
  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.baseUrl}/`);
  }

  getTeacherSessions(teacherId: string): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.baseUrl}/teacher/${teacherId}`);
  }

  getStudentSessions(studentId: string): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.baseUrl}/student/${studentId}`);
  }

  createSession(session: Omit<Session, 'id' | 'createdAt'>): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}`, session);
  }

  updateSession(sessionId: string, updates: Partial<Session>): Observable<Session> {
    return this.http.put<Session>(`${this.baseUrl}/${sessionId}`, updates);
  }

  startSession(sessionId: string): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}/${sessionId}/start`, {});
  }

  completeSession(sessionId: string) {
    return this.http.get(`${this.baseUrl}/complete/${sessionId}`);
  }

  getSessionNotes(sessionId: string): Observable<SessionNote[]> {
    return this.http.get<SessionNote[]>(`${this.baseUrl}/${sessionId}/notes`);
  }
  addNote(sessionId: string, content: string): Observable<SessionNote> {
    return this.http.post<SessionNote>(`${this.baseUrl}/${sessionId}/notes`, { content });
  }
  DeleteSession(sessionId: string){
    return this.http.delete(`${this.baseUrl}/${sessionId}`,);
  }
}