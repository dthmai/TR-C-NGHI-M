import { useState, useEffect } from 'react';
import { StudentProfile, WrongQuestionRecord, ExamHistoryItem } from '../types';
import { ALL_QUESTIONS } from '../data/historyQuestions';

const PROFILE_KEY = 'dau_truong_lich_su_profile_v1';
const WRONG_QUESTIONS_KEY = 'dau_truong_lich_su_wrong_v1';
const EXAM_HISTORY_KEY = 'dau_truong_lich_su_exams_v1';
const TOPIC_STATS_KEY = 'dau_truong_lich_su_topic_stats_v1';
const TEACHER_SETTINGS_KEY = 'dau_truong_lich_su_teacher_v1';
const FLASHCARD_STATUS_KEY = 'dau_truong_lich_su_flashcards_v1';

export interface TopicProgress {
  studied: number;
  correct: number;
  wrong: number;
}

export interface TeacherConfig {
  disabledQuestionIds: string[];
  classroomSelectedIds: string[];
  gameTimerDuration: number;
  questionCountPerGame: number;
}

export interface FlashcardRating {
  [flashcardId: string]: 'not_remembered' | 'almost' | 'mastered';
}

export function useStorage() {
  // Student Profile
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: '',
      className: '',
      avatar: '🏛️',
      xp: 0,
      highScore: 0,
      streak: 0,
      soundEnabled: true
    };
  });

  // Wrong Questions Notebook
  const [wrongQuestions, setWrongQuestions] = useState<Record<string, WrongQuestionRecord>>(() => {
    try {
      const saved = localStorage.getItem(WRONG_QUESTIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Topic progress statistics
  const [topicStats, setTopicStats] = useState<Record<string, TopicProgress>>(() => {
    try {
      const saved = localStorage.getItem(TOPIC_STATS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      'bai-1': { studied: 0, correct: 0, wrong: 0 },
      'bai-2': { studied: 0, correct: 0, wrong: 0 },
      'bai-3': { studied: 0, correct: 0, wrong: 0 },
      'bai-4': { studied: 0, correct: 0, wrong: 0 }
    };
  });

  // Exam History
  const [examHistory, setExamHistory] = useState<ExamHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(EXAM_HISTORY_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Flashcards mastery
  const [flashcardRatings, setFlashcardRatings] = useState<FlashcardRating>(() => {
    try {
      const saved = localStorage.getItem(FLASHCARD_STATUS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Teacher settings
  const [teacherConfig, setTeacherConfig] = useState<TeacherConfig>(() => {
    try {
      const saved = localStorage.getItem(TEACHER_SETTINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      disabledQuestionIds: [],
      classroomSelectedIds: [],
      gameTimerDuration: 60,
      questionCountPerGame: 15
    };
  });

  // Auto-sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(WRONG_QUESTIONS_KEY, JSON.stringify(wrongQuestions));
    } catch {}
  }, [wrongQuestions]);

  useEffect(() => {
    try {
      localStorage.setItem(TOPIC_STATS_KEY, JSON.stringify(topicStats));
    } catch {}
  }, [topicStats]);

  useEffect(() => {
    try {
      localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(examHistory));
    } catch {}
  }, [examHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(FLASHCARD_STATUS_KEY, JSON.stringify(flashcardRatings));
    } catch {}
  }, [flashcardRatings]);

  useEffect(() => {
    try {
      localStorage.setItem(TEACHER_SETTINGS_KEY, JSON.stringify(teacherConfig));
    } catch {}
  }, [teacherConfig]);

  // Actions
  const updateProfile = (partial: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...partial }));
  };

  const addXP = (amount: number) => {
    setProfile(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const updateHighScore = (score: number) => {
    setProfile(prev => ({
      ...prev,
      highScore: Math.max(prev.highScore, score)
    }));
  };

  // Record an answer in topic stats & wrong notebook
  const recordAnswer = (questionId: string, isCorrect: boolean, userAnswerLetter?: string) => {
    const q = ALL_QUESTIONS.find(item => item.id === questionId);
    if (!q) return;

    // Update topic stats
    setTopicStats(prev => {
      const current = prev[q.lessonId] || { studied: 0, correct: 0, wrong: 0 };
      return {
        ...prev,
        [q.lessonId]: {
          studied: current.studied + 1,
          correct: current.correct + (isCorrect ? 1 : 0),
          wrong: current.wrong + (isCorrect ? 0 : 1)
        }
      };
    });

    // Update wrong notebook
    setWrongQuestions(prev => {
      const existing = prev[questionId];
      if (isCorrect) {
        if (existing) {
          const newConsecutive = (existing.consecutiveCorrect || 0) + 1;
          return {
            ...prev,
            [questionId]: {
              ...existing,
              consecutiveCorrect: newConsecutive,
              isMastered: newConsecutive >= 2,
              lastAttemptAt: Date.now()
            }
          };
        }
        return prev;
      } else {
        // Wrong answer
        return {
          ...prev,
          [questionId]: {
            questionId,
            lessonId: q.lessonId,
            questionText: q.question,
            correctAnswerText: `${q.correctAnswer}. ${q.options[q.correctAnswer]}`,
            userAnswerText: userAnswerLetter ? `${userAnswerLetter}. ${q.options[userAnswerLetter as keyof typeof q.options]}` : undefined,
            consecutiveCorrect: 0,
            isMastered: false,
            lastAttemptAt: Date.now()
          }
        };
      }
    });
  };

  const recordFlashcardRating = (id: string, rating: 'not_remembered' | 'almost' | 'mastered') => {
    setFlashcardRatings(prev => ({
      ...prev,
      [id]: rating
    }));
  };

  const addExamResult = (result: ExamHistoryItem) => {
    setExamHistory(prev => [result, ...prev]);
    updateHighScore(Math.round(result.score * 100));
  };

  const resetAllProgress = () => {
    setWrongQuestions({});
    setTopicStats({
      'bai-1': { studied: 0, correct: 0, wrong: 0 },
      'bai-2': { studied: 0, correct: 0, wrong: 0 },
      'bai-3': { studied: 0, correct: 0, wrong: 0 },
      'bai-4': { studied: 0, correct: 0, wrong: 0 }
    });
    setExamHistory([]);
    setFlashcardRatings({});
    setProfile(prev => ({
      ...prev,
      xp: 0,
      highScore: 0,
      streak: 0
    }));
  };

  // Get student rank level and badge list
  const getLevelInfo = (xp: number) => {
    if (xp >= 2000) return { title: 'Bậc thầy lịch sử', icon: '👑', minXp: 2000, nextXp: 3000, color: 'text-amber-400' };
    if (xp >= 1000) return { title: 'Sử gia', icon: '🏛️', minXp: 1000, nextXp: 2000, color: 'text-purple-400' };
    if (xp >= 500) return { title: 'Chiến binh lịch sử', icon: '⚔️', minXp: 500, nextXp: 1000, color: 'text-blue-400' };
    if (xp >= 200) return { title: 'Nhà khám phá', icon: '📖', minXp: 200, nextXp: 500, color: 'text-emerald-400' };
    return { title: 'Tân binh lịch sử', icon: '🌱', minXp: 0, nextXp: 200, color: 'text-teal-400' };
  };

  return {
    profile,
    updateProfile,
    addXP,
    updateHighScore,
    wrongQuestions,
    topicStats,
    recordAnswer,
    examHistory,
    addExamResult,
    flashcardRatings,
    recordFlashcardRating,
    teacherConfig,
    setTeacherConfig,
    resetAllProgress,
    getLevelInfo
  };
}
