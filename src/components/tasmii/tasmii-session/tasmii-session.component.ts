import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuranBook2Component } from '../../quran-book2/quran-book2.component';
import { TajweedEvalComponent } from '../../evaluation/tajweed-eval/tajweed-eval.component';
import { AyahChar } from '../../models/TajweedID';
import { StateService } from '../../services/notificationService';
import { AyahEvalComponent } from '../../evaluation/ayah-eval/ayah-eval.component';
import { GeneralEvalComponent } from '../../evaluation/general-eval/general-eval.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-tasmii-session',
  imports: [FormsModule,CommonModule,QuranBook2Component,TajweedEvalComponent,AyahEvalComponent,GeneralEvalComponent,MatExpansionModule,MatIconModule],
  templateUrl: './tasmii-session.component.html',
  styleUrl: './tasmii-session.component.css'
})
export class TasmiiSessionComponent {
/**
 *
 */
constructor(private sharedService: StateService) {

}

selectedchar : AyahChar;
  OnCharClick(char:AyahChar){
  this.selectedchar = char;
  console.log(char);
  }

 reset():void
 {
//this.sharedService.reset()
 }
 
 
}
