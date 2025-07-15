import { NumericLiteral } from "typescript";
import { AyahEval } from "./session.model";
import { AyahChar } from "./TajweedID";

export enum Recurrence {
  None = 0,
  Daily = 1,
  Weekly = 2,
  Monthly = 3,
  Yearly = 4,
  Custom = 5
}

export interface ParticipationTemplate {
  studentId: number;
  durationMinutes:number ;
  startTime : Date ; 
  startTimeNumber? : number ;
  duration? : number ;
}

export interface SessionDay {
  id: number;
  teacherId: number;
  sessionScheduleId: number;
  date: Date;
  status: Status; 
  isDefault: boolean;
  modifiedAt?: Date;
  modifiedBy?: string;
  participants?: any[]; 
}

export interface SessionSchedule {
  id?: string;
  teacherId: string;
  startDate: Date;
  endDate?: Date;
  toEndOfYear: boolean;
  Recurrence: Recurrence;
  defaultParticipants?: ParticipationTemplate[];
  sessionDays? : SessionDay[];
}
 export enum Status
 {
     PenDing,
     Finished,  
     Canceled
 }

export interface Tasmii {
  id: number;
  studentId: number;
  participationId: number;
  rating: number;
  startSurah : number;
  startAyah : number;
  scheduledSurah : number;
  scheduledAyah : number;
  ayahEvals?: AyahEval[];
  tajweedEvals?: AyahChar[]; 

}

