import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Shuffle, Award, HelpCircle, RotateCcw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Question } from '../../types';
import { ALL_QUESTIONS } from '../../data/historyQuestions';
import { soundManager } from '../../utils/soundEffects';
import { fireConfetti, fireSuperConfetti } from '../../utils/confetti';

interface Game3MillionaireProps {
  onBack: () => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean, userAnswerLetter?: string) => void;
  onAddXP: (amount: number) => void;
}

const MONEY_LADDER = [
  { level: 1, points: '100', raw: 100 },
  { level: 2, points: '200', raw: 200 },
  { level: 3, points: '300', raw: 300 },
  { level: 4, points: '500', raw: 500 },
  { level: 5, points: '1.000', raw: 1000, isCheckpoint: true },
  { level: 6, points: '2.000', raw: 2000 },
  { level: 7, points: '4.000', raw: 4000 },
  { level: 8, points: '8.000', raw: 8000 },
  { level: 9, points: '16.000', raw: 16000 },
  { level: 10, points: '32.000', raw: 32000, isCheckpoint: true },
  { level: 11, points: '64.000', raw: 64000 },
  { level: 12, points: '125.000', raw: 125000 },
  { level: 13, points: '250.000', raw: 250000 },
  { level: 14, points: '500.000', raw: 500000 },
  { level: 15, points: '1.000.000', raw: 1000000, isCheckpoint: true }
];

export const Game3Millionaire: React.FC<Game3MillionaireProps> = ({ onBack, onRecordAnswer, onAddXP }) => {
  const [currentLevel, setCurrentLevel] = useState(1); // 1 to 15
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [audiencePoll, setAudiencePoll] = useState<Record<string, number> | null>(null);

  // Lifelines availability
  const [used5050, setUsed5050] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  const [usedSwap, setUsedSwap] = useState(false);

  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  // Initialize ladder of 15 questions
  const initGame = () => {
    const easy = ALL_QUESTIONS.filter(q => q.difficulty === 'easy').sort(() => Math.random() - 0.5);
    const med = ALL_QUESTIONS.filter(q => q.difficulty === 'medium').sort(() => Math.random() - 0.5);
    const hard = ALL_QUESTIONS.filter(q => q.difficulty === 'hard').sort(() => Math.random() - 0.5);

    // Pick 5 easy, 6 medium, 4 hard
    const ladderQuestions = [
      ...easy.slice(0, 5),
      ...med.slice(0, 6),
      ...hard.slice(0, 4)
    ];

    // If not enough hard, fill from remaining
    if (ladderQuestions.length < 15) {
      const remaining = ALL_QUESTIONS.filter(q => !ladderQuestions.includes(q)).sort(() => Math.random() - 0.5);
      while (ladderQuestions.length < 15 && remaining.length > 0) {
        ladderQuestions.push(remaining.pop()!);
      }
    }

    setCurrentQuestions(ladderQuestions);
    setCurrentLevel(1);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setEliminatedOptions([]);
    setAudiencePoll(null);
    setUsed5050(false);
    setUsedAudience(false);
    setUsedSwap(false);
    setGameOver(false);
    setIsWinner(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const activeQuestion = currentQuestions[currentLevel - 1];

  // Lifeline: 50:50
  const handleUse5050 = () => {
    if (used5050 || isAnswered || !activeQuestion) return;
    soundManager.playClick();
    setUsed5050(true);

    const wrongOptions = (['A', 'B', 'C', 'D'] as const).filter(k => k !== activeQuestion.correctAnswer);
    // Shuffle and pick 2 to eliminate
    const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5);
    setEliminatedOptions([shuffledWrong[0], shuffledWrong[1]]);
  };

  // Lifeline: Ask Audience
  const handleUseAudience = () => {
    if (usedAudience || isAnswered || !activeQuestion) return;
    soundManager.playClick();
    setUsedAudience(true);

    // Make correct option high percentage e.g. 65-80%
    const correctPct = Math.floor(Math.random() * 20) + 65;
    const remainingPct = 100 - correctPct;
    const part1 = Math.floor(remainingPct * 0.4);
    const part2 = Math.floor(remainingPct * 0.35);
    const part3 = remainingPct - part1 - part2;

    const wrongOptions = (['A', 'B', 'C', 'D'] as const).filter(k => k !== activeQuestion.correctAnswer);
    const poll: Record<string, number> = {
      [activeQuestion.correctAnswer]: correctPct,
      [wrongOptions[0]]: part1,
      [wrongOptions[1]]: part2,
      [wrongOptions[2]]: part3
    };
    setAudiencePoll(poll);
  };

  // Lifeline: Swap Question
  const handleUseSwap = () => {
    if (usedSwap || isAnswered || !activeQuestion) return;
    soundManager.playClick();
    setUsedSwap(true);

    // Find another question not currently in the ladder
    const currentIds = currentQuestions.map(q => q.id);
    const available = ALL_QUESTIONS.filter(q => !currentIds.includes(q.id));
    if (available.length > 0) {
      const newQ = available[Math.floor(Math.random() * available.length)];
      setCurrentQuestions(prev => {
        const copy = [...prev];
        copy[currentLevel - 1] = newQ;
        return copy;
      });
      setEliminatedOptions([]);
      setAudiencePoll(null);
    }
  };

  const handleSelectAnswer = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !activeQuestion || eliminatedOptions.includes(choice)) return;

    setSelectedAnswer(choice);
    setIsAnswered(true);

    const isCorrect = choice === activeQuestion.correctAnswer;
    onRecordAnswer(activeQuestion.id, isCorrect, choice);

    if (isCorrect) {
      soundManager.playCorrect();
      onAddXP(currentLevel * 10);

      if (currentLevel === 15) {
        // WON THE GAME!
        setIsWinner(true);
        setGameOver(true);
        soundManager.playVictory();
        fireSuperConfetti();
      }
    } else {
      soundManager.playWrong();
      setGameOver(true);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentLevel < 15) {
      setCurrentLevel(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setEliminatedOptions([]);
      setAudiencePoll(null);
    }
  };

  // Safe checkpoint milestone reward
  const getGuaranteedScore = () => {
    if (currentLevel >= 15 && isWinner) return '1.000.000';
    if (currentLevel > 10) return '32.000';
    if (currentLevel > 5) return '1.000';
    return '0';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
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
            <h1 className="text-xl sm:text-2xl font-black text-yellow-400 font-serif-title uppercase flex items-center gap-2">
              <span>💰</span> Ai Là Triệu Phú Lịch Sử
            </h1>
            <p className="text-xs text-slate-400">15 câu hỏi chinh phục mốc 1.000.000 điểm vinh quang</p>
          </div>
        </div>

        {/* 3 Lifelines */}
        <div className="flex items-center gap-2">
          {/* 50:50 */}
          <button
            disabled={used5050 || isAnswered || gameOver}
            onClick={handleUse5050}
            className={`px-3 py-2 rounded-xl font-bold text-xs border flex items-center gap-1 transition-all ${
              used5050 
                ? 'bg-slate-900/40 text-slate-600 border-slate-800 opacity-50 cursor-not-allowed'
                : 'bg-yellow-950/60 hover:bg-yellow-900 border-yellow-500/40 text-yellow-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm'
            }`}
            title="Trợ giúp 50:50 (Loại 2 phương án sai)"
          >
            <span className="font-black text-sm">50:50</span>
          </button>

          {/* Ask Audience */}
          <button
            disabled={usedAudience || isAnswered || gameOver}
            onClick={handleUseAudience}
            className={`px-3 py-2 rounded-xl font-bold text-xs border flex items-center gap-1 transition-all ${
              usedAudience 
                ? 'bg-slate-900/40 text-slate-600 border-slate-800 opacity-50 cursor-not-allowed'
                : 'bg-yellow-950/60 hover:bg-yellow-900 border-yellow-500/40 text-yellow-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm'
            }`}
            title="Hỏi ý kiến khán giả"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Khán giả</span>
          </button>

          {/* Swap Question */}
          <button
            disabled={usedSwap || isAnswered || gameOver}
            onClick={handleUseSwap}
            className={`px-3 py-2 rounded-xl font-bold text-xs border flex items-center gap-1 transition-all ${
              usedSwap 
                ? 'bg-slate-900/40 text-slate-600 border-slate-800 opacity-50 cursor-not-allowed'
                : 'bg-yellow-950/60 hover:bg-yellow-900 border-yellow-500/40 text-yellow-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm'
            }`}
            title="Đổi câu hỏi khác"
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden sm:inline">Đổi câu</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Game Arena */}
        <div className="lg:col-span-3 space-y-6">
          {!gameOver ? (
            activeQuestion && (
              <div className="bg-slate-900 rounded-3xl border-2 border-yellow-600/30 p-6 sm:p-8 space-y-6 shadow-2xl">
                {/* Level status */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-yellow-500/20 text-yellow-300 font-black text-sm">
                      CÂU HỎI SỐ {currentLevel} / 15
                    </span>
                    <span className="text-xs text-slate-400">
                      Mốc: <strong>{MONEY_LADDER[currentLevel - 1].points} điểm</strong>
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                    Bảo toàn: {getGuaranteedScore()}đ
                  </span>
                </div>

                {/* Audience Poll Widget */}
                {audiencePoll && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-yellow-500/30 space-y-2 animate-fadeIn">
                    <div className="text-xs font-bold text-yellow-300 flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> KẾT QUẢ KHẢO SÁT KHÁN GIẢ TRƯỜNG QUAY:
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {(['A', 'B', 'C', 'D'] as const).map(k => (
                        <div key={k} className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="font-black text-slate-300 block">{k}</span>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full my-1 overflow-hidden">
                            <div className="bg-yellow-400 h-full rounded-full" style={{ width: `${audiencePoll[k]}%` }} />
                          </div>
                          <span className="font-bold text-yellow-400">{audiencePoll[k]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question title */}
                <div className="py-2">
                  <h2 className="text-lg sm:text-2xl font-bold text-slate-100 leading-relaxed text-center sm:text-left">
                    {activeQuestion.question}
                  </h2>
                </div>

                {/* 4 Choice Hexagons/Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(['A', 'B', 'C', 'D'] as const).map(letter => {
                    const isSelected = selectedAnswer === letter;
                    const isCorrect = letter === activeQuestion.correctAnswer;
                    const isEliminated = eliminatedOptions.includes(letter);

                    let cardClass = 'bg-slate-950/80 hover:bg-slate-800/90 border-slate-800 text-slate-200';
                    let badgeClass = 'bg-slate-800 text-slate-300 border-slate-700';

                    if (isEliminated) {
                      cardClass = 'opacity-20 border-dashed border-slate-900 bg-transparent text-slate-600 cursor-not-allowed';
                    } else if (isAnswered) {
                      if (isCorrect) {
                        cardClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 animate-pulse';
                        badgeClass = 'bg-emerald-500 text-slate-950 font-black border-emerald-400';
                      } else if (isSelected && !isCorrect) {
                        cardClass = 'bg-rose-950 border-rose-500 text-rose-200';
                        badgeClass = 'bg-rose-500 text-slate-950 font-black border-rose-400';
                      } else {
                        cardClass = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={letter}
                        disabled={isAnswered || isEliminated}
                        onClick={() => handleSelectAnswer(letter)}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 text-left cursor-pointer active:scale-98 ${cardClass}`}
                      >
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 ${badgeClass}`}>
                          {letter}
                        </div>
                        <div className="flex-1 font-semibold text-sm sm:text-base leading-snug">
                          {isEliminated ? '---' : activeQuestion.options[letter]}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Next Step Button (if correct) */}
                {isAnswered && selectedAnswer === activeQuestion.correctAnswer && (
                  <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-between animate-fadeIn">
                    <span className="text-emerald-300 font-bold text-sm sm:text-base flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      CHÍNH XÁC! Bạn đạt mốc {MONEY_LADDER[currentLevel - 1].points} điểm!
                    </span>
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-black text-sm hover:scale-105 transition-all cursor-pointer shadow-lg"
                    >
                      Tiếp Tục →
                    </button>
                  </div>
                )}
              </div>
            )
          ) : (
            /* Game Over / Victory Report */
            <div className="text-center py-10 px-6 rounded-3xl bg-slate-900 border-2 border-yellow-500/40 space-y-6 shadow-2xl animate-scaleUp">
              <div className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-500 text-4xl flex items-center justify-center mx-auto shadow-lg shadow-yellow-500/20">
                {isWinner ? '👑' : '🏛️'}
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-yellow-300 font-serif-title uppercase">
                  {isWinner ? 'BẠN LÀ TRIỆU PHÚ LỊCH SỬ!' : 'DỪNG CUỘC CHƠI!'}
                </h2>
                <p className="text-slate-300 text-sm mt-1">
                  {isWinner ? 'Xuất sắc vượt qua cả 15 câu hỏi của đấu trường lịch sử!' : `Bạn đã dừng chân tại câu hỏi số ${currentLevel}.`}
                </p>
              </div>

              {/* Show correct answer & explanation on loss */}
              {!isWinner && activeQuestion && (
                <div className="text-left p-4 sm:p-5 rounded-2xl bg-slate-950 border border-rose-500/30 max-w-xl mx-auto space-y-2">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> ĐÁP ÁN ĐÚNG CỦA CÂU HỎI:
                  </span>
                  <p className="text-sm font-semibold text-emerald-300">
                    {activeQuestion.correctAnswer}. {activeQuestion.options[activeQuestion.correctAnswer]}
                  </p>
                  <p className="text-xs text-slate-400 pt-1 border-t border-slate-800">
                    {activeQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="inline-block p-6 rounded-2xl bg-slate-950 border border-yellow-500/40">
                <span className="text-xs text-yellow-400 font-bold uppercase tracking-wider block">Điểm thưởng bảo toàn</span>
                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mt-1">
                  {getGuaranteedScore()} ĐIỂM
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={initGame}
                  className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-yellow-950/40"
                >
                  <RotateCcw className="w-4 h-4" /> Chơi Lại Từ Đầu
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all cursor-pointer"
                >
                  Quay Lại Sảnh
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 15 Milestone Ladder Sidebar */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 space-y-2 h-fit">
          <h3 className="text-xs font-black uppercase tracking-wider text-yellow-400 text-center pb-2 border-b border-slate-800 flex items-center justify-center gap-1.5">
            <Award className="w-4 h-4" /> 15 BẬC DANH VỌNG
          </h3>

          <div className="flex flex-col-reverse gap-1">
            {MONEY_LADDER.map(step => {
              const isCurrent = step.level === currentLevel && !gameOver;
              const isPassed = step.level < currentLevel;

              let itemStyle = 'text-slate-400 bg-slate-950/40 border-slate-800/40';

              if (step.isCheckpoint) {
                itemStyle = 'text-yellow-400 font-bold bg-yellow-950/20 border-yellow-600/30';
              }
              if (isPassed) {
                itemStyle = 'text-emerald-400 font-semibold bg-emerald-950/20 border-emerald-800/30';
              }
              if (isCurrent) {
                itemStyle = 'bg-yellow-500 text-slate-950 font-black shadow-md border-yellow-400 scale-[1.03]';
              }

              return (
                <div
                  key={step.level}
                  className={`px-3 py-1.5 rounded-xl border flex items-center justify-between text-xs transition-all ${itemStyle}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 text-right font-mono text-[11px] opacity-80">{step.level}</span>
                    {step.isCheckpoint && <span className="text-[10px]">⭐</span>}
                  </div>
                  <span className="font-mono">{step.points}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
