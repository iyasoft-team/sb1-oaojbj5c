// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AyahChar } from '../models/TajweedID';
import { lang } from '../models/lang.enum';

@Injectable({ providedIn: 'root' })
export class StateService {
  private ayahSelectedSubject = new Subject<AyahChar>();
  private ayahNumberSelectedSubject = new Subject<number>();
  private languageSelectedSubject = new Subject<lang>();

  ayahSelected$ = this.ayahSelectedSubject.asObservable();
  ayahNumberSelected$ = this.ayahNumberSelectedSubject.asObservable();
  languageChanged$ = this.languageSelectedSubject.asObservable();

  selectAyah(AyahChar: AyahChar): void {
    this.ayahSelectedSubject.next(AyahChar);
  }
  reset(): void {
    this.ayahSelectedSubject.next(null);
  }
  selectAyahNumber(clickedNumber : number ) 
  {
    this.ayahNumberSelectedSubject.next(clickedNumber);
  }
 
}
