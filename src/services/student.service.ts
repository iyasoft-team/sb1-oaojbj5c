import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/user.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.apiUrl}/Students`);
  }

  // Get student by ID
  getStudent(id: string): Observable<Student> {  
    return this.http.get<Student>(`${environment.apiUrl}/Students/${id}`);
  }

  // (Optional) Create a student
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(environment.apiUrl, student);
  }

  // (Optional) Update student
  updateStudent(student: Student): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/${student.id}`, student);
  }

  // (Optional) Delete student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${id}`);
  }
}
