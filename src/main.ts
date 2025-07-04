import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard.component';
import { SessionNotesComponent } from './components/teacher/session-notes.component';
import { StudentDashboardComponent } from './components/student/student-dashboard.component';
import { LanguageService } from './services/language.service';
import { TasmiiSessionComponent } from './components/tasmii/tasmii-session/tasmii-session.component';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,],
  template: `
    <div class="app-container" [dir]="currentLanguage === 'ar' ? 'rtl' : 'ltr'">
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

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      // Update document direction for RTL support
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    });
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