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
import { Student, StudentlEval, User } from '../../../models/user.model';
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
  students: StudentlEval[] = [];
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
  
surahs = [
  { number: 1, name: 'الفاتحة', ayahCount: 7 },
  { number: 2, name: 'البقرة', ayahCount: 286 },
  { number: 3, name: 'آل عمران', ayahCount: 200 },
];
  ngOnInit(): void {
    this.stdntService.getStudentsWithLastEval().subscribe(data => {
      this.students= data;
    });

    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.newSession.date = tomorrow;
  }

  onSubmit(): void {
    if (!this.currentUser) return;

    if (!this.selectedStudent) return;
  
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
      status: 'scheduled',
      startSurah : this.selectedSurahNumber,
      startAyah : this.selectedAyahNumber
    };

    this.sessionService.createSession(sessionData).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  ayahNumbers: number[] = [];

  selectedSurahNumber: number | null = null;
  selectedAyahNumber: number | null = null;
  onSurahChange(surahNumber: number) {
  this.selectedSurahNumber = surahNumber;
  this.updateAyahs(surahNumber);
  this.selectedAyahNumber = null; // reset ayah selection
}
updateAyahs(surahNumber: number, preselectAyahNumber?: number) {
  const surah = this.surahs.find(s => s.number === surahNumber);
  this.ayahNumbers = surah ? Array.from({ length: surah.ayahCount }, (_, i) => i + 1) : [];

  if (preselectAyahNumber) {
    this.selectedAyahNumber = preselectAyahNumber;
  } else {
    this.selectedAyahNumber = null;
  }
}

selectedStudent: StudentlEval | null = null;
onStudentChanged(studentId: number) {
  this.selectedStudent = this.students.find(s => s.id === studentId) || null;

  if (this.selectedStudent?.lastEval) {
    this.selectedSurahNumber = this.selectedStudent.lastEval.surahNumber;

    // 👇 Pass both surah and ayah to update
    this.updateAyahs(
      this.selectedSurahNumber,
      this.selectedStudent.lastEval.ayahNumber
    );
  } else {
    this.selectedSurahNumber = null;
    this.selectedAyahNumber = null;
    this.ayahNumbers = [];
  }
}
}