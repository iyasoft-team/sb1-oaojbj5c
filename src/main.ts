import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TeacherSessionsComponent } from './components/teacher/sessions-main/teacher-sessions.component';
import { StudentDashboardComponent } from './components/student/student-dashboard.component';
import { LanguageService } from './services/language.service';
import { TasmiiSessionComponent } from './components/tasmii/tasmii-session/tasmii-session.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AuthInterceptor } from './services/auth.interceptor';
import { DateInterceptor } from './services/date.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  templateUrl:'./main.component.html',
  styleUrl : './main.component.css'
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
      this.isLoginPage = event.url === '/login';
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
        { id: 'dashboard', label: 'Dashboard', arabicLabel: 'لوحة التحكم', icon: 'dashboard' },
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
    //console.log('Menu clicked:', item);
    this.menuItems.forEach((item)=>{item.active = false})
    item.active = true;
    this.router.navigate([this.authService.getCurrentUser().role+'/'+item.id]);
  }

  onSidebarToggle(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }
}

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'teacher/sessions', 
    component: TeacherSessionsComponent,
    /*canActivate: [AuthGuard]*/
  },
  { 
    path: 'teacher/session/:id', 
    component: TasmiiSessionComponent,
     /*canActivate: [AuthGuard]*/
  },
  { 
    path: 'student', 
    component: StudentDashboardComponent,
     /*canActivate: [AuthGuard]*/
  },
  { path: '**', redirectTo: '/teacher/sessions' }
];

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(MatDatepickerModule, MatNativeDateModule),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true
    }
    
  ]
});