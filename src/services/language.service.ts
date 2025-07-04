import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translation {
  // Login
  loginTitle: string;
  loginSubtitle: string;
  loginArabicSubtitle: string;
  email: string;
  password: string;
  signIn: string;
  demoCredentials: string;
  teacher: string;
  student: string;
  invalidCredentials: string;

  // Navigation
  dashboard: string;
  sessions: string;
  students: string;
  reports: string;
  settings: string;
  profile: string;
  logout: string;
  mySessions: string;
  progress: string;
  assignments: string;

  // Dashboard
  welcome: string;
  teacherDashboard: string;
  studentDashboard: string;
  scheduleSession: string;
  upcomingSessions: string;
  recentCompletedSessions: string;
  noUpcomingSessions: string;
  noSessionsMessage: string;
  calendarView: string;
  sessionList: string;

  // Sessions
  generalSession: string;
  with: string;
  scheduled: string;
  inProgress: string;
  completed: string;
  cancelled: string;
  startSession: string;
  viewNotes: string;
  teacherNotes: string;
  sessionNotes: string;
  saveComplete: string;
  cancel: string;

  // Schedule Modal
  scheduleNewSession: string;
  selectStudent: string;
  topic: string;
  sessionDate: string;
  startTime: string;
  endTime: string;

  // Time
  daysAway: string;
  hoursAway: string;
  startingSoon: string;

  // Common
  main: string;
  account: string;
  loading: string;
  save: string;
  close: string;
  edit: string;
  delete: string;
  add: string;
  search: string;
  filter: string;
  sort: string;
  export: string;
  import: string;
  refresh: string;
  back: string;
  next: string;
  previous: string;
  submit: string;
  reset: string;
  clear: string;
  confirm: string;
  yes: string;
  no: string;
}

const FRENCH_TRANSLATIONS: Translation = {
  // Login
  loginTitle: 'École du Coran',
  loginSubtitle: 'Système de Gestion de l\'École du Coran',
  loginArabicSubtitle: '',
  email: 'Email',
  password: 'Mot de passe',
  signIn: 'Se connecter',
  demoCredentials: 'Identifiants de démonstration',
  teacher: 'Professeur',
  student: 'Étudiant',
  invalidCredentials: 'Email ou mot de passe invalide',

  // Navigation
  dashboard: 'Tableau de bord',
  sessions: 'Sessions',
  students: 'Étudiants',
  reports: 'Rapports',
  settings: 'Paramètres',
  profile: 'Profil',
  logout: 'Déconnexion',
  mySessions: 'Mes sessions',
  progress: 'Progrès',
  assignments: 'Devoirs',

  // Dashboard
  welcome: 'Bienvenue',
  teacherDashboard: 'Tableau de bord Professeur',
  studentDashboard: 'Tableau de bord Étudiant',
  scheduleSession: 'Planifier une session',
  upcomingSessions: 'Vos prochaines sessions',
  recentCompletedSessions: 'Sessions récemment terminées',
  noUpcomingSessions: 'Aucune session à venir',
  noSessionsMessage: 'Votre professeur planifiera des sessions pour vous',
  calendarView: 'Vue calendrier',
  sessionList: 'Liste des sessions',

  // Sessions
  generalSession: 'Session générale',
  with: 'avec',
  scheduled: 'Planifiée',
  inProgress: 'En cours',
  completed: 'Terminée',
  cancelled: 'Annulée',
  startSession: 'Commencer la session',
  viewNotes: 'Voir les notes',
  teacherNotes: 'Notes du professeur',
  sessionNotes: 'Notes de session',
  saveComplete: 'Sauvegarder et terminer',
  cancel: 'Annuler',

  // Schedule Modal
  scheduleNewSession: 'Planifier une nouvelle session',
  selectStudent: 'Sélectionner un étudiant',
  topic: 'Sujet',
  sessionDate: 'Date de la session',
  startTime: 'Heure de début',
  endTime: 'Heure de fin',

  // Time
  daysAway: 'jour(s) restant(s)',
  hoursAway: 'heure(s) restante(s)',
  startingSoon: 'Commence bientôt',

  // Common
  main: 'Principal',
  account: 'Compte',
  loading: 'Chargement',
  save: 'Sauvegarder',
  close: 'Fermer',
  edit: 'Modifier',
  delete: 'Supprimer',
  add: 'Ajouter',
  search: 'Rechercher',
  filter: 'Filtrer',
  sort: 'Trier',
  export: 'Exporter',
  import: 'Importer',
  refresh: 'Actualiser',
  back: 'Retour',
  next: 'Suivant',
  previous: 'Précédent',
  submit: 'Soumettre',
  reset: 'Réinitialiser',
  clear: 'Effacer',
  confirm: 'Confirmer',
  yes: 'Oui',
  no: 'Non'
};

const ENGLISH_TRANSLATIONS: Translation = {
  // Login
  loginTitle: 'Quran School',
  loginSubtitle: 'Quran School Management System',
  loginArabicSubtitle: '',
  email: 'Email',
  password: 'Password',
  signIn: 'Sign In',
  demoCredentials: 'Demo Credentials',
  teacher: 'Teacher',
  student: 'Student',
  invalidCredentials: 'Invalid email or password',

  // Navigation
  dashboard: 'Dashboard',
  sessions: 'Sessions',
  students: 'Students',
  reports: 'Reports',
  settings: 'Settings',
  profile: 'Profile',
  logout: 'Logout',
  mySessions: 'My Sessions',
  progress: 'Progress',
  assignments: 'Assignments',

  // Dashboard
  welcome: 'Welcome',
  teacherDashboard: 'Teacher Dashboard',
  studentDashboard: 'Student Dashboard',
  scheduleSession: 'Schedule Session',
  upcomingSessions: 'Your Upcoming Sessions',
  recentCompletedSessions: 'Recent Completed Sessions',
  noUpcomingSessions: 'No Upcoming Sessions',
  noSessionsMessage: 'Your teacher will schedule sessions for you',
  calendarView: 'Calendar View',
  sessionList: 'Session List',

  // Sessions
  generalSession: 'General Session',
  with: 'with',
  scheduled: 'Scheduled',
  inProgress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  startSession: 'Start Session',
  viewNotes: 'View Notes',
  teacherNotes: 'Teacher\'s Notes',
  sessionNotes: 'Session Notes',
  saveComplete: 'Save & Complete Session',
  cancel: 'Cancel',

  // Schedule Modal
  scheduleNewSession: 'Schedule New Session',
  selectStudent: 'Select Student',
  topic: 'Topic/Subject',
  sessionDate: 'Session Date',
  startTime: 'Start Time',
  endTime: 'End Time',

  // Time
  daysAway: 'day(s) away',
  hoursAway: 'hour(s) away',
  startingSoon: 'Starting soon',

  // Common
  main: 'Main',
  account: 'Account',
  loading: 'Loading',
  save: 'Save',
  close: 'Close',
  edit: 'Edit',
  delete: 'Delete',
  add: 'Add',
  search: 'Search',
  filter: 'Filter',
  sort: 'Sort',
  export: 'Export',
  import: 'Import',
  refresh: 'Refresh',
  back: 'Back',
  next: 'Next',
  previous: 'Previous',
  submit: 'Submit',
  reset: 'Reset',
  clear: 'Clear',
  confirm: 'Confirm',
  yes: 'Yes',
  no: 'No'
};

const ARABIC_TRANSLATIONS: Translation = {
  // Login
  loginTitle: 'مدرسة القرآن الكريم',
  loginSubtitle: 'نظام إدارة مدرسة القرآن',
  loginArabicSubtitle: '',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  signIn: 'تسجيل الدخول',
  demoCredentials: 'بيانات تجريبية',
  teacher: 'المعلم',
  student: 'الطالب',
  invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',

  // Navigation
  dashboard: 'لوحة التحكم',
  sessions: 'الجلسات',
  students: 'الطلاب',
  reports: 'التقارير',
  settings: 'الإعدادات',
  profile: 'الملف الشخصي',
  logout: 'تسجيل الخروج',
  mySessions: 'جلساتي',
  progress: 'التقدم',
  assignments: 'الواجبات',

  // Dashboard
  welcome: 'أهلاً وسهلاً',
  teacherDashboard: 'لوحة المعلم',
  studentDashboard: 'لوحة الطالب',
  scheduleSession: 'جدولة جلسة',
  upcomingSessions: 'جلساتك القادمة',
  recentCompletedSessions: 'الجلسات المكتملة مؤخراً',
  noUpcomingSessions: 'لا توجد جلسات قادمة',
  noSessionsMessage: 'سيقوم معلمك بجدولة الجلسات لك',
  calendarView: 'عرض التقويم',
  sessionList: 'قائمة الجلسات',

  // Sessions
  generalSession: 'جلسة عامة',
  with: 'مع',
  scheduled: 'مجدولة',
  inProgress: 'جارية',
  completed: 'مكتملة',
  cancelled: 'ملغية',
  startSession: 'بدء الجلسة',
  viewNotes: 'عرض الملاحظات',
  teacherNotes: 'ملاحظات المعلم',
  sessionNotes: 'ملاحظات الجلسة',
  saveComplete: 'حفظ وإنهاء',
  cancel: 'إلغاء',

  // Schedule Modal
  scheduleNewSession: 'جدولة جلسة جديدة',
  selectStudent: 'اختر الطالب',
  topic: 'الموضوع',
  sessionDate: 'تاريخ الجلسة',
  startTime: 'وقت البداية',
  endTime: 'وقت النهاية',

  // Time
  daysAway: 'يوم متبقي',
  hoursAway: 'ساعة متبقية',
  startingSoon: 'ستبدأ قريباً',

  // Common
  main: 'الرئيسية',
  account: 'الحساب',
  loading: 'جاري التحميل',
  save: 'حفظ',
  close: 'إغلاق',
  edit: 'تعديل',
  delete: 'حذف',
  add: 'إضافة',
  search: 'بحث',
  filter: 'تصفية',
  sort: 'ترتيب',
  export: 'تصدير',
  import: 'استيراد',
  refresh: 'تحديث',
  back: 'رجوع',
  next: 'التالي',
  previous: 'السابق',
  submit: 'إرسال',
  reset: 'إعادة تعيين',
  clear: 'مسح',
  confirm: 'تأكيد',
  yes: 'نعم',
  no: 'لا'
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<'fr' | 'en' | 'ar'>('fr');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translationsSubject = new BehaviorSubject<Translation>(FRENCH_TRANSLATIONS);
  public translations$ = this.translationsSubject.asObservable();

  constructor() {
    // Check if language preference is saved
    const savedLanguage = localStorage.getItem('selectedLanguage') as 'fr' | 'en' | 'ar';
    if (savedLanguage) {
      this.setLanguage(savedLanguage);
    }
  }

  getCurrentLanguage(): 'fr' | 'en' | 'ar' {
    return this.currentLanguageSubject.value;
  }

  getTranslations(): Translation {
    return this.translationsSubject.value;
  }

  setLanguage(language: 'fr' | 'en' | 'ar'): void {
    this.currentLanguageSubject.next(language);
    
    let translations: Translation;
    switch (language) {
      case 'fr':
        translations = FRENCH_TRANSLATIONS;
        break;
      case 'en':
        translations = ENGLISH_TRANSLATIONS;
        break;
      case 'ar':
        translations = ARABIC_TRANSLATIONS;
        break;
      default:
        translations = FRENCH_TRANSLATIONS;
    }
    this.translationsSubject.next(translations);
    
    // Save preference
    localStorage.setItem('selectedLanguage', language);
  }

  getNextLanguage(): 'fr' | 'en' | 'ar' {
    const currentLang = this.getCurrentLanguage();
    switch (currentLang) {
      case 'fr': return 'en';
      case 'en': return 'ar';
      case 'ar': return 'fr';
      default: return 'fr';
    }
  }

  toggleLanguage(): void {
    const nextLang = this.getNextLanguage();
    this.setLanguage(nextLang);
  }
}