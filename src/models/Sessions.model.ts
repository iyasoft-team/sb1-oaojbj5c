import { AyahEval } from "./session.model";
import { AyahChar } from "./TajweedID";

export enum Recurrence {
  None = 'None',
  Daily = 'Daily',
  Weekly = 'Weekly',
  BiWeekly = 'BiWeekly',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Yearly = 'Yearly',
  WeekdaysOnly = 'WeekdaysOnly',
  Custom = 'Custom'
}

export interface ParticipationTemplate {
  id: number;
  studentId: number;

  // Add other fields if needed
}

export interface SessionDay {
  id: number;
  teacherId: number;
  sessionScheduleId: number;
  date: Date;
  status: Status; // Replace with enum if applicable
  isDefault: boolean;
  modifiedAt?: Date;
  modifiedBy?: string;
  participants?: any[]; // Or use a specific type if you have it
}

export interface SessionSchedule {
  id: number;
  teacherId: string;
  startDate: Date;
  endDate?: Date;
  toEndOfYear: boolean;
  recurrence: Recurrence;
  defaultParticipants: ParticipationTemplate[];
  sessionDays: SessionDay[];
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
  tajweedEvals?: AyahChar[]; //Considered as tajweedeval

}

