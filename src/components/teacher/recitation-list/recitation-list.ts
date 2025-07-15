import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-recitation-list',
  imports: [MatChip,FormsModule,CommonModule,MatIcon],
  templateUrl: './recitation-list.html',
  styleUrl: './recitation-list.css'
})
export class RecitationList {
session = {
  participants: [
    { fullName: 'Ahmad' , status: 'pending' },
    {  fullName: 'Sara' , status: 'pending' },
    { fullName: 'Youssef' , status: 'pending'},
  ]
};
}
