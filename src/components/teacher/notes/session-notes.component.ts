import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService, Translation } from '../../../services/language.service';
import { Session } from '../../../models/session.model';
import { SessionService } from '../../../services/session.service';



@Component({
  selector: 'app-session-notes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './session-notes.component.html',
  styleUrls: ['./session-notes.component.css']
})
export class SessionNotesComponent implements OnInit {
  translations: Translation;
  session: Session | null = null;
  notes = '';
  sessionId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private languageService: LanguageService
  ) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(translations => {
      this.translations = translations;
    });
  }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id');
    this.loadSession();
  }

  loadSession(): void {
    if (!this.sessionId) return;

    this.sessionService.getSessions().subscribe(sessions => {
      this.session = sessions.find(s => s.id === this.sessionId) || null;
      if (this.session) {
        this.notes = 'yess';
        // Start the session if it's not already in progress
        if (this.session.status === 'scheduled') {
          this.sessionService.startSession(this.session.id).subscribe();
        }
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  saveAndComplete(): void {
    if (!this.sessionId || !this.notes.trim()) return;
  }

  goBack(): void {
    this.router.navigate(['/teacher']);
  }
}