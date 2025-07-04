import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Session, SessionNote } from '../models/session.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionsSubject = new BehaviorSubject<Session[]>([]);
  public sessions$ = this.sessionsSubject.asObservable();

  private notesSubject = new BehaviorSubject<SessionNote[]>([]);
  public notes$ = this.notesSubject.asObservable();

  constructor(private authService: AuthService) {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const mockSessions: Session[] = [
      {
        id: '1',
        teacherId: '1',
        studentId: '2',
        teacherName: 'John Smith',
        studentName: 'Emily Johnson',
        date: new Date(2025, 0, 15, 10, 0), // January 15, 2025, 10:00 AM
        startTime: '10:00',
        endTime: '11:00',
        topic: 'Mathematics - Algebra Basics',
        status: 'scheduled',
        createdAt: new Date()
      },
      {
        id: '2',
        teacherId: '1',
        studentId: '3',
        teacherName: 'John Smith',
        studentName: 'Michael Brown',
        date: new Date(2025, 0, 15, 14, 0), // January 15, 2025, 2:00 PM
        startTime: '14:00',
        endTime: '15:00',
        topic: 'English - Essay Writing',
        status: 'scheduled',
        createdAt: new Date()
      },
      {
        id: '3',
        teacherId: '1',
        studentId: '2',
        teacherName: 'John Smith',
        studentName: 'Emily Johnson',
        date: new Date(2025, 0, 17, 9, 0), // January 17, 2025, 9:00 AM
        startTime: '09:00',
        endTime: '10:00',
        topic: 'Science - Chemistry Lab',
        status: 'scheduled',
        createdAt: new Date()
      }
    ];

    this.sessionsSubject.next(mockSessions);
  }

  getSessions(): Observable<Session[]> {
    return this.sessions$;
  }

  getTeacherSessions(teacherId: string): Observable<Session[]> {
    const sessions = this.sessionsSubject.value.filter(s => s.teacherId === teacherId);
    return of(sessions);
  }

  getStudentSessions(studentId: string): Observable<Session[]> {
    const sessions = this.sessionsSubject.value.filter(s => s.studentId === studentId);
    return of(sessions);
  }

  createSession(session: Omit<Session, 'id' | 'createdAt'>): Observable<Session> {
    const newSession: Session = {
      ...session,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    const sessions = [...this.sessionsSubject.value, newSession];
    this.sessionsSubject.next(sessions);
    return of(newSession);
  }

  updateSession(sessionId: string, updates: Partial<Session>): Observable<Session | null> {
    const sessions = this.sessionsSubject.value;
    const sessionIndex = sessions.findIndex(s => s.id === sessionId);
    
    if (sessionIndex === -1) return of(null);

    sessions[sessionIndex] = { ...sessions[sessionIndex], ...updates };
    this.sessionsSubject.next([...sessions]);
    return of(sessions[sessionIndex]);
  }

  startSession(sessionId: string): Observable<Session | null> {
    return this.updateSession(sessionId, { status: 'in-progress' });
  }

  completeSession(sessionId: string, notes?: string): Observable<Session | null> {
    return this.updateSession(sessionId, { 
      status: 'completed',
      notes: notes || ''
    });
  }

  addNote(sessionId: string, content: string): Observable<SessionNote> {
    const note: SessionNote = {
      sessionId,
      content,
      timestamp: new Date()
    };

    const notes = [...this.notesSubject.value, note];
    this.notesSubject.next(notes);
    return of(note);
  }

  getSessionNotes(sessionId: string): Observable<SessionNote[]> {
    const notes = this.notesSubject.value.filter(n => n.sessionId === sessionId);
    return of(notes);
  }
}