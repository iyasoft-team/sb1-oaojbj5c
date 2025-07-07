import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LanguageService, Translation } from '../../../services/language.service';
import { LanguageToggleComponent } from '../language-toggle.component';

export interface MenuItem {
  id: string;
  label: string;
  arabicLabel: string;
  icon: string;
  route?: string;
  action?: string;
  active?: boolean;
}

export const TEACHER_MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: '',
    arabicLabel: 'لوحة التحكم',
    icon: 'dashboard',
    route: '/teacher',
    active: true
  },
  {
    id: 'sessions',
    label: '',
    arabicLabel: 'الجلسات',
    icon: 'event'
  },
  {
    id: 'students',
    label: '',
    arabicLabel: 'الطلاب',
    icon: 'people'
  },
  {
    id: 'reports',
    label: '',
    arabicLabel: 'التقارير',
    icon: 'assessment'
  },
  {
    id: 'settings',
    label: '',
    arabicLabel: 'الإعدادات',
    icon: 'settings'
  }
];

export const STUDENT_MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: '',
    arabicLabel: 'لوحة التحكم',
    icon: 'dashboard',
    route: '/student',
    active: true
  },
  {
    id: 'sessions',
    label: '',
    arabicLabel: 'جلساتي',
    icon: 'event'
  },
  {
    id: 'progress',
    label: '',
    arabicLabel: 'التقدم',
    icon: 'trending_up'
  },
  {
    id: 'assignments',
    label: '',
    arabicLabel: 'الواجبات',
    icon: 'assignment'
  }
];

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, LanguageToggleComponent],
  templateUrl:'./navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() isCollapsed = false;
  @Output() menuClick = new EventEmitter<MenuItem>();
  @Output() toggleCollapse = new EventEmitter<boolean>();

  translations: Translation;
  currentUser = this.authService.getCurrentUser();

  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(translations => {
      this.translations = translations;
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleCollapse.emit(this.isCollapsed);
  }

  onMenuClick(item: MenuItem): void {
    this.menuClick.emit(item);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}