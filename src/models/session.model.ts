export interface Session {
  id: string;
  teacherId: string;
  studentId: string;
  teacherName: string;
  studentName: string;
  date: Date;
  startTime: string;
  endTime: string;
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