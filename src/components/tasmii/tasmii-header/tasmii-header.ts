import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RecitationInfoComponent } from '../tasmii-informations/recitation-Info/recitation-info.component';

@Component({
  selector: 'app-tasmii-header',
  imports: [
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    RecitationInfoComponent
  ],
  templateUrl: './tasmii-header.html',
  styleUrl: './tasmii-header.css'
})
export class TasmiiHeader {

   studentName: string = "Nom de l'étudiant";
    isRevision: boolean = false;

}
