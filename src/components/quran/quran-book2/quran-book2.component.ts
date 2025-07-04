import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuranLineComponent } from '../quran-line/quran-line.component';
import { Ayah, AyahChar, AyahTajweedData, PageLine } from '../models/TajweedID';
import { SurahNavigatorComponent } from '../shared/surah-navigator/surah-navigator.component';
import { TajweedService } from '../services/tajweed.service';
import { QuranService } from '../services/quran.service';

declare var Tajweed: any;

@Component({
  selector: 'app-quran-book2',
  imports: [CommonModule,FormsModule,QuranLineComponent,SurahNavigatorComponent],
  templateUrl: './quran-book2.component.html',
  styleUrl: './quran-book2.component.css'
})
export class QuranBook2Component {
ayahs: Ayah[] = [];
pageLines: PageLine[] = [];
parsedHtml: SafeHtml = '';
pageNumber : number = 5 ; 
surahMin : number = 1 ; 
surahMax : number = 604 ; 
@Output() OnCharClick = new EventEmitter<AyahChar>();

  constructor(private sanitizer: DomSanitizer,
              private TjwService:TajweedService,
              private QuranSrv:QuranService) {}

  ngOnInit(): void {

      this.loadSurahPage();
 
  
}
highlightedAyah: number | null = null;

  highlightAyah(ayahNumber: number) {
    this.highlightedAyah = ayahNumber;
  }
mode: 'ayah' | 'char' = 'ayah';
activeAyah: number | null = null;
ayahNotes: { [key: number]: string } = {};

toggleMode() {
  this.mode = this.mode === 'ayah' ? 'char' : 'ayah';
  this.applyModeHighlighting();
}

closeNoteModal() {
  this.activeAyah = null;
}
loadSurahPage()
{
   this.QuranSrv.loadPage(this.pageNumber).subscribe({
    next: (response: PageLine[]) => {
      let tempPagelines = response
 
      let tajweed : AyahTajweedData[];
       this.TjwService.loadTajweedAnnotations().subscribe({
                      next: data => {
                        tajweed = data;
                         tempPagelines.forEach(line=>{
                        let surahid = line.surahId;
                        this.loadTajweedIntoAyahs(tajweed,line.ayahs,surahid); 
                        this.pageLines = tempPagelines;
                          })
                      },
                      error: err => {
                        console.error('Failed to load tajweed annotations:', err);
                      }
                    });
    },
    error: (err) => {
      console.error('Failed to load ayah:', err);
    }
  });
}
applyModeHighlighting() {
  setTimeout(() => {
    document.querySelectorAll('.ayah').forEach((el: Element) => {
      el.removeEventListener('mouseenter', null);
      el.removeEventListener('click', null);

      if (this.mode === 'ayah') {
        el.addEventListener('mouseenter', () => {
          (el as HTMLElement).style.backgroundColor = '#ffe5e5';
        });
        el.addEventListener('mouseleave', () => {
          (el as HTMLElement).style.backgroundColor = '';
        });
        el.addEventListener('click', () => {
          const ayahNum = (el as HTMLElement).getAttribute('data-ayah');
          this.activeAyah = ayahNum ? +ayahNum : null;
        });
      } else {
        (el as HTMLElement).style.backgroundColor = '';
      }
    });
  }, 100);
}

loadTajweedIntoAyahs(data: AyahTajweedData[], ayahs: Ayah[],surahid:number) {

  ayahs.forEach(ayah => {
    let match = data.find(d => d.surah === surahid && d.ayah === ayah.ayahNumber);
    if (match) {
      ayah.annotations = match.annotations;
    }
  });
  
}
  decrement() {
    if (this.pageNumber > this.surahMin) {
      this.pageNumber--;
      this.loadSurahPage();

    }
  }

  increment() {
    if (this.pageNumber < this.surahMax) {
      this.pageNumber++;
      this.loadSurahPage();

    }
  }
  handleManualInput(inputValue: number) {
  const page = Math.max(this.surahMin, Math.min(inputValue, this.surahMax));
  this.pageNumber = page;
  this.loadSurahPage(); 
}
}

