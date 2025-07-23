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

  dummyHistory: string[] = [
    'Sourate Al-Baqara : Ayah 10 → Ayah 20',
    'Sourate Al-Kahf : Ayah 1 → Ayah 10',
    'Sourate Yasin : Ayah 30 → Ayah 40',
    'Sourate Al-Baqara : Ayah 10 → Ayah 20',
    'Sourate Al-Kahf : Ayah 1 → Ayah 10',
    'Sourate Yasin : Ayah 30 → Ayah 40',
    'Sourate Al-Baqara : Ayah 10 → Ayah 20',
    'Sourate Al-Kahf : Ayah 1 → Ayah 10',
    'Sourate Yasin : Ayah 30 → Ayah 40'
  ];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
