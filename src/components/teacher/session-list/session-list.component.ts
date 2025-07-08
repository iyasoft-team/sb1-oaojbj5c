import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Session } from '../../../models/session.model';
import { LanguageService, Translation } from '../../../services/language.service';
import { surahs } from '../../../models/Surahs';
import { SurahAyahPipe } from "../../../pipes/SurahAyahFormatter.pipe";


@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, SurahAyahPipe],
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent {
  @Input() sessions: Session[] = [];
  @Output() sessionAction = new EventEmitter<{ action: string; session: Session }>();

  translations: Translation;
  
  constructor(private languageService: LanguageService) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(translations => {
      this.translations = translations;
    });
  }

  get sortedSessions(): Session[] {
    return [...this.sessions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  formatDate(date: Date): string {
    
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatStatus(status: string): string {
    switch (status) {
      case 'scheduled': return this.translations.scheduled;
      case 'in-progress': return this.translations.inProgress;
      case 'completed': return this.translations.completed;
      case 'cancelled': return this.translations.cancelled;
      default: return status;
    }

    
  }
  formathours(date : Date) : number
    {
      return date?.getHours();
    }
  onStartSession(session: Session): void {
    this.sessionAction.emit({ action: 'start', session });
  }

  onViewNotes(session: Session): void {
    this.sessionAction.emit({ action: 'view-notes', session });
  }

  onDeleteSession(session: Session): void {
    this.sessionAction.emit({ action: 'delete', session });
  }
  formatSurahAyah(session : Session)
  {
    let surahName = surahs.find(s => s.number === session.startSurah).name; 
    return `سورة ${surahName}، الآية ${session.startAyah}`;

  }
}