// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ayah, AyahChar } from '../models/TajweedID';


@Injectable({ providedIn: 'root' })
export class StateService {
  private ayahSelectedSubject = new Subject<AyahChar>();
  private ayahNumberSelectedSubject = new Subject<Ayah>();
//  private languageSelectedSubject = new Subject<lang>();

  ayahSelected$ = this.ayahSelectedSubject.asObservable();
  ayahNumberSelected$ = this.ayahNumberSelectedSubject.asObservable();
  
  // languageChanged$ = this.languageSelectedSubject.asObservable();

  selectAyahChar(AyahChar: AyahChar): void {
    this.ayahSelectedSubject.next(AyahChar);
  }
  resetChar(): void {
    this.ayahSelectedSubject.next(null);
  }
   resetAyah(): void {
    this.ayahNumberSelectedSubject.next(null);
  }
  selectAyah(clickedNumber : Ayah ) 
  {
    this.ayahNumberSelectedSubject.next(clickedNumber);
  }
 
}
