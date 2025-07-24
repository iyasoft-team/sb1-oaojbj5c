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
  { surah: 'Al-Baqara', ayahStart: 10, ayahEnd: 20, rating: 'Bien' },
  { surah: 'Al-Kahf', ayahStart: 1, ayahEnd: 10, rating: 'Mauvais' },
  { surah: 'Yasin', ayahStart: 30, ayahEnd: 40, rating: 'trés Bien' },
  { surah: 'An-Nisa', ayahStart: 5, ayahEnd: 8, rating: 'Modeste' },
  { surah: 'Maryam', ayahStart: 15, ayahEnd: 22, rating: 'Parfait' },
  { surah: 'Taha', ayahStart: 100, ayahEnd: 110, rating: 'Mauvais' },
];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  getRatingClass(rating: string): string {
  switch (rating.toLowerCase()) {
    case 'parfait':
      return 'perfect';
    case 'trés bien':
    case 'très bien':
      return 'very-good';
    case 'bien':
      return 'good';
    case 'modeste':
      return 'average';
    case 'mauvais':
      return 'bad';
    default:
      return '';
  }
}
}
