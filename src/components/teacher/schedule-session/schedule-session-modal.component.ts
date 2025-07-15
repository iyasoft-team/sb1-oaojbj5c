import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { SessionScheduleService } from '../../../services/session-schedule.service';
import { StudentTimeLine } from '../../shared/student-time-line/student-time-line';

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
    MatTimepickerModule,
    MatPaginator,
    StudentTimeLine
  ]
})
export class ScheduleSessionModalComponent implements OnInit {
  students: (Student & { selected?: boolean })[] = [];
  currentUser = this.authService.getCurrentUser();
  translations: Translation;
recurrenceOptions = Object.keys(Recurrence)
  .filter(k => !isNaN(Number(k))) // Only numeric keys
  .map(k => ({
    label: Recurrence[Number(k)], // "None", "Daily", ...
    value: Number(k)              // 0, 1, 2, ...
  }));  defaultParticipants : ParticipationTemplate[]
//  newSessionFormModel = {
//   date: new Date(),
//   startTime: '09:00',
//   endTime: '10:00',
//   recurrence: Recurrence.None,
//   toEndOfYear: false,
//   classroomId: '', // for UI use, not part of SessionSchedule directly
//   selectedStudents: [] as number[] // student IDs
// };
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  step1Form: FormGroup;
  step2Form: FormGroup;

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private sessionScheduleService : SessionScheduleService,
    private dialogRef: MatDialogRef<ScheduleSessionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private languageService: LanguageService,
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(t => this.translations = t);



    this.step1Form = this.fb.group({
       sessionDate : [new Date()],
       startTime: ['08:00'],
       endTime: [new Date()],
       recurrence: Recurrence.None,
       toEndOfYear: [false]
    });



    this.step2Form = this.fb.group({
      students: [[]]
    });
  }

  dataSource = new MatTableDataSource<Student>();
  selection = new SelectionModel<Student>(true, []);
  displayedColumns: string[] = ['select', 'profile', 'fullName'];
  defaultProfileImage = 'assets/image/kid.png';

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.dataSource.data = data; 
    });
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  onSubmit(): void {
    const form = this.step1Form.value;

    const sessionDate = new Date(form.sessionDate);
    const startTimeParts = form.startTime.split(':');
    const endTimeParts = form.endTime.split(':');

    const startDate = new Date(sessionDate);
    const endDate = new Date(sessionDate);

    if (startTimeParts.length === 2) {
      const [startHour, startMinute] = startTimeParts.map(Number);
      startDate.setHours(startHour, startMinute, 0, 0);
    }

    if (endTimeParts.length === 2) {
      const [endHour, endMinute] = endTimeParts.map(Number);
      endDate.setHours(endHour, endMinute, 0, 0);
    }

    const selectedStudents = this.selection.selected;

    this.defaultParticipants = selectedStudents.map((student, index) => {
      const participantStartTime = new Date(startDate);
      participantStartTime.setMinutes(startDate.getMinutes() + index * 15);

      return {
        studentId: student.id,
        startTime: participantStartTime,  // as Date
        durationMinutes: 15
      };
    });

    const payload: Omit<SessionSchedule, 'id'> = {
      teacherId: this.currentUser.id,
      startDate: startDate,
      endDate: endDate,
      toEndOfYear: form.toEndOfYear,
      Recurrence: form.recurrence,
      defaultParticipants : this.defaultParticipants
    };

    this.sessionScheduleService.createSession(payload).subscribe({
      next: res =>  this.dialogRef.close(true),
      error: err => this.dialogRef.close(true)
    });
  }



  onCancel(): void {
    this.dialogRef.close(false);
  }
  OnSave() : void 
  {
    // this.sessionScheduleService.createSession(this.step1Form.value).subscribe({
    //   next(value) {
    //     console.log(value);
    //   },
    //   error(err) {
    //     console.log(err)
    //   },
    // })
    // this.step1Form.value
    console.log(this.step1Form.value)
  }
  
    // Filter method
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

// Selection helpers
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
