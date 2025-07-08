import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TajweedEvalComponent } from '../../evaluation/tajweed-eval/tajweed-eval.component';
import { AyahEvalComponent } from '../../evaluation/ayah-eval/ayah-eval.component';
import { GeneralEvalComponent } from '../../evaluation/general-eval/general-eval.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { QuranBook2Component } from '../../quran/quran-book2/quran-book2.component';
import { StateService } from '../../../services/notificationService';
import { AyahChar } from '../../../models/TajweedID';
import { NavigationComponent, MenuItem, TEACHER_MENU_ITEMS } from '../../shared/navigation/navigation.component';
import { AuthService } from '../../../services/auth.service';
import { LanguageService, Translation } from '../../../services/language.service';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AyahEval, Session } from '../../../models/session.model';
import { SessionService } from '../../../services/session.service';
import { MatButtonModule } from '@angular/material/button';
import { AyahEvalService } from '../../../services/ayahEval.service';


@Component({
  selector: 'app-tasmii-session',
  imports: [FormsModule,CommonModule,
            QuranBook2Component,
            TajweedEvalComponent,
            AyahEvalComponent,
            GeneralEvalComponent,MatExpansionModule,MatIconModule,MatButtonModule],
  templateUrl: './tasmii-session.component.html',
  styleUrl: './tasmii-session.component.css'
})
export class TasmiiSessionComponent {
  
  @ViewChild(QuranBook2Component)
  quranBook2Component!: QuranBook2Component;
  public sidebarCollapsed = false;
  translations: Translation;
  currentUser = this.authService.getCurrentUser();
  menuItems: MenuItem[] = [...TEACHER_MENU_ITEMS];
  student: Student | null = null;
  session : Session | null = null;
  constructor(
    private sharedService: StateService,
    private authService: AuthService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private sessionService : SessionService,

    private ayahEvalService : AyahEvalService ,

     private router: Router
  ) {
    this.translations = this.languageService.getTranslations();
    this.languageService.translations$.subscribe(translations => {
      this.translations = translations;
      this.updateMenuLabels();
    });
    this.updateMenuLabels();
  }

  selectedchar: AyahChar;
  ngOnInit() {
  let sessionid = this.route.snapshot.paramMap.get('id')
    this.sessionService.getSession(sessionid).subscribe(
      result => {
      this.session = result
      });
  }
  OnCharClick(char:AyahChar){
    this.selectedchar = char;
    console.log(char);
  }

  reset(): void {
    //this.sharedService.reset()
  }

  private updateMenuLabels(): void {
    this.menuItems[0].label = this.translations.dashboard;
    this.menuItems[1].label = this.translations.sessions;
    this.menuItems[2].label = this.translations.students;
    this.menuItems[3].label = this.translations.reports;
    this.menuItems[4].label = this.translations.settings;
  }

  onMenuClick(item: MenuItem): void {
    // Update active state
    this.menuItems.forEach(menuItem => menuItem.active = false);
    const clickedItem = this.menuItems.find(menuItem => menuItem.id === item.id);
    if (clickedItem) {
      clickedItem.active = true;
    }
  }

  onSidebarToggle(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }

  Save():void
  { 
    let ayahevals:AyahEval[] = []
    const ayahs = this.quranBook2Component.pageLines.flatMap(line => line.ayahs);
    ayahs.forEach(element => {
      
      if(element.ayahEval)
      {
        element.ayahEval.surahNumber = element.surahid;
        element.ayahEval.sessionId = this.session.id;
        element.ayahEval.studentId = this.session.student.id.toString();
        element.ayahEval.ayahNumber = element.ayahNumber;
        ayahevals.push(element.ayahEval) ;
      }
    });

    this.ayahEvalService.postMultiple(ayahevals).subscribe();
    this.session.status = "completed"

    this.sessionService.completeSession(this.session.id).subscribe();
   
    this.router.navigate(['/teacher/sessions']);
}

}
