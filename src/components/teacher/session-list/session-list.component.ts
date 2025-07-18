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
import { SessionDay, Status } from '../../../models/Sessions.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScheduleSessionModalComponent } from '../schedule-session/schedule-session-modal.component';
import { EditSessionDayModal } from '../sessionday-schedule/edit-session-day-modal';


@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, SurahAyahPipe,MatDialogModule,EditSessionDayModal],
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent {
  
  @Input() sessions: SessionDay[] = [];
  @Output() sessionAction = new EventEmitter<{ action: string; session: SessionDay }>();

  translations: Translation;
  
  constructor(private languageService: LanguageService,private dialog: MatDialog) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(translations => {
      this.translations = translations;
    });
  }

  get sortedSessions(): SessionDay[] {
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

  formatStatus(status: Status): string {
    switch (status) {
      case Status.PenDing: return this.translations.scheduled;
      case Status.Canceled: return this.translations.inProgress;
      case Status.Finished: return this.translations.completed;
      default: return status;
    }

    
  }

  isToday(date: Date): boolean {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

  formathours(date : Date) : number
    {
      return date?.getHours();
    }
  onStartSession(session: SessionDay): void {
    this.sessionAction.emit({ action: 'start', session });
  }

  onViewNotes(session: SessionDay): void {
    this.sessionAction.emit({ action: 'view-notes', session });
  }

  onDeleteSession(session: SessionDay): void {
    this.sessionAction.emit({ action: 'delete', session });
  }
  // formatSurahAyah(session : SessionDay)
  // {
  //   let surahName = surahs.find(s => s.number === session.startSurah).name; 
  //   return `سورة ${surahName}، الآية ${session.startAyah}`;

  // }
  onEditSession(sessionDay : SessionDay)
  {
    const dialogRef = this.dialog.open(EditSessionDayModal, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: true,
      panelClass: 'schedule-modal-panel',
      data: sessionDay
    });
  }
}