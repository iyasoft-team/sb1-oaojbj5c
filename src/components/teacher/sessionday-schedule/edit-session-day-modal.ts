import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { StudentTimeLine } from '../../shared/student-time-line/student-time-line';
import { Student } from '../../../models/user.model';
import { LanguageService, Translation } from '../../../services/language.service';
import { ParticipationTemplate, SessionDay } from '../../../models/Sessions.model';
import { SessionService } from '../../../services/session.service';
import { AuthService } from '../../../services/auth.service';
import { SessionScheduleService } from '../../../services/session-schedule.service';
import { ScheduleSessionModalComponent } from '../schedule-session/schedule-session-modal.component';
import { StudentService } from '../../../services/student.service';
import { SessionDayService } from '../../../services/session-day.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-edit-session-day-modal',
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
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatTimepickerModule,
    MatPaginator,
    StudentTimeLine,
    MatStepperModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-session-day-modal.html',
  styleUrl: './edit-session-day-modal.css'
})
export class EditSessionDayModal {
  students: (Student & { selected?: boolean })[] = [];
  currentUser = this.authService.getCurrentUser();
  translations: Translation;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  step1Form: FormGroup;
  step2Form: FormGroup;

  dataSource = new MatTableDataSource<Student>();
  selection = new SelectionModel<Student>(true, []);
  displayedColumns: string[] = ['select', 'profile', 'fullName'];
  defaultProfileImage = 'assets/image/kid.png';

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private sessionScheduleService: SessionScheduleService,
    private dialogRef: MatDialogRef<ScheduleSessionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SessionDay,
    private languageService: LanguageService,
    private studentService: StudentService,
    private sessionDayService: SessionDayService,
    private fb: FormBuilder
  ) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(t => this.translations = t);

    // Patch recitations
    if (!data.recitations && (data as any).recitations) {
      data.recitations = (data as any).recitations.map((r: any) => ({
        studentId: r.studentId,
        startTime: r.startTime,
        durationMinutes: r.durationMinutes
      }));
    }

    const dateObj = new Date(data.date);
    const startTimeString = this.extractTimeString(dateObj);

    // ✅ Added 'title' to form group
    this.step1Form = this.fb.group({
      title: [data.title ?? ''],
      sessionDate: [dateObj, Validators.required],
      startTime: [startTimeString]
    });

    this.step2Form = this.fb.group({
      students: [[]]
    });
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.dataSource.data = data;

      // Preselect students
      if (this.data.recitations?.length) {
        const selectedIds = this.data.recitations.map(p => p.studentId);
        this.students.forEach(student => {
          if (selectedIds.includes(student.id)) {
            this.selection.select(student);
          }
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(): void {
    const form = this.step1Form.value;
    const sessionDate = new Date(form.sessionDate);
    const [hour, minute] = form.startTime.split(':').map(Number);
    sessionDate.setHours(hour, minute, 0, 0);

    const selectedStudents = this.selection.selected;

    const recitations = selectedStudents.map((student, index) => {
      const startTime = new Date(sessionDate);
      startTime.setMinutes(startTime.getMinutes() + index * 15);

      return {
        studentId: student.id,
        startTime: startTime,
        durationMinutes: 15,
        sessionId: this.data.id
      };
    });

    const updatedDay: SessionDay = {
      ...this.data,
      title: form.title,
      date: sessionDate,
      modifiedAt: new Date(),
      modifiedBy: this.currentUser.name,
      recitations: recitations
    };

    this.sessionDayService.putSessionDay(this.data.id, updatedDay).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false)
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  extractTimeString(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach(row => this.selection.select(row));
  }
}
