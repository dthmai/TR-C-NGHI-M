import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Timer, Flame, Sparkles, RotateCcw, Award, CheckCircle2, XCircle } from 'lucide-react';
import { Question } from '../../types';
import { ALL_QUESTIONS } from '../../data/historyQuestions';
import { soundManager } from '../../utils/soundEffects';
import { fireConfetti } from '../../utils/confetti';

interface Game2SixtySecondsProps {
  onBack: () => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean, userAnswerLetter?: string) => void;
  onAddXP: (amount: number) => void;
}

export const Game2SixtySeconds: React.FC<Game2SixtySecondsProps> = ({ onBack, onRecordAnswer, onAddXP }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeLeft(60);
    setIsTimeUp(false);
    setIsPlaying(true);
    soundManager.playVictory();
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        if (timeLeft <= 5 && timeLeft > 1) {
          soundManager.playTick();
        }
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setIsTimeUp(true);
      soundManager.playVictory();
      fireConfetti();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  const currentQ = questions[currentIndex % questions.length];

  const handleAnswer = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (!isPlaying || !currentQ) return;

    const isCorrect = choice === currentQ.correctAnswer;
    onRecordAnswer(currentQ.id, isCorrect, choice);

    if (isCorrect) {
      soundManager.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setCorrectCount(prev => prev + 1);

      // Combo multiplier:
      // 5+ streak: combo x3 (30 pts)
      // 3-4 streak: combo x2 (20 pts)
      // else: 10 pts
      let multiplier = 1;
      if (newStreak >= 5) {
        multiplier = 3;
        soundManager.playStreak();
      } else if (newStreak >= 3) {
        multiplier = 2;
      }
      const gained = 10 * multiplier;
      setScore(prev => prev + gained);
      onAddXP(gained);
    } else {
      soundManager.playWrong();
      setStreak(0);
      setWrongCount(prev => prev + 1);
    }

    // Move to next question immediately
    setCurrentIndex(prev => prev + 1);
  };

  const totalAnswered = correctCount + wrongCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { soundManager.playClick(); onBack(); }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-rose-400 font-serif-title uppercase flex items-center gap-2">
              <span>⏱️</span> 60 Giây Thử Thách
            </h1>
            <p className="text-xs text-slate-400">Trả lời nhanh liên tục để nhân đôi (x2), nhân ba (x3) điểm số!</p>
          </div>
        </div>

        {/* Live Status */}
        {isPlaying && (
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-black text-sm border ${
              timeLeft <= 10 ? 'bg-rose-950/90 text-rose-400 border-rose-500 animate-pulse' : 'bg-slate-900 text-amber-300 border-slate-700'
            }`}>
              <Timer className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>

            <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{score}đ</span>
            </div>

            {streak >= 3 && (
              <div className="flex items-center gap-1 bg-rose-600/30 border border-rose-500/60 px-2.5 py-1.5 rounded-xl text-rose-300 font-bold text-xs animate-bounce">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>COMBO x{streak >= 5 ? 3 : 2} 🔥</span>
              </div>
            )}
          </div>
        )}
      </div>

      {!isPlaying && !isTimeUp ? (
        /* Ready Screen */
        <div className="text-center py-12 px-6 rounded-3xl bg-slate-900 border-2 border-slate-800 space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500 text-4xl flex items-center justify-center mx-auto shadow-lg shadow-rose-900/30 animate-pulse">
            ⏱️
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-rose-300 font-serif-title uppercase">
              Sẵn Sàng Trong 60 Giây?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Câu hỏi xuất hiện liên tục không ngừng. Trả lời đúng nhận +10đ. Đúng liên tiếp 3 câu nhận COMBO x2, 5 câu nhận COMBO x3!
            </p>
          </div>

          <button
            onClick={startGame}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-lg shadow-xl shadow-rose-900/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            🔥 BẮT ĐẦU NGAY!
          </button>
        </div>
      ) : isPlaying ? (
        /* Playing Question Screen */
        currentQ && (
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Top progress bar for 60s */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div 
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 10 ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-rose-500'
                }`}
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-amber-400">Câu hỏi #{currentIndex + 1}</span>
              <span>Đúng: <strong className="text-emerald-400">{correctCount}</strong> | Sai: <strong className="text-rose-400">{wrongCount}</strong></span>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-2xl font-bold text-slate-100 leading-relaxed min-h-[64px]">
              {currentQ.question}
            </h2>

            {/* 4 Large Choice Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(['A', 'B', 'C', 'D'] as const).map(letter => (
                <button
                  key={letter}
                  onClick={() => handleAnswer(letter)}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 hover:bg-slate-800 border-2 border-slate-800 hover:border-rose-500/60 text-slate-100 transition-all flex items-start gap-3.5 text-left cursor-pointer active:scale-98 group"
                >
                  <div className="w-9 h-9 rounded-xl border border-slate-700 group-hover:border-rose-400 bg-slate-900 flex items-center justify-center font-bold text-base text-rose-300 shrink-0">
                    {letter}
                  </div>
                  <div className="flex-1 font-medium text-sm sm:text-base leading-snug">
                    {currentQ.options[letter]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      ) : (
        /* Time's Up Screen */
        <div className="text-center py-10 px-6 rounded-3xl bg-slate-900 border-2 border-rose-500/40 space-y-6 shadow-2xl animate-scaleUp">
          <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 font-black text-sm uppercase tracking-widest animate-pulse">
            ⏰ TIME'S UP!
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 font-serif-title uppercase">
            Hết Giờ! Kết Quả Của Bạn
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-semibold block">TỔNG CÂU</span>
              <strong className="text-2xl font-black text-slate-100">{totalAnswered}</strong>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/50">
              <span className="text-[11px] text-emerald-400 font-semibold block">SỐ ĐÚNG</span>
              <strong className="text-2xl font-black text-emerald-400">{correctCount}</strong>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/50">
              <span className="text-[11px] text-rose-400 font-semibold block">SỐ SAI</span>
              <strong className="text-2xl font-black text-rose-400">{wrongCount}</strong>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-900/50">
              <span className="text-[11px] text-amber-400 font-semibold block">ĐỘ CHÍNH XÁC</span>
              <strong className="text-2xl font-black text-amber-300">{accuracy}%</strong>
            </div>
          </div>

          <div className="inline-block p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-amber-950/40 to-rose-950/40 border border-amber-500/40">
            <span className="text-xs text-amber-300 font-bold block uppercase tracking-wider">Tổng Điểm Thử Thách</span>
            <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-400">
              {score} ĐIỂM
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-900/40"
            >
              <RotateCcw className="w-4 h-4" /> Thử Lại 60 Giây Khác
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all cursor-pointer"
            >
              Quay Lại Sảnh Trò Chơi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
