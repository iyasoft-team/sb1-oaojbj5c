import { Component, Input } from '@angular/core';
import { Student } from '../../../models/user.model';

@Component({
  selector: 'app-student-info-bar',
  imports: [],
  templateUrl: './student-info-bar.html',
  styleUrl: './student-info-bar.css'
})
export class StudentInfoBar {
@Input() student!: Student;
}
