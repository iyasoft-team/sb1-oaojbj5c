import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard.component';
import { SessionNotesComponent } from './components/teacher/session-notes.component';
import { StudentDashboardComponent } from './components/student/student-dashboard.component';
import { LanguageService } from './services/language.service';
import { TasmiiSessionComponent } from './components/tasmii/tasmii-session/tasmii-session.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { AuthService } from './services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  template: `
    <div class="app-container" [dir]="currentLanguage === 'ar' ? 'rtl' : 'ltr'">
      <app-navigation 
        *ngIf="showNavigation"
        [menuItems]="menuItems" 
        [isCollapsed]="sidebarCollapsed"
        (menuClick)="onMenuClick($event)"
        (toggleCollapse)="onSidebarToggle($event)">
      </app-navigation>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
  `]
})
export class App {
  currentLanguage: 'fr' | 'en' | 'ar' = 'fr';
  showNavigation = false;
  sidebarCollapsed = false;
  menuItems: any[] = [];
  isLoginPage = false;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      // Update document direction for RTL support
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    });

    // Listen to route changes to determine if we're on login page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage = event.url === '/login' || event.url === '/';
      this.updateNavigationVisibility();
    });

    // Check authentication status and set navigation visibility
    this.authService.currentUser$.subscribe(user => {
      this.updateNavigationVisibility();
      if (user) {
        this.setMenuItems(user.role);
      }
    });
  }

  private updateNavigationVisibility(): void {
    const user = this.authService.getCurrentUser();
    this.showNavigation = !!user && !this.isLoginPage;
  }

  private setMenuItems(role: string): void {
    if (role === 'teacher') {
      this.menuItems = [
        { id: 'dashboard', label: 'Dashboard', arabicLabel: 'لوحة التحكم', icon: 'dashboard', active: true },
        { id: 'sessions', label: 'Sessions', arabicLabel: 'الجلسات', icon: 'event' },
        { id: 'students', label: 'Students', arabicLabel: 'الطلاب', icon: 'people' },
        { id: 'reports', label: 'Reports', arabicLabel: 'التقارير', icon: 'assessment' },
        { id: 'settings', label: 'Settings', arabicLabel: 'الإعدادات', icon: 'settings' }
      ];
    } else if (role === 'student') {
      this.menuItems = [
        { id: 'dashboard', label: 'Dashboard', arabicLabel: 'لوحة التحكم', icon: 'dashboard', active: true },
        { id: 'sessions', label: 'My Sessions', arabicLabel: 'جلساتي', icon: 'event' },
        { id: 'progress', label: 'Progress', arabicLabel: 'التقدم', icon: 'trending_up' },
        { id: 'assignments', label: 'Assignments', arabicLabel: 'الواجبات', icon: 'assignment' }
      ];
    }
  }

  onMenuClick(item: any): void {
    // Handle menu navigation
    console.log('Menu clicked:', item);
  }

  onSidebarToggle(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }
}

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'teacher', 
    component: TeacherDashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'teacher/session/:id', 
    component: TasmiiSessionComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'student', 
    component: StudentDashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    AuthGuard
  ]
});