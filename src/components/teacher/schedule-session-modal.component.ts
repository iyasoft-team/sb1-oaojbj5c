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
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Session } from '../../models/session.model';
import { LanguageService, Translation } from '../../services/language.service';

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
  template: `
    <div class="modal-header">
      <h2 mat-dialog-title>
        <mat-icon>event_note</mat-icon>
        {{ translations.scheduleNewSession }}
      </h2>
    </div>

    <mat-dialog-content class="modal-content">
      <form #scheduleForm="ngForm" class="schedule-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ translations.selectStudent }}</mat-label>
          <mat-select [(ngModel)]="newSession.studentId" name="studentId" required>
            <mat-option *ngFor="let student of students" [value]="student.id">
              {{ student.name }}
            </mat-option>
          </mat-select>
          <mat-icon matSuffix>person</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ translations.topic }}</mat-label>
          <input matInput [(ngModel)]="newSession.topic" name="topic" 
                 placeholder="e.g., Quran Recitation - Surah Al-Fatiha">
          <mat-icon matSuffix>menu_book</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ translations.sessionDate }}</mat-label>
          <input matInput [matDatepicker]="picker" [(ngModel)]="newSession.date" name="date" required>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <div class="time-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>{{ translations.startTime }}</mat-label>
            <input matInput type="time" [(ngModel)]="newSession.startTime" name="startTime" required>
            <mat-icon matSuffix>schedule</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>{{ translations.endTime }}</mat-label>
            <input matInput type="time" [(ngModel)]="newSession.endTime" name="endTime" required>
            <mat-icon matSuffix>schedule</mat-icon>
          </mat-form-field>
        </div>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions class="modal-actions">
      <button mat-button (click)="onCancel()" class="cancel-btn">
        <mat-icon>close</mat-icon>
        {{ translations.cancel }}
      </button>
      <button mat-raised-button (click)="onSubmit()" [disabled]="!scheduleForm.valid" class="schedule-btn">
        <mat-icon>event</mat-icon>
        {{ translations.scheduleSession }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .modal-header {
      padding: 24px 24px 16px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      position: relative;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    }

    .modal-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #0f4c75, #d4af37, #0f4c75);
    }

    .modal-header h2 {
      margin: 0;
      color: #0f4c75;
      font-size: 1.5rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .modal-header h2 mat-icon {
      color: #d4af37 !important;
      font-size: 28px !important;
    }

    .modal-subtitle {
      font-family: 'Amiri', serif;
      color: #5d6d7e;
      font-size: 0.9rem;
      margin-top: 4px;
      text-align: right;
      direction: rtl;
    }

    .modal-content {
      padding: 24px;
      min-width: 500px;
      max-height: 70vh;
      overflow-y: auto;
    }

    .schedule-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .full-width {
      width: 100%;
    }

    .time-row {
      display: flex;
      gap: 16px;
    }

    .half-width {
      flex: 1;
    }

    .modal-actions {
      padding: 16px 24px;
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .cancel-btn {
      background: transparent !important;
      border: 2px solid #666 !important;
      color: #666 !important;
      box-shadow: none !important;
      transition: all 0.3s ease !important;
    }

    .cancel-btn:hover {
      background: rgba(102, 102, 102, 0.05) !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 102, 102, 0.2) !important;
    }

    .cancel-btn mat-icon {
      color: #666 !important;
    }

    .schedule-btn {
      background: transparent !important;
      border: 2px solid #0f4c75 !important;
      color: #0f4c75 !important;
      box-shadow: none !important;
      transition: all 0.3s ease !important;
    }

    .schedule-btn:hover:not(:disabled) {
      background: rgba(15, 76, 117, 0.05) !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(15, 76, 117, 0.2) !important;
    }

    .schedule-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    .schedule-btn mat-icon {
      color: #0f4c75 !important;
    }

    /* Form field styling */
    .mat-mdc-form-field {
      margin-bottom: 8px;
    }

    .mat-mdc-form-field .mat-mdc-form-field-outline {
      border-radius: 10px !important;
      border-color: rgba(15, 76, 117, 0.3) !important;
    }

    .mat-mdc-form-field.mat-focused .mat-mdc-form-field-outline {
      border-color: #0f4c75 !important;
      border-width: 2px !important;
    }

    .mat-mdc-form-field-label {
      color: #5d6d7e !important;
      font-weight: 500 !important;
    }

    .mat-mdc-input-element {
      color: #2c3e50 !important;
      font-weight: 500 !important;
    }

    .mat-mdc-form-field .mat-mdc-form-field-icon-suffix mat-icon {
      color: #0f4c75 !important;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .modal-content {
        min-width: 90vw;
        padding: 16px;
      }

      .time-row {
        flex-direction: column;
        gap: 12px;
      }

      .half-width {
        width: 100%;
      }

      .modal-actions {
        flex-direction: column;
        gap: 8px;
      }

      .modal-header h2 {
        font-size: 1.3rem;
      }
    }

    /* Animation */
    :host {
      display: block;
      animation: modalSlideIn 0.3s ease-out;
    }

    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
  `]
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
    private languageService: LanguageService
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
      teacherName: this.currentUser.name,
      studentName: selectedStudent.name,
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