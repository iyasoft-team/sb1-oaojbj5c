import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SessionService } from '../../../services/session.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { Session } from '../../../models/session.model';
import { LanguageService, Translation } from '../../../services/language.service';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-schedule-session-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl:"./schedule-session-modal.component.html",
  styleUrl:"./schedule-session-modal.component.css"
})
export class ScheduleSessionModalComponent implements OnInit {
  students: User[] = [];
  currentUser = this.authService.getCurrentUser();
  translations: Translation;
  
  newSession = {
    studentId: '',
    topic: '',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    startDate:new Date(),
    endDate:new Date()
  };

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<ScheduleSessionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private languageService: LanguageService,
    private stdntService : StudentService
  ) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(translations => {
      this.translations = translations;
    });
  }

  ngOnInit(): void {
    this.students = this.authService.getStudents();
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.newSession.date = tomorrow;
  }

  onSubmit(): void {
    if (!this.currentUser) return;

    const selectedStudent = this.students.find(s => s.id === this.newSession.studentId);
    if (!selectedStudent) return;
  
  const [startHour, startMinute] = this.newSession.startTime.split(':').map(Number);
  const [endHour, endMinute] = this.newSession.endTime.split(':').map(Number);
  
  const startDateTime = new Date(  this.newSession.date);
  startDateTime.setHours(startHour, startMinute, 0);

  const endDateTime = new Date(  this.newSession.date);
  endDateTime.setHours(endHour, endMinute, 0);

    const sessionData: Omit<Session, 'id' | 'createdAt'> = {
      teacherId: this.currentUser.id,
      studentId: this.newSession.studentId,
      startDate:startDateTime ,
      endDate:endDateTime,
      topic: this.newSession.topic,
      status: 'scheduled'
    };

    this.sessionService.createSession(sessionData).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}