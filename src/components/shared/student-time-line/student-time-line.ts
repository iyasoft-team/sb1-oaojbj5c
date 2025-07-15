import { CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Student } from '../../../models/user.model';

@Component({
  selector: 'app-student-time-line',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    DragDropModule
  ],
  templateUrl: './student-time-line.html',
  styleUrl: './student-time-line.css'
})
export class StudentTimeLine {
   displayedColumns: string[] = ['name', 'startTime', 'duration'];

  // Initial sample data
  students : any[] ;  
  @Input() selectedStudents : Student[] ; 
  @Input() selectedStartTime : string
  timelineStart = 9 * 60; // 9:00 AM
  minutePixel = 4; // 1 minute = 4 pixels
  ngOnChanges(changes: SimpleChanges): void {
      if (this.selectedStudents?.length && this.selectedStartTime) {
        const baseStart = this.parseTimeString(this.selectedStartTime);
        this.students = this.selectedStudents.map((student, index) => ({
          name: student.fullName,
          startTime: baseStart + index * 15,
          duration: 15
        }));
      }
    }

  formatTimeInput(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }
  parseTimeString(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}
  onStartTimeChange(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const [h, m] = input.value.split(':').map(Number);
    this.students[index].startTime = h * 60 + m;
    this.updateFollowingStartTimes(index);
  }

  onDurationChange(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (value < 1) return;
    this.students[index].duration = value;
    this.updateFollowingStartTimes(index);
  }

  updateFollowingStartTimes(startIndex: number) {
    for (let i = startIndex + 1; i < this.students.length; i++) {
      const prev = this.students[i - 1];
      this.students[i].startTime = prev.startTime + prev.duration;
    }
  }

  getBlockLeft(startTime: number): number {
    return (startTime - this.timelineStart) * this.minutePixel;
  }

  drop(event: CdkDragDrop<any[]>) {
    let templist = [...this.students];
    let draggedItem = templist[event.previousIndex];
    let destinationItem = templist[event.currentIndex]

    if(event.previousIndex<event.currentIndex)
      destinationItem.startTime = draggedItem.startTime;
    else
     draggedItem.startTime =  destinationItem.startTime;

    //draggedItem.startTime = destinationItem.startTime;

    moveItemInArray(templist, event.previousIndex, event.currentIndex);

    this.students = null;
    this.students = templist;

    this.recalculateAllStartTimes(event.currentIndex);
  }

  recalculateAllStartTimes(currentindex:number) {
    if (this.students.length === 0) return;
    if(currentindex == 0 )
      this.updateFollowingStartTimes(0)
    else
      for (let i = currentindex; i < this.students.length; i++) {
        const prev = this.students[i - 1];
        this.students[i].startTime = prev.startTime + prev.duration;
      }
  }
}
