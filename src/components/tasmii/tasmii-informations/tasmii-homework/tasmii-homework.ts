import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tasmii-homework',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './tasmii-homework.html',
  styleUrl: './tasmii-homework.css'
})
export class TasmiiHomework {
  surahs = [
    { name: 'Al-Fatiha', ayahs: 7 },
    { name: 'Al-Baqara', ayahs: 286 },
    { name: 'Yasin', ayahs: 83 }
    // Add more as needed
  ];

  selectedSurah = this.surahs[0];
  selectedStart: number | null = null;
  selectedEnd: number | null = null;
  ayahList: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<TasmiiHomework>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.setAyahList(this.selectedSurah.ayahs);
  }

  onSurahChange() {
    this.setAyahList(this.selectedSurah.ayahs);
    this.selectedStart = null;
    this.selectedEnd = null;
  }

  setAyahList(total: number) {
    this.ayahList = Array.from({ length: total }, (_, i) => i + 1);
  }

  selectAyah(ayah: number) {
    if (this.selectedStart === null || ayah < this.selectedStart) {
      this.selectedStart = ayah;
      this.selectedEnd = ayah;
    } else {
      this.selectedEnd = ayah;
    }
  }

  isSelected(ayah: number): boolean {
    return (
      this.selectedStart !== null &&
      this.selectedEnd !== null &&
      ayah >= this.selectedStart &&
      ayah <= this.selectedEnd
    );
  }

  confirm() {
    this.dialogRef.close({
      surah: this.selectedSurah.name,
      start: this.selectedStart,
      end: this.selectedEnd
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}