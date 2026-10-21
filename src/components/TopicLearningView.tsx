import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowLeft, 
  Play, 
  Sparkles, 
  Award, 
  HelpCircle,
  FileQuestion,
  ChevronRight,
  RefreshCw,
  Globe
} from 'lucide-react';
import { 
  TOPICS_META, 
  LESSON_1_QUESTIONS, 
  LESSON_2_QUESTIONS, 
  LESSON_3_QUESTIONS, 
  ESSAY_FLASHCARDS,
  TRUE_FALSE_QUESTIONS 
} from '../data/historyQuestions';
import { Question, ViewMode } from '../types';
import { soundManager } from '../utils/soundEffects';
import { fireConfetti } from '../utils/confetti';
import { TopicProgress } from '../hooks/useStorage';

interface TopicLearningViewProps {
  topicStats: Record<string, TopicProgress>;
  wrongQuestions: Record<string, any>;
  onRecordAnswer: (questionId: string, isCorrect: boolean, userAnswerLetter?: string) => void;
  onAddXP: (amount: number) => void;
  onNavigate: (view: ViewMode) => void;
}

export const TopicLearningView: React.FC<TopicLearningViewProps> = ({
  topicStats,
  wrongQuestions,
  onRecordAnswer,
  onAddXP,
  onNavigate
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [filterWrongOnly, setFilterWrongOnly] = useState(false);

  // Get question list for selected topic
  const getQuestionsForTopic = (topicId: string): Question[] => {
    let list: Question[] = [];
    if (topicId === 'bai-1') list = LESSON_1_QUESTIONS;
    else if (topicId === 'bai-2') list = LESSON_2_QUESTIONS;
    else if (topicId === 'bai-3') list = LESSON_3_QUESTIONS;
    else if (topicId === 'bai-4') {
      // In topic 4, multiple choice can also be converted or we offer the dedicated essay/flashcard/true-false views
      return [];
    }

    if (filterWrongOnly) {
      return list.filter(q => !!wrongQuestions[q.id] && !wrongQuestions[q.id].isMastered);
    }
    return list;
  };

  const handleStartPractice = (topicId: string, wrongOnly: boolean = false) => {
    soundManager.playClick();
    if (topicId === 'bai-4') {
      onNavigate('flashcards');
      return;
    }
    setSelectedTopicId(topicId);
    setFilterWrongOnly(wrongOnly);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const questions = selectedTopicId ? getQuestionsForTopic(selectedTopicId) : [];
  const activeQuestion = questions[currentQuestionIndex];

  const handleChooseAnswer = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !activeQuestion) return;

    setSelectedAnswer(choice);
    setIsAnswered(true);

    const isCorrect = choice === activeQuestion.correctAnswer;
    if (isCorrect) {
      soundManager.playCorrect();
      onAddXP(10);
    } else {
      soundManager.playWrong();
    }

    onRecordAnswer(activeQuestion.id, isCorrect, choice);
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Completed topic practice session!
      soundManager.playVictory();
      fireConfetti();
      onAddXP(50);
      alert('Chúc mừng bạn đã hoàn thành phiên luyện tập chuyên đề này! (+50 XP)');
      setSelectedTopicId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                if (selectedTopicId) setSelectedTopicId(null);
                else onNavigate('home');
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-xl sm:text-2xl font-black text-amber-300 font-serif-title uppercase flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <span>Học Theo Chủ Đề</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Theo sát khung kiến thức đề cương Giữa Kỳ I (2026–2027)
          </p>
        </div>

        {selectedTopicId && (
          <button
            onClick={() => setSelectedTopicId(null)}
            className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            Đổi chủ đề khác
          </button>
        )}
      </div>

      {/* Content: Either Topic Cards or Active Practice Screen */}
      {!selectedTopicId ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TOPICS_META.map(topic => {
            const stats = topicStats[topic.id] || { studied: 0, correct: 0, wrong: 0 };
            const percent = topic.questionCount > 0 
              ? Math.min(100, Math.round((stats.studied / topic.questionCount) * 100))
              : 0;

            const wrongInTopic = Object.values(wrongQuestions).filter(
              (w: any) => w.lessonId === topic.id && !w.isMastered
            ).length;

            return (
              <div 
                key={topic.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-amber-500/40 p-5 space-y-4 shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {topic.number}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {topic.questionCount} câu hỏi
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {topic.description}
                  </p>

                  {/* Progress & Stats Bar */}
                  {topic.id !== 'bai-4' && (
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                        <span>Tiến độ học tập</span>
                        <span className="text-amber-400 font-bold">{percent}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                        <div className="bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block">Đã học</span>
                          <strong className="text-slate-200">{stats.studied}</strong>
                        </div>
                        <div className="bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
                          <span className="text-emerald-400 block">Đúng</span>
                          <strong className="text-emerald-400">{stats.correct}</strong>
                        </div>
                        <div className="bg-slate-950/70 p-1.5 rounded-lg border border-slate-800">
                          <span className="text-rose-400 block">Sai</span>
                          <strong className="text-rose-400">{stats.wrong}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Specialized description for Section III */}
                  {topic.id === 'bai-4' && (
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-cyan-900/40 text-xs text-cyan-200 space-y-1.5">
                      <p className="font-semibold flex items-center gap-1.5 text-cyan-300">
                        <Globe className="w-3.5 h-3.5" /> Nội dung phần Tự luận & Thẻ ghi nhớ:
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px]">
                        <li>Mở rộng CNXH ở châu Á (TQ 1949, VN, Lào...)</li>
                        <li>Khu vực Mỹ La-tinh (Cu-ba 1959, 1961)</li>
                        <li>Nguyên nhân sụp đổ CNXH ở Đông Âu & Liên Xô (1991)</li>
                        <li>Cải cách mở cửa Trung Quốc (12/1978) & Thành tựu</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleStartPractice(topic.id, false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{topic.id === 'bai-4' ? 'Học Flashcard Tự Luận' : 'Luyện tập chủ đề'}</span>
                  </button>

                  {wrongInTopic > 0 && topic.id !== 'bai-4' && (
                    <button
                      onClick={() => handleStartPractice(topic.id, true)}
                      className="py-2.5 px-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      title="Chỉ ôn lại các câu đã làm sai trong chủ đề này"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Ôn {wrongInTopic} câu sai</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Active Topic Practice Question Screen */
        <div className="space-y-6">
          {questions.length === 0 ? (
            <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-200">Không có câu hỏi nào thỏa mãn</h3>
              <p className="text-xs text-slate-400">
                {filterWrongOnly ? 'Bạn chưa làm sai câu nào trong chủ đề này! Tuyệt vời!' : 'Chủ đề này chưa có câu hỏi.'}
              </p>
              <button
                onClick={() => setSelectedTopicId(null)}
                className="mt-3 px-4 py-2 rounded-xl bg-amber-600 text-slate-950 font-bold text-xs"
              >
                Quay lại danh sách
              </button>
            </div>
          ) : (
            activeQuestion && (
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
                {/* Header of Question */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs">
                      Câu {currentQuestionIndex + 1} / {questions.length}
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      ({activeQuestion.lessonName})
                    </span>
                  </div>

                  <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> +10 XP mỗi câu đúng
                  </span>
                </div>

                {/* Question Statement */}
                <h2 className="text-base sm:text-xl font-bold text-slate-100 leading-relaxed">
                  {activeQuestion.question}
                </h2>

                {/* 4 Large Choice Buttons */}
                <div className="grid grid-cols-1 gap-3.5">
                  {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                    const isSelected = selectedAnswer === letter;
                    const isCorrect = letter === activeQuestion.correctAnswer;

                    let btnStyle = 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200';
                    let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30';
                        badgeStyle = 'bg-emerald-500 text-slate-950 font-black border-emerald-400';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                        badgeStyle = 'bg-rose-500 text-slate-950 font-black border-rose-400';
                      } else {
                        btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={letter}
                        disabled={isAnswered}
                        onClick={() => handleChooseAnswer(letter)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${btnStyle}`}
                      >
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 ${badgeStyle}`}>
                          {isAnswered && isCorrect ? '✓' : isAnswered && isSelected && !isCorrect ? '✕' : letter}
                        </div>
                        <div className="flex-1 text-sm sm:text-base font-medium leading-relaxed">
                          {activeQuestion.options[letter]}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {isAnswered && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>GIẢI THÍCH CHI TIẾT:</span>
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {activeQuestion.explanation}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer"
                      >
                        <span>{currentQuestionIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Hoàn thành chuyên đề'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
