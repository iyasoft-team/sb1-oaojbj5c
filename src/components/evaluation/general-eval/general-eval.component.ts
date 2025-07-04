import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-general-eval',
  imports: [MatIconModule,CommonModule],
  templateUrl: './general-eval.component.html',
  styleUrl: './general-eval.component.css'
})
export class GeneralEvalComponent {
  rating: number = 0; 
  yellow: string = '#FDDA0D';

  @Output() ratingUpdated = new EventEmitter<number>();

  getIcon(index: number): string {
    if (this.rating >= index) {
      return 'star';
    } else if (this.rating >= index - 0.5) {
      return 'star_half';
    } else {
      return 'star_border';
    }
  }

  rate(value: number): void {
    this.rating = value;
    this.ratingUpdated.emit(this.rating);
  }

}