import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TajweedEvalComponent } from '../../evaluation/tajweed-eval/tajweed-eval.component';
import { AyahEvalComponent } from '../../evaluation/ayah-eval/ayah-eval.component';
import { GeneralEvalComponent } from '../../evaluation/general-eval/general-eval.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { QuranBook2Component } from '../../quran/quran-book2/quran-book2.component';
import { StateService } from '../../../services/notificationService';
import { AyahChar } from '../../../models/TajweedID';
@Component({
  selector: 'app-tasmii-session',
  imports: [FormsModule,CommonModule,
            QuranBook2Component,
            TajweedEvalComponent,
            AyahEvalComponent,
            GeneralEvalComponent,MatExpansionModule,MatIconModule],
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
