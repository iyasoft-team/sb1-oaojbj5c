import { Pipe, PipeTransform } from "@angular/core";
import { Session } from "../models/session.model";
import { surahs } from "../models/Surahs";

@Pipe({ name: 'surahAyah' })
export class SurahAyahPipe implements PipeTransform {
  transform(session: Session): string {
    const surah = surahs.find(s => s.number === session.startSurah);
    return `سورة ${surah?.name ?? ''}، الآية ${session.startAyah}`;
  }
}
