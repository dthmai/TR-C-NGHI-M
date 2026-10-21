import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Timer, 
  Flag, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  BookOpen, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  Send,
  HelpCircle
} from 'lucide-react';
import { Question, ExamHistoryItem, ViewMode } from '../types';
import { 
  LESSON_1_QUESTIONS, 
  LESSON_2_QUESTIONS, 
  LESSON_3_QUESTIONS,
  TRUE_FALSE_QUESTIONS 
} from '../data/historyQuestions';
import { soundManager } from '../utils/soundEffects';
import { fireConfetti } from '../utils/confetti';

interface ExamSimulatorViewProps {
  onBack: () => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean, userAnswerLetter?: string) => void;
  onAddExamResult: (result: ExamHistoryItem) => void;
  onAddXP: (amount: number) => void;
  onNavigate: (view: ViewMode) => void;
}

export const ExamSimulatorView: React.FC<ExamSimulatorViewProps> = ({
  onBack,
  onRecordAnswer,
  onAddExamResult,
  onAddXP,
  onNavigate
}) => {
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [flaggedQuestionIds, setFlaggedQuestionIds] = useState<Record<string, boolean>>({});
  
  // Timer (30 minutes default)
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize a balanced exam: 6 from Lesson 1, 6 from Lesson 2, 6 from Lesson 3 = 18 standard MCQs
  const generateNewExam = () => {
    const l1 = [...LESSON_1_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 7);
    const l2 = [...LESSON_2_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 7);
    const l3 = [...LESSON_3_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 6);

    const fullExam = [...l1, ...l2, ...l3].sort(() => Math.random() - 0.5);
    setExamQuestions(fullExam);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setFlaggedQuestionIds({});
    setSecondsRemaining(30 * 60);
    setIsExamSubmitted(false);
    setShowConfirmModal(false);
    setReviewMode(false);
  };

  useEffect(() => {
    generateNewExam();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isExamSubmitted && secondsRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && !isExamSubmitted) {
      // Auto submit on time out
      handleSubmitExam();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [secondsRemaining, isExamSubmitted]);

  const activeQ = examQuestions[currentQuestionIndex];

  const handleSelectOption = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (isExamSubmitted || !activeQ) return;
    soundManager.playClick();
    setUserAnswers(prev => ({
      ...prev,
      [activeQ.id]: choice
    }));
  };

  const handleToggleFlag = () => {
    if (!activeQ) return;
    soundManager.playClick();
    setFlaggedQuestionIds(prev => ({
      ...prev,
      [activeQ.id]: !prev[activeQ.id]
    }));
  };

  const unansweredCount = examQuestions.filter(q => !userAnswers[q.id]).length;

  const handleRequestSubmit = () => {
    soundManager.playClick();
    setShowConfirmModal(true);
  };

  const handleSubmitExam = () => {
    setShowConfirmModal(false);
    setIsExamSubmitted(true);

    let correctCount = 0;
    const details = examQuestions.map(q => {
      const userAns = userAnswers[q.id];
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) correctCount += 1;
      onRecordAnswer(q.id, isCorrect, userAns);
      return {
        questionId: q.id,
        userAnswer: userAns || '',
        isCorrect
      };
    });

    const score10 = Number(((correctCount / examQuestions.length) * 10).toFixed(1));
    const timeSpent = (30 * 60) - secondsRemaining;

    onAddExamResult({
      id: `exam_${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN'),
      score: score10,
      totalQuestions: examQuestions.length,
      correctCount,
      timeSpentSeconds: timeSpent,
      details
    });

    if (score10 >= 8) {
      soundManager.playVictory();
      fireConfetti();
      onAddXP(100);
    } else {
      soundManager.playCorrect();
      onAddXP(50);
    }
  };

  // Exam Score calculation
  const correctCount = examQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;
  const wrongCount = examQuestions.length - correctCount;
  const score10 = Number(((correctCount / examQuestions.length) * 10).toFixed(1));
  const accuracy = Math.round((correctCount / examQuestions.length) * 100);
  const timeSpent = (30 * 60) - secondsRemaining;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { soundManager.playClick(); onBack(); }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-400 font-serif-title uppercase flex items-center gap-2">
              <span>📝</span> Thi Thử Giữa Học Kỳ I
            </h1>
            <p className="text-xs text-slate-400">
              Đề thi 20 câu chuẩn đề cương, phân bổ đều 3 bài học chính (Thang điểm 10)
            </p>
          </div>
        </div>

        {/* Live Timer & Submit */}
        {!isExamSubmitted ? (
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm font-black border ${
              secondsRemaining < 300 
                ? 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse' 
                : 'bg-slate-900 text-amber-300 border-slate-700'
            }`}>
              <Timer className="w-4 h-4" />
              <span>
                {Math.floor(secondsRemaining / 60).toString().padStart(2, '0')}:
                {(secondsRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={handleRequestSubmit}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Send className="w-4 h-4" />
              <span>NỘP BÀI</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={generateNewExam}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Làm Đề Khác
            </button>
          </div>
        )}
      </div>

      {!isExamSubmitted ? (
        /* Exam In-Progress Screen */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Panel (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {activeQ && (
              <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
                {/* Question metadata header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="font-bold text-amber-400 bg-amber-500/15 px-3 py-1 rounded-xl">
                    Câu {currentQuestionIndex + 1} / {examQuestions.length}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleFlag}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                        flaggedQuestionIds[activeQ.id]
                          ? 'bg-purple-950 text-purple-300 border-purple-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Flag className={`w-3.5 h-3.5 ${flaggedQuestionIds[activeQ.id] ? 'fill-current text-purple-400' : ''}`} />
                      <span>{flaggedQuestionIds[activeQ.id] ? 'Đã gắn cờ xem lại' : 'Đánh dấu xem lại'}</span>
                    </button>
                  </div>
                </div>

                {/* Question Statement */}
                <h2 className="text-base sm:text-xl font-bold text-slate-100 leading-relaxed">
                  {activeQ.question}
                </h2>

                {/* 4 Options */}
                <div className="grid grid-cols-1 gap-3.5">
                  {(['A', 'B', 'C', 'D'] as const).map(letter => {
                    const isSelected = userAnswers[activeQ.id] === letter;

                    return (
                      <button
                        key={letter}
                        onClick={() => handleSelectOption(letter)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 text-left cursor-pointer active:scale-98 ${
                          isSelected
                            ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-md ring-2 ring-amber-500/20'
                            : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black border-amber-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {letter}
                        </div>
                        <div className="flex-1 font-medium text-sm sm:text-base leading-snug">
                          {activeQ.options[letter]}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Prev / Next Question Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentQuestionIndex(prev => prev - 1);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      currentQuestionIndex === 0
                        ? 'opacity-40 text-slate-600 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  <button
                    disabled={currentQuestionIndex === examQuestions.length - 1}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentQuestionIndex(prev => prev + 1);
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      currentQuestionIndex === examQuestions.length - 1
                        ? 'opacity-40 text-slate-600 cursor-not-allowed'
                        : 'bg-amber-600 hover:bg-amber-500 text-slate-950 cursor-pointer'
                    }`}
                  >
                    <span>Câu tiếp</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Palette Sidebar on the Right */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-4 h-fit">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800">
              DANH SÁCH CÂU HỎI
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700" /> Chưa làm
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-400" /> Đã làm
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-600 border border-purple-400" /> 🚩 Gắn cờ
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300" /> Đang chọn
              </span>
            </div>

            {/* Question numbers grid */}
            <div className="grid grid-cols-5 gap-2">
              {examQuestions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = !!flaggedQuestionIds[q.id];

                let btnClass = 'bg-slate-950 text-slate-400 border-slate-800';

                if (isAnswered) {
                  btnClass = 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60 font-bold';
                }
                if (isFlagged) {
                  btnClass = 'bg-purple-950/80 text-purple-300 border-purple-500 font-bold';
                }
                if (isCurrent) {
                  btnClass = 'bg-amber-500 text-slate-950 border-amber-300 font-black ring-2 ring-amber-500/40';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentQuestionIndex(idx);
                    }}
                    className={`h-9 rounded-xl border flex items-center justify-center text-xs transition-all cursor-pointer relative ${btnClass}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400 ring-1 ring-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={handleRequestSubmit}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Nộp Bài Thi
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results Report Screen */
        <div className="space-y-6 animate-scaleUp">
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border-2 border-amber-500/50 text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 text-4xl flex items-center justify-center mx-auto shadow-lg shadow-amber-950/50">
              {score10 >= 8 ? '🏆' : score10 >= 5 ? '🎯' : '📚'}
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                KẾT QUẢ BÀI THI THỬ GIỮA HỌC KỲ I
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 font-serif-title">
                {score10} / 10 ĐIỂM
              </h2>
              <p className="text-slate-300 text-sm">
                {score10 >= 8 
                  ? 'Tuyệt vời! Kiến thức của bạn rất vững vàng, sẵn sàng cho bài kiểm tra chính thức!' 
                  : 'Hãy ôn lại các câu đã làm sai để đạt kết quả trọn vẹn 10 điểm nhé!'}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-semibold">TỔNG SỐ CÂU</span>
                <strong className="text-xl font-bold text-slate-100">{examQuestions.length} câu</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-900/50">
                <span className="text-[11px] text-emerald-400 block font-semibold">SỐ CÂU ĐÚNG</span>
                <strong className="text-xl font-bold text-emerald-400">{correctCount} câu</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-900/50">
                <span className="text-[11px] text-rose-400 block font-semibold">SỐ CÂU SAI</span>
                <strong className="text-xl font-bold text-rose-400">{wrongCount} câu</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-900/50">
                <span className="text-[11px] text-amber-400 block font-semibold">THỜI GIAN LÀM</span>
                <strong className="text-xl font-bold text-amber-300">
                  {Math.floor(timeSpent / 60)}p {timeSpent % 60}s
                </strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setReviewMode(prev => !prev)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>{reviewMode ? 'Thu gọn xem lại' : '📖 XEM LẠI CHI TIẾT BÀI THI'}</span>
              </button>

              <button
                onClick={generateNewExam}
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>🔄 LÀM ĐỀ THI KHÁC</span>
              </button>

              {wrongCount > 0 && (
                <button
                  onClick={() => onNavigate('wrong_notebook')}
                  className="px-6 py-3 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>🎯 ÔN TẬP CÂU SAI ({wrongCount} câu)</span>
                </button>
              )}
            </div>
          </div>

          {/* Full Exam Review Detailed List */}
          {reviewMode && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <span>Chi Tiết Từng Câu Hỏi & Đáp Án Giải Thích:</span>
              </h3>

              <div className="space-y-4">
                {examQuestions.map((q, idx) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border-2 space-y-3 bg-slate-900/95 ${
                        isCorrect ? 'border-emerald-500/40' : 'border-rose-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                        <span className="font-bold text-slate-300">
                          Câu {idx + 1} ({q.lessonName})
                        </span>
                        <span className={`font-bold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {isCorrect ? 'Đúng' : 'Chưa đúng'}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-semibold text-slate-100">
                        {q.question}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {(['A', 'B', 'C', 'D'] as const).map(letter => {
                          const isOptionCorrect = letter === q.correctAnswer;
                          const isUserChoice = userAns === letter;

                          let itemStyle = 'bg-slate-950 border-slate-800 text-slate-400';
                          if (isOptionCorrect) {
                            itemStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isUserChoice && !isOptionCorrect) {
                            itemStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 font-bold';
                          }

                          return (
                            <div key={letter} className={`p-2.5 rounded-xl border flex items-start gap-2 ${itemStyle}`}>
                              <strong>{letter}.</strong>
                              <span>{q.options[letter]}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                        <strong className="text-amber-400">Giải thích: </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal Before Submission */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto text-2xl">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-100">Xác Nhận Nộp Bài Thi</h3>
              {unansweredCount > 0 ? (
                <p className="text-rose-300 text-xs sm:text-sm font-medium">
                  Bạn vẫn còn <strong className="text-rose-400 font-bold">{unansweredCount}</strong> câu chưa trả lời. Bạn có chắc chắn muốn nộp bài ngay bây giờ?
                </p>
              ) : (
                <p className="text-slate-300 text-xs sm:text-sm">
                  Bạn đã trả lời đầy đủ tất cả {examQuestions.length} câu hỏi. Bạn có chắc chắn muốn nộp bài để xem điểm?
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
