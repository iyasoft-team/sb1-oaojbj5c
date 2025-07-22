import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-recitation-info',
  imports: [ 
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule],
  templateUrl: './recitation-info.component.html',
  styleUrl: './recitation-info.component.css'
})
export class RecitationInfoComponent {
isRevision = false;

dummyHistory: string[] = [
  'Sourate Al-Baqara : Ayah 10 → Ayah 20',
  'Sourate Al-Kahf : Ayah 1 → Ayah 10',
  'Sourate Yasin : Ayah 30 → Ayah 40'
];
}
