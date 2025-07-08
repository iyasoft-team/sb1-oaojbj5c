import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { AuthService } from '../../../services/auth.service';
import { Session } from '../../../models/session.model';
import { CalendarComponent } from '../calendar/calendar.component';
import { NavigationComponent, MenuItem, TEACHER_MENU_ITEMS } from '../../shared/navigation/navigation.component';
import { LanguageService, Translation } from '../../../services/language.service';
import { SessionListComponent } from '../session-list/session-list.component';
import { ScheduleSessionModalComponent } from '../schedule-session/schedule-session-modal.component';

@Component({
  selector: 'app-teacher-sessions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    CalendarComponent,
    SessionListComponent
  ],
  templateUrl: './teacher-sessions.component.html',
  styleUrls: ['./teacher-sessions.component.css']
})
export class TeacherSessionsComponent implements OnInit {
  sessions: Session[] = [];
  currentUser = this.authService.getCurrentUser();
  currentView: 'calendar' | 'list' = 'list';
  sidebarCollapsed = false;
  translations: Translation;
  
  menuItems: MenuItem[] = [...TEACHER_MENU_ITEMS];

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private languageService: LanguageService
  ) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(translations => {
      this.translations = translations;
      this.updateMenuLabels();
    });
    this.updateMenuLabels();
  }

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    if (this.currentUser) {
      this.sessionService.getTeacherSessions(this.currentUser.id).subscribe(sessions => {
        this.sessions = sessions;
      });
    }
  }

  private updateMenuLabels(): void {
    this.menuItems[0].label = this.translations.dashboard;
    this.menuItems[1].label = this.translations.sessions;
    this.menuItems[2].label = this.translations.students;
    this.menuItems[3].label = this.translations.reports;
    this.menuItems[4].label = this.translations.settings;
  }

  setView(view: 'calendar' | 'list'): void {
    this.currentView = view;
  }

  openScheduleModal(): void {
    const dialogRef = this.dialog.open(ScheduleSessionModalComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: true,
      panelClass: 'schedule-modal-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Reload sessions if a new session was created
        this.loadSessions();
      }
    });
  }

  onSessionAction(event: { action: string; session: Session }): void {
    if (event.action === 'start') {
      this.router.navigate(['/teacher/session', event.session.id]);
    }
    else if (event.action === 'start')
    {

    }
    else if (event.action === 'delete')
    {
      this.sessionService.DeleteSession(event.session.id).subscribe(result => {
        this.loadSessions();     
    });
    }
  }

  onMenuClick(item: MenuItem): void {
    // Update active state
    this.menuItems.forEach(menuItem => menuItem.active = false);
    const clickedItem = this.menuItems.find(menuItem => menuItem.id === item.id);
    if (clickedItem) {
      clickedItem.active = true;
    }

    // Handle navigation
    switch (item.id) {
      case 'dashboard':
        // Already on dashboard
        break;
      case 'sessions':
        // Future: Navigate to sessions management
        break;
      case 'students':
        // Future: Navigate to students management
        break;
      case 'reports':
        // Future: Navigate to reports
        break;
      case 'settings':
        // Future: Navigate to settings
        break;
    }
  }

  onSidebarToggle(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }
}