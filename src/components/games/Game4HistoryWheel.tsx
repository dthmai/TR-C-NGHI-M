import React, { useState, useRef } from 'react';
import { ArrowLeft, RotateCw, Sparkles, Flame, CheckCircle2, XCircle, Award } from 'lucide-react';
import { Question } from '../../types';
import { 
  LESSON_1_QUESTIONS, 
  LESSON_2_QUESTIONS, 
  LESSON_3_QUESTIONS,
  ALL_QUESTIONS 
} from '../../data/historyQuestions';
import { soundManager } from '../../utils/soundEffects';
import { fireConfetti } from '../../utils/confetti';

interface Game4HistoryWheelProps {
  onBack: () => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean, userAnswerLetter?: string) => void;
  onAddXP: (amount: number) => void;
}

interface WheelSlice {
  label: string;
  type: 'topic' | 'lucky' | 'double';
  topicId?: string;
  color: string;
  textColor: string;
}

const SLICES: WheelSlice[] = [
  { label: 'Cách mạng tư sản', type: 'topic', topicId: 'bai-1', color: '#b45309', textColor: '#ffffff' }, // amber-700
  { label: 'Chủ nghĩa tư bản', type: 'topic', topicId: 'bai-2', color: '#1d4ed8', textColor: '#ffffff' }, // blue-700
  { label: 'Cách mạng Nga', type: 'topic', topicId: 'bai-3', color: '#b91c1c', textColor: '#ffffff' },   // red-700
  { label: 'Liên Xô 1922', type: 'topic', topicId: 'bai-3', color: '#7e22ce', textColor: '#ffffff' },    // purple-700
  { label: '⭐ May mắn', type: 'lucky', color: '#eab308', textColor: '#0f172a' },                          // yellow-500
  { label: 'CNXH thế giới', type: 'topic', topicId: 'bai-4', color: '#047857', textColor: '#ffffff' },    // emerald-700
  { label: 'Trung Quốc 1978', type: 'topic', topicId: 'bai-4', color: '#c2410c', textColor: '#ffffff' },  // orange-700
  { label: '🔥 Nhân đôi điểm', type: 'double', color: '#be123c', textColor: '#ffffff' }                   // rose-700
];

export const Game4HistoryWheel: React.FC<Game4HistoryWheelProps> = ({ onBack, onRecordAnswer, onAddXP }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSlice, setSelectedSlice] = useState<WheelSlice | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);

  const numSlices = SLICES.length;
  const sliceAngle = 360 / numSlices;

  const handleSpin = () => {
    if (isSpinning) return;
    soundManager.playClick();
    setIsSpinning(true);
    setSelectedSlice(null);
    setActiveQuestion(null);
    setSelectedChoice(null);
    setIsAnswered(false);

    // Random spins: 5 to 8 full revolutions + random slice offset
    const randomExtra = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (360 * 5) + randomExtra;
    setRotation(totalRotation);

    // Play ticking ratchet sound
    const interval = setInterval(() => {
      soundManager.playWheelTick();
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setIsSpinning(false);

      // Determine winning slice at top pointer (270 deg or 0 deg depending on pointer position)
      // Pointer is at the top (angle 270 relative to standard coordinate or standard top pointer)
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const index = Math.floor(normalizedAngle / sliceAngle) % numSlices;
      const winner = SLICES[index];
      setSelectedSlice(winner);

      if (winner.type === 'lucky') {
        soundManager.playVictory();
        fireConfetti();
        const pts = 30 * multiplier;
        setTotalPoints(prev => prev + pts);
        onAddXP(pts);
        setMultiplier(1);
      } else if (winner.type === 'double') {
        soundManager.playStreak();
        setMultiplier(2);
      } else {
        // Pick a relevant question
        let pool = ALL_QUESTIONS;
        if (winner.topicId === 'bai-1') pool = LESSON_1_QUESTIONS;
        else if (winner.topicId === 'bai-2') pool = LESSON_2_QUESTIONS;
        else if (winner.topicId === 'bai-3') pool = LESSON_3_QUESTIONS;

        const randomQ = pool[Math.floor(Math.random() * pool.length)];
        setActiveQuestion(randomQ);
        soundManager.playTick();
      }
    }, 3500);
  };

  const handleAnswerChoice = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !activeQuestion) return;

    setSelectedChoice(choice);
    setIsAnswered(true);

    const isCorrect = choice === activeQuestion.correctAnswer;
    onRecordAnswer(activeQuestion.id, isCorrect, choice);

    if (isCorrect) {
      soundManager.playCorrect();
      fireConfetti();
      const pts = 15 * multiplier;
      setTotalPoints(prev => prev + pts);
      onAddXP(pts);
    } else {
      soundManager.playWrong();
    }
    setMultiplier(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { soundManager.playClick(); onBack(); }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-400 font-serif-title uppercase flex items-center gap-2">
              <span>🎡</span> Vòng Quay Lịch Sử
            </h1>
            <p className="text-xs text-slate-400">Thử vận may với các ô chủ đề, điểm thưởng may mắn và nhân đôi!</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {multiplier > 1 && (
            <div className="flex items-center gap-1 bg-rose-500/20 border border-rose-500/50 px-3 py-1.5 rounded-xl text-rose-300 font-bold text-xs animate-pulse">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>x{multiplier} ĐIỂM TIẾP THEO!</span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-300 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{totalPoints} điểm</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Wheel Display */}
        <div className="flex flex-col items-center justify-center relative p-4">
          {/* Wheel Pointer at top */}
          <div className="z-20 -mb-5 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-amber-400 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]" />

          {/* SVG Rotating Wheel */}
          <div 
            className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-amber-500/80 shadow-2xl shadow-amber-950/60 overflow-hidden relative"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {SLICES.map((slice, i) => {
                const startAngle = (i * 360) / numSlices;
                const endAngle = ((i + 1) * 360) / numSlices;

                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const midAngle = startAngle + (endAngle - startAngle) / 2;
                const tx = 50 + 32 * Math.cos((Math.PI * midAngle) / 180);
                const ty = 50 + 32 * Math.sin((Math.PI * midAngle) / 180);

                return (
                  <g key={i}>
                    <path
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                      fill={slice.color}
                      stroke="#0f172a"
                      strokeWidth="0.8"
                    />
                    <text
                      x={tx}
                      y={ty}
                      fill={slice.textColor}
                      fontSize="3.8"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle + 90}, ${tx}, ${ty})`}
                    >
                      {slice.label}
                    </text>
                  </g>
                );
              })}
              {/* Wheel Center Cap */}
              <circle cx="50" cy="50" r="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            </svg>
          </div>

          {/* Spin Trigger Button */}
          <button
            disabled={isSpinning}
            onClick={handleSpin}
            className={`mt-6 px-8 py-3.5 rounded-2xl font-black text-base flex items-center gap-2 shadow-xl cursor-pointer transition-all ${
              isSpinning 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60' 
                : 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 hover:scale-105 active:scale-95 shadow-amber-950/40'
            }`}
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'ĐANG QUAY...' : 'QUAY NGAY!'}</span>
          </button>
        </div>

        {/* Question or Event Outcome Box */}
        <div className="space-y-4">
          {selectedSlice && !activeQuestion && selectedSlice.type === 'lucky' && (
            <div className="p-6 rounded-2xl bg-yellow-950/50 border-2 border-yellow-500 text-center space-y-3 animate-fadeIn">
              <span className="text-4xl block">⭐</span>
              <h3 className="text-xl font-bold text-yellow-300">Ô MAY MẮN BẤT NGỜ!</h3>
              <p className="text-sm text-slate-200">Bạn được thưởng ngay +30 XP vào hồ sơ học sinh!</p>
              <button
                onClick={handleSpin}
                className="mt-3 px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs"
              >
                Quay Tiếp Lượt Mới
              </button>
            </div>
          )}

          {selectedSlice && !activeQuestion && selectedSlice.type === 'double' && (
            <div className="p-6 rounded-2xl bg-rose-950/50 border-2 border-rose-500 text-center space-y-3 animate-fadeIn">
              <span className="text-4xl block">🔥</span>
              <h3 className="text-xl font-bold text-rose-300">NHÂN ĐÔI ĐIỂM SỐ!</h3>
              <p className="text-sm text-slate-200">Câu hỏi ở vòng quay tiếp theo sẽ được nhân đôi (x2) điểm số!</p>
              <button
                onClick={handleSpin}
                className="mt-3 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Quay Để Lấy Câu Hỏi x2!
              </button>
            </div>
          )}

          {activeQuestion && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border-2 border-amber-500/40 space-y-4 shadow-xl animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/15">
                  {selectedSlice?.label}
                </span>
                <span className="text-slate-400">{multiplier > 1 ? '🔥 Câu hỏi x2 Điểm' : '+15đ'}</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                {activeQuestion.question}
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {(['A', 'B', 'C', 'D'] as const).map(letter => {
                  const isSelected = selectedChoice === letter;
                  const isCorrect = letter === activeQuestion.correctAnswer;

                  let style = 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800';
                  if (isAnswered) {
                    if (isCorrect) style = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                    else if (isSelected && !isCorrect) style = 'bg-rose-950 border-rose-500 text-rose-200';
                    else style = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                  }

                  return (
                    <button
                      key={letter}
                      disabled={isAnswered}
                      onClick={() => handleAnswerChoice(letter)}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-start gap-2.5 cursor-pointer transition-all ${style}`}
                    >
                      <strong className="shrink-0">{letter}.</strong>
                      <span>{activeQuestion.options[letter]}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 animate-fadeIn">
                  <p className="text-slate-300">
                    <strong className="text-amber-400">Đáp án: </strong>
                    {activeQuestion.correctAnswer}. {activeQuestion.explanation}
                  </p>
                  <button
                    onClick={handleSpin}
                    className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    Quay Lượt Tiếp Theo →
                  </button>
                </div>
              )}
            </div>
          )}

          {!selectedSlice && !isSpinning && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <span className="text-3xl block">🎯</span>
              <h4 className="font-bold text-slate-200 text-sm">Chưa Quay</h4>
              <p className="text-xs text-slate-400">
                Hãy nhấn nút “QUAY NGAY!” để vòng quay chọn ngẫu nhiên chủ đề câu hỏi cho bạn.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
