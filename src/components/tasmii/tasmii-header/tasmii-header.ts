import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RecitationInfoComponent } from '../tasmii-informations/recitation-Info/recitation-info.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TasmiiHomework } from '../tasmii-informations/tasmii-homework/tasmii-homework';

@Component({
  selector: 'app-tasmii-header',
  imports: [
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    RecitationInfoComponent,
    TasmiiHomework,
    MatDialogModule
  ],
  standalone : true ,
  templateUrl: './tasmii-header.html',
  styleUrl: './tasmii-header.css'
})
export class TasmiiHeader {

   studentName: string = "Nom de l'étudiant";
    isRevision: boolean = false;
    constructor(private dialog: MatDialog) {}

openModalHomework() {
  const dialogRef = this.dialog.open(TasmiiHomework, {
    width: '500px',
    data: {
      surah: 'Al-Fatiha'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Homework:', result);
    }
  });
}
}
