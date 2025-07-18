import { NumericLiteral } from "typescript";
import { AyahEval } from "./session.model";
import { AyahChar } from "./TajweedID";
import { Student } from "./user.model";

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
  title : string ; 
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

export interface Recitation {
  id? : number ; 
  studentId: number;
  startSurah: number;
  startAyah: number;
  scheduledSurah: number;
  scheduledAyah: number;

  startTime: string; 
  durationMinutes: number;
  status: Status; 
  sessionId: number;
  rating: number;

  ayahEvals?: AyahEval[];
  tajweedEvals?: AyahChar[];
  student? : Student;

}

