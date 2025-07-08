import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { StateService } from '../../../services/notificationService';
import { Ayah } from '../../../models/TajweedID';

@Component({
  selector: 'app-ayah-eval',
  imports: [MatRadioModule, FormsModule, CommonModule],
  templateUrl: './ayah-eval.component.html',
  styleUrl: './ayah-eval.component.css'
})
export class AyahEvalComponent {
  constructor(private sharedService: StateService) { }
 recitationErrors = [
  { id: 1, label: "Récitation correcte" },
  { id: 2, label: "Récitation modeste" },
  { id: 3, label: "Ne connaît pas cette āyah" },
  { id: 4, label: "Récitation incorrecte" }
];
  private sub: Subscription;
  selectedAyah : Ayah  ;
  selectedError: any ;
  ngOnInit()
  {
     this.sub = this.sharedService.ayahNumberSelected$.subscribe(ayahnumber => {
      this.selectedAyah = ayahnumber;
      if(!ayahnumber)
        this.selectedError = null
     })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRecitationErrorChange(event: any): void {
  if (this.selectedAyah) {
    this.selectedAyah.ayahEval = {
      ...this.selectedAyah.ayahEval,
      RecitationStatus: this.selectedError.id // or map severity if separate
    };
    console.log(this.selectedAyah);
  }
}

}
