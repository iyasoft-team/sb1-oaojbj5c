import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { StateService } from '../../../services/notificationService';

@Component({
  selector: 'app-ayah-eval',
  imports: [MatRadioModule, FormsModule, CommonModule],
  templateUrl: './ayah-eval.component.html',
  styleUrl: './ayah-eval.component.css'
})
export class AyahEvalComponent {
  constructor(private sharedService: StateService) { }
  recitationErrors: string[] = [
    "Récitation correcte",
    "Récitation modeste",
    "Ne connaît pas cette āyah",
    "Récitation incorrecte"
  ];
  private sub: Subscription;
  selectedAyahNumber : number = 0 ; ; 
  selectedError: string = '';
  ngOnInit()
  {
     this.sub = this.sharedService.ayahNumberSelected$.subscribe(ayahnumber => {
      this.selectedAyahNumber = ayahnumber;
     })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
