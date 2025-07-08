import { AyahEval } from "./session.model";

export class TajweedInfo{
    surah : number ;
    ayah : number ;
    tajweedRuleOcc : number ; 
}
export enum TajweedRule {
  HamzatWasl = 'hamzat_wasl',
  LamShamsiyyah = 'lam_shamsiyyah',
  Silent = 'silent',
  Ghunnah = 'ghunnah',
  Qalaqah = 'qalaqah',
  Ikhafa = 'ikhafa',
  Madda2 = 'madd_2',
  Madda246 = 'madd_246'
}
export class TajweedAnnotation {
  wordIndex: number;       // word index (0-based)
  start: number;      // start index within the word
  end: number;        // end index within the word
  rule: TajweedRule;  // rule type as enum or string
}
export class AyahTajweedData {
  surah :  number;
  ayah : number
  cleanedText: string;                // Full cleaned ayah text
  annotations: TajweedAnnotation[];  // Word-based annotations
}

export class Ayah
{
    surahid? : number;
    ayahNumber : number;
    text:string;
    isEnd:boolean;
    text2 : string;
    startWordIndex : number;
    wordCount : number;
    annotations?: TajweedAnnotation[] = []; 
    ayahEval? : AyahEval;
}
export class PageLine
  {
    id: number;
    page: number;
    chapter: number;
    lineText: string;
    lineNumber: number;
    hizb: number;
    surahName : string;
    lineTextClean: string;
    ayahs: Ayah[];
    surahId: number;
  }

  export class AyahChar {
  char: string;
  index: number;
  word: number;
  ruleClass?: string;
  isTajweed: boolean;
  ayah:number;
  surah:number;
  page:number;
  rule : string;
  text:string;
}

export class TajweedRuleInfo {
  type : string ; 
  Name: string;
  description: string;
  possible_errors: string[];
}

