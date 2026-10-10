import { createStore } from 'vuex'
import { COURSES, Course } from '../data/courses'

export interface CertificateRecord {
  id: string; // e.g. "DBG-82914-FR"
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentEmail: string;
  completedHours: number;
  issueDate: string;
  scorePercent: number;
  instructorName: string;
  instructorRole: string;
  qrUrl: string;
}

export interface Enrollment {
  courseId: string;
  chosenHours: number;
  enrolledAt: string;
  completedLessonIds: string[];
  passedQuizIds: string[];
  certificateId?: string;
}

export interface State {
  user: {
    name: string;
    email: string;
    avatar: string;
    plan: 'free' | 'pro' | 'enterprise';
  };
  enrollments: Record<string, Enrollment>;
  certificates: Record<string, CertificateRecord>;
  currentSearchQuery: string;
  selectedLanguage: 'fr' | 'en' | 'es';
}

const STORAGE_KEY = 'debugger_saas_v1';

function loadInitialState(): State {
  const defaultState: State = {
    user: {
      name: 'Alexandre Renoir',
      email: 'alexandre.renoir@debugger-formation.io',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      plan: 'pro'
    },
    enrollments: {
      'ai-prompt-engineering': {
        courseId: 'ai-prompt-engineering',
        chosenHours: 25,
        enrolledAt: '2026-09-10',
        completedLessonIds: ['l1-1'],
        passedQuizIds: []
      }
    },
    certificates: {
      'DBG-2026-7491-FR': {
        id: 'DBG-2026-7491-FR',
        courseId: 'management-leadership-hybride',
        courseTitle: 'Leadership Moderne & Management d’Équipes Hybrides',
        studentName: 'Alexandre Renoir',
        studentEmail: 'alexandre.renoir@debugger-student.com',
        completedHours: 20,
        issueDate: '15 Septembre 2026',
        scorePercent: 96,
        instructorName: 'Émilie Vernier',
        instructorRole: 'Executive Coach & Auteure, Leadership Lab',
        qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://debugger-formation.io/verify/DBG-2026-7491-FR'
      }
    },
    currentSearchQuery: '',
    selectedLanguage: 'fr'
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed };
    }
  } catch (e) {
    console.warn('Could not read from localStorage', e);
  }
  return defaultState;
}

function persistState(state: State) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      user: state.user,
      enrollments: state.enrollments,
      certificates: state.certificates,
      selectedLanguage: state.selectedLanguage
    }));
  } catch (e) {
    console.warn('Could not write to localStorage', e);
  }
}

export default createStore<State>({
  state: loadInitialState(),
  getters: {
    currentUser: (state) => state.user,
    enrollmentsList: (state) => Object.values(state.enrollments),
    getEnrollment: (state) => (courseId: string) => state.enrollments[courseId],
    getCourseProgress: (state) => (courseId: string) => {
      const course = COURSES.find(c => c.id === courseId);
      const enrollment = state.enrollments[courseId];
      if (!course || !enrollment) return 0;
      
      const allLessons = course.modules.flatMap(m => m.lessons);
      if (allLessons.length === 0) return 0;
      const completed = enrollment.completedLessonIds.length;
      return Math.min(100, Math.round((completed / allLessons.length) * 100));
    },
    certificatesList: (state) => Object.values(state.certificates),
    getCertificateById: (state) => (id: string) => state.certificates[id],
    searchQuery: (state) => state.currentSearchQuery
  },
  mutations: {
    SET_SEARCH_QUERY(state, query: string) {
      state.currentSearchQuery = query;
    },
    SET_LANGUAGE(state, lang: 'fr' | 'en' | 'es') {
      state.selectedLanguage = lang;
      persistState(state);
    },
    SET_USER_NAME(state, name: string) {
      state.user.name = name;
      persistState(state);
    },
    ENROLL_COURSE(state, { courseId, chosenHours }: { courseId: string; chosenHours: number }) {
      if (!state.enrollments[courseId]) {
        state.enrollments[courseId] = {
          courseId,
          chosenHours: chosenHours || 20,
          enrolledAt: new Date().toISOString().split('T')[0],
          completedLessonIds: [],
          passedQuizIds: []
        };
      } else {
        state.enrollments[courseId].chosenHours = chosenHours;
      }
      persistState(state);
    },
    TOGGLE_LESSON_COMPLETE(state, { courseId, lessonId }: { courseId: string; lessonId: string }) {
      if (!state.enrollments[courseId]) {
        state.enrollments[courseId] = {
          courseId,
          chosenHours: 20,
          enrolledAt: new Date().toISOString().split('T')[0],
          completedLessonIds: [],
          passedQuizIds: []
        };
      }
      const list = state.enrollments[courseId].completedLessonIds;
      const idx = list.indexOf(lessonId);
      if (idx >= 0) {
        list.splice(idx, 1);
      } else {
        list.push(lessonId);
      }
      persistState(state);
    },
    PASS_QUIZ(state, { courseId, quizId, scorePercent }: { courseId: string; quizId: string; scorePercent: number }) {
      if (!state.enrollments[courseId]) {
        state.enrollments[courseId] = {
          courseId,
          chosenHours: 20,
          enrolledAt: new Date().toISOString().split('T')[0],
          completedLessonIds: [],
          passedQuizIds: []
        };
      }
      if (!state.enrollments[courseId].passedQuizIds.includes(quizId)) {
        state.enrollments[courseId].passedQuizIds.push(quizId);
      }

      // Automatically generate or update certificate if not yet issued
      const course = COURSES.find(c => c.id === courseId);
      if (course) {
        const certId = state.enrollments[courseId].certificateId || `DBG-2026-${Math.floor(1000 + Math.random() * 9000)}-FR`;
        state.enrollments[courseId].certificateId = certId;
        
        state.certificates[certId] = {
          id: certId,
          courseId: course.id,
          courseTitle: course.title,
          studentName: state.user.name,
          studentEmail: state.user.email,
          completedHours: state.enrollments[courseId].chosenHours || course.defaultHours,
          issueDate: new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
          scorePercent: Math.max(scorePercent, 90),
          instructorName: course.instructor.name,
          instructorRole: `${course.instructor.title}, ${course.instructor.company}`,
          qrUrl: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://debugger-formation.io/verify/${certId}`
        };
      }
      persistState(state);
    }
  },
  actions: {
    enroll({ commit }, payload) {
      commit('ENROLL_COURSE', payload);
    },
    toggleLesson({ commit }, payload) {
      commit('TOGGLE_LESSON_COMPLETE', payload);
    },
    passQuiz({ commit }, payload) {
      commit('PASS_QUIZ', payload);
    }
  }
})
