import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/user.model';
import { LanguageService, Translation } from '../../services/language.service';
import { LanguageToggleComponent } from '../shared/language-toggle.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    LanguageToggleComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  translations: Translation;
  
  credentials: LoginCredentials = {
    email: '',
    password: ''
  };

  hidePassword = true;
  errorMessage = '';

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

  onLogin(): void {
    this.errorMessage = '';
    
    this.authService.login(this.credentials).subscribe(user => {
      if (user) {
        if (user.role === 'teacher') {
          this.router.navigate(['/teacher']);
        } else if (user.role === 'student') {
          this.router.navigate(['/student']);
        }
      } else {
        this.errorMessage = this.translations.invalidCredentials;
      }
    });
  }
}