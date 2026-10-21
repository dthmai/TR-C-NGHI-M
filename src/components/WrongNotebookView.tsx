import React, { useState } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  BookOpen, 
  Play, 
  Sparkles,
  ChevronRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { WrongQuestionRecord, Question, ViewMode } from '../types';
import { ALL_QUESTIONS } from '../data/historyQuestions';
import { soundManager } from '../utils/soundEffects';
import { fireConfetti } from '../utils/confetti';

interface WrongNotebookViewProps {
  wrongQuestions: Record<string, WrongQuestionRecord>;
  onRecordAnswer: (questionId: string, isCorrect: boolean, userAnswerLetter?: string) => void;
  onAddXP: (amount: number) => void;
  onBack: () => void;
}

export const WrongNotebookView: React.FC<WrongNotebookViewProps> = ({
  wrongQuestions,
  onRecordAnswer,
  onAddXP,
  onBack
}) => {
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');
  const [practiceMode, setPracticeMode] = useState<boolean>(false);
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const wrongList = Object.values(wrongQuestions);

  const filteredWrong = wrongList.filter(item => {
    if (selectedTopicFilter === 'all') return true;
    return item.lessonId === selectedTopicFilter;
  });

  const unmasteredCount = filteredWrong.filter(w => !w.isMastered).length;
  const masteredCount = filteredWrong.filter(w => w.isMastered).length;

  const handleStartPracticeAll = () => {
    soundManager.playClick();
    const questionsToPractice = filteredWrong
      .filter(w => !w.isMastered)
      .map(w => ALL_QUESTIONS.find(q => q.id === w.questionId))
      .filter((q): q is Question => q !== undefined);

    if (questionsToPractice.length === 0) {
      alert('Tuyệt vời! Không còn câu sai nào chưa thuộc trong danh mục này.');
      return;
    }

    setPracticeQuestions(questionsToPractice);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setPracticeMode(true);
  };

  const activePracticeQ = practiceQuestions[currentIndex];

  const handleChoosePracticeAnswer = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !activePracticeQ) return;

    setSelectedAnswer(choice);
    setIsAnswered(true);

    const isCorrect = choice === activePracticeQ.correctAnswer;
    onRecordAnswer(activePracticeQ.id, isCorrect, choice);

    if (isCorrect) {
      soundManager.playCorrect();
      onAddXP(10);
      const record = wrongQuestions[activePracticeQ.id];
      const nextConsecutive = (record?.consecutiveCorrect || 0) + 1;
      if (nextConsecutive >= 2) {
        soundManager.playVictory();
        fireConfetti();
      }
    } else {
      soundManager.playWrong();
    }
  };

  const handleNextPracticeQuestion = () => {
    soundManager.playClick();
    if (currentIndex + 1 < practiceQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      soundManager.playVictory();
      fireConfetti();
      alert('Hoàn thành lượt ôn lại câu sai! Những câu làm đúng 2 lần liên tiếp đã được chứng nhận ĐÃ THUỘC.');
      setPracticeMode(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              if (practiceMode) setPracticeMode(false);
              else onBack();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-rose-400 font-serif-title uppercase flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-rose-400" />
              <span>Sổ Tay Câu Làm Sai</span>
            </h1>
            <p className="text-xs text-slate-400">
              Trả lời đúng lại 2 lần liên tiếp để nhận huy hiệu “✓ ĐÃ THUỘC”
            </p>
          </div>
        </div>

        {!practiceMode && unmasteredCount > 0 && (
          <button
            onClick={handleStartPracticeAll}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-950/40 cursor-pointer transition-all self-start sm:self-auto"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>ÔN LẠI TẤT CẢ CÂU SAI ({unmasteredCount})</span>
          </button>
        )}
      </div>

      {!practiceMode ? (
        <div className="space-y-6">
          {/* Top Filter & Metric Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'Tất cả câu sai' },
                { id: 'bai-1', label: 'Chủ đề 1 (CM tư sản)' },
                { id: 'bai-2', label: 'Chủ đề 2 (CN tư bản)' },
                { id: 'bai-3', label: 'Chủ đề 3 (Liên Xô)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { soundManager.playClick(); setSelectedTopicFilter(tab.id); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedTopicFilter === tab.id
                      ? 'bg-rose-600 text-white font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 font-semibold">
                Cần ôn: {unmasteredCount} câu
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-semibold">
                Đã thuộc: {masteredCount} câu
              </span>
            </div>
          </div>

          {/* List of Wrong Questions */}
          {filteredWrong.length === 0 ? (
            <div className="text-center py-16 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-100">Sổ tay trống! Không có câu sai!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Tuyệt vời! Bạn chưa làm sai câu nào hoặc đã ôn thuộc lòng tất cả các câu hỏi.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWrong.map((record) => {
                const questionData = ALL_QUESTIONS.find(q => q.id === record.questionId);

                return (
                  <div
                    key={record.questionId}
                    className={`p-5 rounded-2xl border-2 transition-all space-y-3 bg-slate-900/95 ${
                      record.isMastered 
                        ? 'border-emerald-500/40 opacity-75' 
                        : 'border-rose-500/40 hover:border-rose-400'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pb-2 border-b border-slate-800">
                      <span className="font-bold text-slate-400">
                        {questionData?.lessonName || record.lessonId}
                      </span>

                      <div className="flex items-center gap-2">
                        {record.isMastered ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> ✓ ĐÃ THUỘC (Đúng 2 lần)
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                            Đã đúng lại: {record.consecutiveCorrect || 0}/2 lần
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
                      {record.questionText}
                    </h4>

                    {/* Answer explanation highlight */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm space-y-1.5">
                      <p className="text-emerald-400 font-semibold">
                        <strong>Đáp án chuẩn xác: </strong>
                        {record.correctAnswerText}
                      </p>
                      {record.userAnswerText && (
                        <p className="text-rose-400/90 text-xs">
                          <strong>Bạn từng chọn nhầm: </strong>
                          {record.userAnswerText}
                        </p>
                      )}
                      {questionData && (
                        <p className="text-slate-400 text-xs pt-1 border-t border-slate-850">
                          <strong>Giải thích: </strong>
                          {questionData.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Active Practice Mode for Wrong Questions */
        activePracticeQ && (
          <div className="bg-slate-900 rounded-3xl border-2 border-rose-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-bold text-rose-300 bg-rose-950/80 px-3 py-1 rounded-xl border border-rose-800">
                Ôn câu sai: {currentIndex + 1} / {practiceQuestions.length}
              </span>
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Đúng liên tiếp 2 lần = Thuộc bài
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-bold text-slate-100 leading-relaxed">
              {activePracticeQ.question}
            </h2>

            <div className="grid grid-cols-1 gap-3.5">
              {(['A', 'B', 'C', 'D'] as const).map(letter => {
                const isSelected = selectedAnswer === letter;
                const isCorrect = letter === activePracticeQ.correctAnswer;

                let btnStyle = 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200';
                if (isAnswered) {
                  if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30';
                  else if (isSelected && !isCorrect) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                  else btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                }

                return (
                  <button
                    key={letter}
                    disabled={isAnswered}
                    onClick={() => handleChoosePracticeAnswer(letter)}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 text-left cursor-pointer active:scale-98 ${btnStyle}`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-sm text-slate-300 shrink-0">
                      {isAnswered && isCorrect ? '✓' : isAnswered && isSelected && !isCorrect ? '✕' : letter}
                    </div>
                    <div className="flex-1 text-sm sm:text-base font-medium leading-snug">
                      {activePracticeQ.options[letter]}
                    </div>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  {selectedAnswer === activePracticeQ.correctAnswer ? (
                    <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-5 h-5" /> RẤT TỐT! BẠN ĐÃ TRẢ LỜI ĐÚNG!
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
                      <XCircle className="w-5 h-5" /> VẪN CHƯA ĐÚNG! (Đáp án: {activePracticeQ.correctAnswer})
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-amber-400">Giải thích: </strong>
                  {activePracticeQ.explanation}
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextPracticeQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>{currentIndex + 1 < practiceQuestions.length ? 'Câu sai tiếp theo' : 'Hoàn thành lượt ôn'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
