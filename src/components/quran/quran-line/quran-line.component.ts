import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Ayah, AyahChar, PageLine, TajweedAnnotation, TajweedRule } from '../../../models/TajweedID';
import { StateService } from '../../../services/notificationService';

@Component({
  selector: 'app-quran-line',
  templateUrl: './quran-line.component.html',
  imports:[FormsModule,CommonModule],
  styleUrls: ['./quran-line.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuranLineComponent {
   @Input() line: PageLine; // expects one line from the JSON
    @Input() highlightedAyah: number | null = null;
    @Output() ayahClicked = new EventEmitter<number>();
    OnAyahNumberClick(char: any) {
    this.ayahClicked.emit(char.ayahNumber); // adjust if needed
  }
   highlight(ayahNumber: Ayah) {
    //this.sharedService.resetAyah()
    this.ayahClicked.emit(ayahNumber.ayahNumber); 
    this.sharedService.selectAyah(ayahNumber)
    this.sharedService.resetChar();
  }
    html: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer , private sharedService: StateService) {}
ngOnInit(): void {

  }
  splitAyahChars(ayah: Ayah, line: PageLine): AyahChar[] {
  const charsList: AyahChar[] = [];
  const words = ayah.text2.split(' ');
  let wordIndex = ayah.startWordIndex ?? 0;
  let pendingRule: TajweedAnnotation | null = null;
  ayah.surahid = line.surahId;
  for (const word of words) {
    const chars = [...word];

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const rule = ayah.annotations?.find(
        ann => ann.wordIndex === wordIndex && (ann.start === i || ann.end === i)
      );

      const activeRule = (pendingRule && pendingRule.wordIndex !== wordIndex) ? pendingRule : rule;
      
      const ruleClass = activeRule ? this.getTajweedClass(activeRule.rule) : '';

      charsList.push({
        char,
        index: i,
        word: wordIndex,
        text: word,
        ruleClass : ruleClass,
        isTajweed: activeRule ? true : false,
        ayah: ayah.ayahNumber,
        surah: line.surahId,
        page: line.pageNumber,
        rule: activeRule?.rule || '',
      });

      pendingRule = (rule && rule.end < rule.start) ? rule : null;
    }

    // Add space between words
    charsList.push({
      char: ' ',
      index: -1,
      word: wordIndex,
      ruleClass: '',
      isTajweed: false,
      ayah: ayah.ayahNumber,
      surah: line.surahId,
      page: line.pageNumber,
      rule: '',
      text: '',
    });

    wordIndex++;
  }

  return charsList;
}
getTajweedClass(rule: TajweedRule): string {
  switch (rule) {
    case TajweedRule.HamzatWasl:
      return 'hamzat_wasl';
    case TajweedRule.LamShamsiyyah:
      return 'lam_shamsiyyah';
    case TajweedRule.Silent:
      return 'silent';
    case TajweedRule.Madda2:
      return 'madd_2';
    case TajweedRule.Madda246:
      return 'madd_246';
    case TajweedRule.Qalaqah:
      return 'qalaqah';
    case TajweedRule.Ghunnah:
      return 'ghunnah';
    case TajweedRule.Ikhafa:
      return 'ikhafa';
  }
}

OnCharClick(char:AyahChar){
  if(char.isTajweed)
    this.sharedService.selectAyahChar(char);
  }

}