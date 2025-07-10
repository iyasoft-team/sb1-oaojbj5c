import { Student } from "./user.model";

export class Session {
  id: string;
  teacherId: string;
  studentId: string;
  teacherName?: string;
  student?:Student;
  date?:Date;
  startDate: Date;
  endDate: Date;
  startSurah: number;
  startAyah: number;
  topic?: string;
  notes?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface SessionNote {
  sessionId: string;
  content: string;
  timestamp: Date;
}

export class AyahEval {
  id?: number;          
  sessionId : string; // optional when posting
  studentId : string;
  surahNumber: number;
  ayahNumber: number;
  RecitationStatus: number;
}
export class TassmiiSession {
  teacherId!: string;
  classroomId!: string;
  startDate!: Date;
  timeSlotType!: TimeSlotType;
  timeslotValue: number;
  endDate!: Date;
  recurrence!: Recurrence;

}
export enum TimeSlotType {
  Fixed = "Fixed",
  Variable = "Variable"
}

export enum Recurrence {
  None = 'None',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly',
}