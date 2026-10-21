import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Flame, CheckCircle2, XCircle, RotateCcw, Timer, Award } from 'lucide-react';
import { Question } from '../../types';
import { ALL_QUESTIONS } from '../../data/historyQuestions';
import { soundManager } from '../../utils/soundEffects';
import { fireConfetti } from '../../utils/confetti';

interface Game1SpeedProps {
  onBack: () => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean, userAnswerLetter?: string) => void;
  onAddXP: (amount: number) => void;
}

export const Game1Speed: React.FC<Game1SpeedProps> = ({ onBack, onRecordAnswer, onAddXP }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [bonusEarned, setBonusEarned] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize random 15 questions
  const initGame = () => {
    const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 15);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setBonusEarned(0);
    setIsFinished(false);
    setStartTime(Date.now());
  };

  useEffect(() => {
    initGame();
  }, []);

  const currentQ = shuffledQuestions[currentIndex];

  const handleSelect = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !currentQ) return;

    const answerTimeSeconds = (Date.now() - startTime) / 1000;
    setSelectedAnswer(choice);
    setIsAnswered(true);

    const isCorrect = choice === currentQ.correctAnswer;

    if (isCorrect) {
      soundManager.playCorrect();
      const speedBonus = answerTimeSeconds <= 5 ? 5 : 0;
      const points = 10 + speedBonus;
      setScore(prev => prev + points);
      setStreak(prev => {
        const nextStreak = prev + 1;
        if (nextStreak === 5) {
          soundManager.playStreak();
          fireConfetti();
        }
        return nextStreak;
      });
      setBonusEarned(speedBonus);
      onAddXP(points);
    } else {
      soundManager.playWrong();
      setStreak(0);
      setBonusEarned(0);
    }

    onRecordAnswer(currentQ.id, isCorrect, choice);
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setBonusEarned(0);
      setStartTime(Date.now());
    } else {
      setIsFinished(true);
      soundManager.playVictory();
      fireConfetti();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { soundManager.playClick(); onBack(); }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-400 font-serif-title uppercase flex items-center gap-2">
              <span>🎯</span> Chọn Nhanh Đáp Án
            </h1>
            <p className="text-xs text-slate-400">Trả lời trong 5s đầu để nhận thêm +5 điểm thưởng tốc độ!</p>
          </div>
        </div>

        {/* Score & Streak Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-300 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{score} điểm</span>
          </div>
          {streak >= 3 && (
            <div className="flex items-center gap-1 bg-rose-500/20 border border-rose-500/40 px-2.5 py-1.5 rounded-xl text-rose-300 font-bold text-xs animate-bounce">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Chuỗi {streak}🔥</span>
            </div>
          )}
        </div>
      </div>

      {!isFinished ? (
        currentQ && (
          <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Top question tracker */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                Câu {currentIndex + 1} / {shuffledQuestions.length}
              </span>
              <span className="truncate max-w-[200px] sm:max-w-none text-slate-400">
                {currentQ.lessonName}
              </span>
            </div>

            {/* Question title */}
            <h2 className="text-lg sm:text-2xl font-bold text-slate-100 leading-relaxed">
              {currentQ.question}
            </h2>

            {/* 4 Large Choice Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(['A', 'B', 'C', 'D'] as const).map(letter => {
                const isSelected = selectedAnswer === letter;
                const isCorrect = letter === currentQ.correctAnswer;

                let cardStyle = 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200';
                let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

                if (isAnswered) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30';
                    badgeStyle = 'bg-emerald-500 text-slate-950 font-black border-emerald-400';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'bg-rose-950 border-rose-500 text-rose-200 ring-2 ring-rose-500/30';
                    badgeStyle = 'bg-rose-500 text-slate-950 font-black border-rose-400';
                  } else {
                    cardStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                  }
                }

                return (
                  <button
                    key={letter}
                    disabled={isAnswered}
                    onClick={() => handleSelect(letter)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 text-left cursor-pointer active:scale-98 ${cardStyle}`}
                  >
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-base shrink-0 ${badgeStyle}`}>
                      {isAnswered && isCorrect ? '✓' : isAnswered && isSelected && !isCorrect ? '✕' : letter}
                    </div>
                    <div className="flex-1 font-semibold text-sm sm:text-base leading-snug">
                      {currentQ.options[letter]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation Box */}
            {isAnswered && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 font-black text-sm sm:text-base">
                        <CheckCircle2 className="w-5 h-5" /> CHÍNH XÁC! +10đ
                        {bonusEarned > 0 && <span className="text-yellow-400">(+5đ Siêu Tốc ⚡)</span>}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-rose-400 font-black text-sm sm:text-base">
                        <XCircle className="w-5 h-5" /> CHƯA ĐÚNG! (Đáp án đúng là: {currentQ.correctAnswer})
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <strong className="text-amber-400">Giải thích: </strong>
                  {currentQ.explanation}
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <span>{currentIndex + 1 < shuffledQuestions.length ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        /* Victory Screen */
        <div className="text-center py-12 px-6 rounded-3xl bg-slate-900 border-2 border-amber-500/40 space-y-6 shadow-2xl animate-scaleUp">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 text-4xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            🏆
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-300 font-serif-title uppercase">
              Hoàn Thành Thử Thách Chọn Nhanh!
            </h2>
            <p className="text-slate-400 text-sm mt-1">Bạn đã trả lời xuất sắc 15 câu hỏi trắc nghiệm</p>
          </div>

          <div className="inline-block p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tổng điểm đạt được</span>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 mt-1">
              {score} ĐIỂM
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={initGame}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Chơi Lại Lượt Mới
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
