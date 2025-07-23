import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recitation-info',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './recitation-info.component.html',
  styleUrls: ['./recitation-info.component.css']
})
export class RecitationInfoComponent {
  isOpen = false;

recitations = [
  { surah: 'Al-Baqara', ayahStart: 10, ayahEnd: 20, rating: 'good' },
  { surah: 'Al-Kahf', ayahStart: 1, ayahEnd: 10, rating: 'bad' },
  { surah: 'Yasin', ayahStart: 30, ayahEnd: 40, rating: 'good' },
  { surah: 'An-Nisa', ayahStart: 5, ayahEnd: 8, rating: 'average' },
  { surah: 'Maryam', ayahStart: 15, ayahEnd: 22, rating: 'good' },
  { surah: 'Taha', ayahStart: 100, ayahEnd: 110, rating: 'bad' },
];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
