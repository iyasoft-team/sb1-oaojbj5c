export interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher' | 'student';
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}