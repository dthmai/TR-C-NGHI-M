export interface Question {
  id: string;
  lessonId: 'bai-1' | 'bai-2' | 'bai-3' | 'bai-4';
  lessonName: string;
  questionNumber: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TrueFalseStatement {
  id: 'a' | 'b' | 'c' | 'd';
  statement: string;
  isCorrect: boolean;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  questionNumber: number;
  lessonId: string;
  title: string;
  sourceText: string;
  sourceCitation: string;
  statements: TrueFalseStatement[];
}

export interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
  subPoints?: string[];
  category: 'asia' | 'latin_america' | 'collapse' | 'china_reform';
}

export interface MatchingPair {
  id: string;
  type: 'event_date' | 'person_event' | 'country_feature' | 'concept_detail';
  left: string;
  right: string;
  category: string;
}

export interface StudentProfile {
  name: string;
  className: string;
  avatar: string;
  xp: number;
  highScore: number;
  streak: number;
  soundEnabled: boolean;
}

export interface WrongQuestionRecord {
  questionId: string;
  lessonId: string;
  questionText: string;
  correctAnswerText: string;
  userAnswerText?: string;
  consecutiveCorrect: number; // 2 times = mastered
  isMastered: boolean;
  lastAttemptAt: number;
}

export interface ExamHistoryItem {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  details: {
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}

export interface TeamScore {
  id: string;
  name: string;
  color: string;
  score: number;
}

export type ViewMode = 
  | 'home'
  | 'topics'
  | 'games'
  | 'game_speed'
  | 'game_60s'
  | 'game_millionaire'
  | 'game_wheel'
  | 'game_matching'
  | 'game_source'
  | 'game_secret_doors'
  | 'team_battle'
  | 'exam'
  | 'flashcards'
  | 'wrong_notebook'
  | 'profile';
