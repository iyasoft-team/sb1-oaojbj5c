import { Component, Inject, OnInit } from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SessionService } from '../../../services/session.service';
import { AuthService } from '../../../services/auth.service';
import { Student } from '../../../models/user.model';
import {
  Recurrence,
  SessionSchedule,
  ParticipationTemplate,
  
} from '../../../models/Sessions.model';
import { LanguageService, Translation } from '../../../services/language.service';
import { StudentService } from '../../../services/student.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-schedule-session-modal',
  standalone: true,
  templateUrl: './schedule-session-modal.component.html',
  styleUrl: './schedule-session-modal.component.css',
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
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    ReactiveFormsModule,
    MatStepperModule,
  ]
})
export class ScheduleSessionModalComponent implements OnInit {
  students: (Student & { selected?: boolean })[] = [];
  currentUser = this.authService.getCurrentUser();
  translations: Translation;
  recurrenceOptions = Object.values(Recurrence);

 newSessionFormModel = {
  date: new Date(),
  startTime: '09:00',
  endTime: '10:00',
  recurrence: Recurrence.None,
  toEndOfYear: false,
  classroomId: '', // for UI use, not part of SessionSchedule directly
  selectedStudents: [] as number[] // student IDs
};

  step1Form: FormGroup;
  step2Form: FormGroup;
  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<ScheduleSessionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private languageService: LanguageService,
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(t => this.translations = t);

    this.step1Form = this.fb.group({
      startTime: [''],
      endTime: [''],
      recurrence: [''],
      toEndOfYear: [false]
    });

    this.step2Form = this.fb.group({
      students: [[]]
    });
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

  }

  onSubmit(): void {
    const { startTime, endTime, date } = this.newSessionFormModel;
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startDateTime = new Date(date);
  startDateTime.setHours(startHour, startMinute, 0);

  const endDateTime = new Date(date);
  endDateTime.setHours(endHour, endMinute, 0);

  const selectedParticipants: ParticipationTemplate[] = this.students
    .filter(s => s.selected)
    .map(s => ({
      id: 0,
      studentId: s.id
    }));

  const sessionSchedule: Omit<SessionSchedule, 'id' | 'sessionDays'> = {
    teacherId: this.currentUser.id,
    startDate: startDateTime,
    endDate: endDateTime,
    toEndOfYear: this.newSessionFormModel.toEndOfYear,
    recurrence: this.newSessionFormModel.recurrence,
    defaultParticipants: selectedParticipants
  };

  
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
