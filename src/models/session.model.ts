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

export interface AyahEval {
  id?: number;          
  sessionId : string; // optional when posting
  studentId : string;
  surahNumber: number;
  ayahNumber: number;
  RecitationStatus: number;
}