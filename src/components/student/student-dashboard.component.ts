import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { Session } from '../../models/session.model';
import { NavigationComponent, MenuItem, STUDENT_MENU_ITEMS } from '../shared/navigation/navigation.component';
import { LanguageService, Translation } from '../../services/language.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, NavigationComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  sessions: Session[] = [];
  currentUser = this.authService.getCurrentUser();
  sidebarCollapsed = false;
  translations: Translation;
  
  menuItems: MenuItem[] = [...STUDENT_MENU_ITEMS];

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router,
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
      this.sessionService.getStudentSessions(this.currentUser.id).subscribe(sessions => {
        this.sessions = sessions;
      });
    }
  }

  get upcomingSessions(): Session[] {
    const now = new Date();
    return this.sessions
      .filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= now && ['scheduled', 'in-progress'].includes(session.status);
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  get completedSessions(): Session[] {
    return this.sessions
      .filter(session => session.status === 'completed')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3); // Show last 3 completed sessions
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

  getStatusIcon(status: string): string {
    switch (status) {
      case 'scheduled': return 'schedule';
      case 'in-progress': return 'play_circle';
      case 'completed': return 'check_circle';
      case 'cancelled': return 'cancel';
      default: return 'help';
    }
  }

  getTimeUntilSession(session: Session): string {
    const now = new Date();
    const sessionDate = new Date(session.date);
    const timeDiff = sessionDate.getTime() - now.getTime();
    
    if (timeDiff < 0) return '';
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} ${this.translations.daysAway}`;
    } else if (hours > 0) {
      return `${hours} ${this.translations.hoursAway}`;
    } else {
      return this.translations.startingSoon;
    }
  }

  private updateMenuLabels(): void {
    this.menuItems[0].label = this.translations.dashboard;
    this.menuItems[1].label = this.translations.mySessions;
    this.menuItems[2].label = this.translations.progress;
    this.menuItems[3].label = this.translations.assignments;
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
        // Future: Navigate to sessions view
        break;
      case 'progress':
        // Future: Navigate to progress tracking
        break;
      case 'assignments':
        // Future: Navigate to assignments
        break;
    }
  }

  onSidebarToggle(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }
}