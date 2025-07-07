import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, LoginCredentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock users for demo
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'teacher@school.com',
      name: 'John Smith',
      role: 'teacher',
      createdAt: new Date()
    },
    {
      id: '2',
      email: 'student@school.com',
      name: 'Emily Johnson',
      role: 'student',
      createdAt: new Date()
    },
    {
      id: '3',
      email: 'student2@school.com',
      name: 'Michael Brown',
      role: 'student',
      createdAt: new Date()
    }
  ];

  constructor() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<User | null> {
    // Simple mock authentication
    const user = this.mockUsers.find(u => u.email === credentials.email);
    
    if (user && credentials.password === 'P@ssword') {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(user);
    }
    
    return of(null);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isTeacher(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'teacher';
  }

  isStudent(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'student';
  }

  getUsers(): User[] {
    return this.mockUsers;
  }

  getStudents(): User[] {
    return this.mockUsers.filter(user => user.role === 'student');
  }
}