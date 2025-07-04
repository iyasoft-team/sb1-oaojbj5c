import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <button 
      mat-icon-button 
      (click)="toggleLanguage()" 
      class="language-toggle-btn"
      [matTooltip]="getTooltipText()"
    >
      <mat-icon>{{ currentLanguage === 'fr' ? 'translate' : 'translate' }}</mat-icon>
      <span class="language-text">{{ getLanguageDisplayText() }}</span>
    </button>
  `,
  styles: [`
    .language-toggle-btn {
      position: relative !important;
      width: 44px !important;
      height: 44px !important;
      background: rgba(15, 76, 117, 0.05) !important;
      border: 2px solid rgba(15, 76, 117, 0.2) !important;
      border-radius: 50% !important;
      transition: all 0.3s ease !important;
      color: #0f4c75 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
    }

    .language-toggle-btn:hover {
      background: rgba(15, 76, 117, 0.1) !important;
      border-color: rgba(15, 76, 117, 0.4) !important;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(15, 76, 117, 0.2) !important;
    }

    .language-toggle-btn mat-icon {
      position: absolute;
      font-size: 18px !important;
      width: 18px !important;
      height: 18px !important;
      color: #0f4c75 !important;
      opacity: 0.6;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      line-height: 1 !important;
    }

    .language-text {
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px !important;
      font-weight: 700 !important;
      color: #0f4c75 !important;
      letter-spacing: 0.5px;
      line-height: 1;
    }

    /* Dark theme support */
    .language-toggle-btn.on-dark {
      background: rgba(255, 255, 255, 0.1) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
      color: white !important;
    }

    .language-toggle-btn.on-dark:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.5) !important;
    }

    .language-toggle-btn.on-dark mat-icon,
    .language-toggle-btn.on-dark .language-text {
      color: white !important;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .language-toggle-btn {
        width: 40px !important;
        height: 40px !important;
      }

      .language-toggle-btn mat-icon {
        font-size: 16px !important;
        width: 16px !important;
        height: 16px !important;
        top: 5px;
      }

      .language-text {
        font-size: 9px !important;
        bottom: 3px;
      }
    }

    @media (max-width: 480px) {
      .language-toggle-btn {
        width: 36px !important;
        height: 36px !important;
      }

      .language-toggle-btn mat-icon {
        font-size: 14px !important;
        width: 14px !important;
        height: 14px !important;
        top: 4px;
      }

      .language-text {
        font-size: 8px !important;
        bottom: 2px;
      }
    }
  `]
})
export class LanguageToggleComponent {
  currentLanguage: 'fr' | 'en' | 'ar' = 'fr';

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe((lang: 'fr' | 'en' | 'ar') => {
      this.currentLanguage = lang;
    });
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  getLanguageDisplayText(): string {
    const nextLang = this.languageService.getNextLanguage();
    switch (nextLang) {
      case 'fr': return 'FR';
      case 'en': return 'EN';
      case 'ar': return 'ع';
      default: return 'FR';
    }
  }

  getTooltipText(): string {
    const nextLang = this.languageService.getNextLanguage();
    switch (nextLang) {
      case 'fr': return 'Passer au français';
      case 'en': return 'Switch to English';
      case 'ar': return 'التبديل إلى العربية';
      default: return 'Passer au français';
    }
  }
}