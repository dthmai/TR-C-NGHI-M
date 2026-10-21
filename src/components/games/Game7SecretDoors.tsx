import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Heart, Bomb, Gift, Crown, Star, RotateCcw, CheckCircle2, XCircle, Award } from 'lucide-react';
import { ALL_QUESTIONS } from '../../data/historyQuestions';
import { Question } from '../../types';
import { soundManager } from '../../utils/soundEffects';
import { fireConfetti, fireSuperConfetti } from '../../utils/confetti';

interface Game7SecretDoorsProps {
  onBack: () => void;
  onRecordAnswer: (questionId: string, isCorrect: boolean, userAnswerLetter?: string) => void;
  onAddXP: (amount: number) => void;
}

type DoorType = 'question' | 'star20' | 'bomb' | 'gift_double' | 'heart_turn' | 'jackpot';

interface SecretDoor {
  id: number;
  type: DoorType;
  isOpen: boolean;
  question?: Question;
  title: string;
}

export const Game7SecretDoors: React.FC<Game7SecretDoorsProps> = ({ onBack, onRecordAnswer, onAddXP }) => {
  const [doors, setDoors] = useState<SecretDoor[]>([]);
  const [activeDoor, setActiveDoor] = useState<SecretDoor | null>(null);
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(8); // Available turns
  const [multiplier, setMultiplier] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [eventMessage, setEventMessage] = useState<string | null>(null);

  const initGame = () => {
    // 12 doors:
    // 1 jackpot question, 1 star20, 1 bomb, 1 gift_double, 1 heart_turn, 7 standard questions
    const shuffledQuestions = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);

    const baseTypes: DoorType[] = [
      'star20',
      'bomb',
      'gift_double',
      'heart_turn',
      'jackpot',
      'question',
      'question',
      'question',
      'question',
      'question',
      'question',
      'question'
    ];
    const doorTypes: DoorType[] = [...baseTypes].sort(() => Math.random() - 0.5);

    let qIdx = 0;
    const newDoors: SecretDoor[] = doorTypes.map((type, idx) => {
      let q: Question | undefined = undefined;
      let title = `Ô Cửa Số ${idx + 1}`;
      if (type === 'question' || type === 'jackpot') {
        q = shuffledQuestions[qIdx++];
      }
      return {
        id: idx + 1,
        type,
        isOpen: false,
        question: q,
        title
      };
    });

    setDoors(newDoors);
    setActiveDoor(null);
    setScore(0);
    setTurns(8);
    setMultiplier(1);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setEventMessage(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleOpenDoor = (door: SecretDoor) => {
    if (door.isOpen || turns <= 0) return;

    soundManager.playClick();
    // Open door
    setDoors(prev => prev.map(d => (d.id === door.id ? { ...d, isOpen: true } : d)));

    if (door.type === 'star20') {
      soundManager.playCorrect();
      fireConfetti();
      const gained = 20 * multiplier;
      setScore(s => s + gained);
      onAddXP(gained);
      setMultiplier(1);
      setEventMessage(`⭐ BẠN MỞ TRÚNG Ô NGÔI SAO MAY MẮN: +${gained} ĐIỂM!`);
      setActiveDoor(door);
    } else if (door.type === 'bomb') {
      soundManager.playWrong();
      setTurns(t => Math.max(0, t - 2)); // Lose extra turn
      setEventMessage('💣 Ô BOM NỔ: BẠN BỊ MẤT THÊM 1 LƯỢT CHỌN!');
      setActiveDoor(door);
    } else if (door.type === 'gift_double') {
      soundManager.playStreak();
      setMultiplier(2);
      setEventMessage('🎁 HỘP QUÀ KỲ DIỆU: NHÂN ĐÔI (x2) ĐIỂM Ở CÂU HỎI TIẾP THEO!');
      setActiveDoor(door);
    } else if (door.type === 'heart_turn') {
      soundManager.playCorrect();
      setTurns(t => t + 2); // Gain turns
      setEventMessage('❤️ TRÁI TIM MAY MẮN: BẠN ĐƯỢC TẶNG THÊM +2 LƯỢT CHỌN!');
      setActiveDoor(door);
    } else {
      // Question or Jackpot
      setActiveDoor(door);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setEventMessage(null);
      setTurns(t => Math.max(0, t - 1));
    }
  };

  const handleAnswerQuestion = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !activeDoor || !activeDoor.question) return;

    setSelectedAnswer(choice);
    setIsAnswered(true);

    const isCorrect = choice === activeDoor.question.correctAnswer;
    onRecordAnswer(activeDoor.question.id, isCorrect, choice);

    if (isCorrect) {
      soundManager.playCorrect();
      const basePts = activeDoor.type === 'jackpot' ? 100 : 20;
      const pts = basePts * multiplier;
      setScore(s => s + pts);
      onAddXP(pts);

      if (activeDoor.type === 'jackpot') {
        soundManager.playVictory();
        fireSuperConfetti();
      } else {
        fireConfetti();
      }
    } else {
      soundManager.playWrong();
    }
    setMultiplier(1);
  };

  const handleCloseActive = () => {
    soundManager.playClick();
    setActiveDoor(null);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setEventMessage(null);
  };

  const allDoorsOpened = doors.length > 0 && doors.every(d => d.isOpen);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
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
            <h1 className="text-xl sm:text-2xl font-black text-purple-400 font-serif-title uppercase flex items-center gap-2">
              <span>🧩</span> Ô Cửa Bí Mật
            </h1>
            <p className="text-xs text-slate-400">12 ô bí ẩn: Bom mất lượt, Quà nhân đôi, Ngôi sao +20đ, Câu hỏi Jackpot!</p>
          </div>
        </div>

        {/* Turns & Score Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-rose-500/15 border border-rose-500/30 px-3 py-1.5 rounded-xl text-rose-300 font-bold text-xs sm:text-sm">
            <Heart className="w-4 h-4 fill-current text-rose-400" />
            <span>Còn {turns} Lượt</span>
          </div>

          {multiplier > 1 && (
            <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 px-2.5 py-1.5 rounded-xl text-amber-300 font-bold text-xs">
              <Gift className="w-3.5 h-3.5" />
              <span>x{multiplier} Điểm!</span>
            </div>
          )}

          <div className="flex items-center gap-1 bg-purple-500/15 border border-purple-500/30 px-3 py-1.5 rounded-xl text-purple-300 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>{score} điểm</span>
          </div>
        </div>
      </div>

      {/* Grid of 12 Doors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {doors.map((door) => {
          let doorStyle = 'bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border-purple-700/50 hover:border-purple-400 text-purple-300 hover:scale-105';
          let icon = door.id;

          if (door.isOpen) {
            doorStyle = 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60 cursor-default scale-95';
            if (door.type === 'star20') icon = '⭐' as unknown as number;
            else if (door.type === 'bomb') icon = '💣' as unknown as number;
            else if (door.type === 'gift_double') icon = '🎁' as unknown as number;
            else if (door.type === 'heart_turn') icon = '❤️' as unknown as number;
            else if (door.type === 'jackpot') icon = '👑' as unknown as number;
            else icon = '✓' as unknown as number;
          }

          return (
            <button
              key={door.id}
              disabled={door.isOpen || turns <= 0}
              onClick={() => handleOpenDoor(door)}
              className={`min-h-[120px] rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-lg relative ${doorStyle}`}
            >
              <span className="text-3xl font-black font-serif-title">{icon}</span>
              <span className="text-xs font-semibold text-slate-300">
                {door.isOpen ? 'ĐÃ MỞ' : `Ô SỐ ${door.id}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Game Over or Run out of turns */}
      {(turns <= 0 || allDoorsOpened) && !activeDoor && (
        <div className="text-center p-6 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-3 animate-fadeIn">
          <Award className="w-10 h-10 text-purple-400 mx-auto" />
          <h3 className="text-xl font-bold text-purple-300 uppercase">
            {turns <= 0 ? 'Bạn đã dùng hết số lượt mở ô!' : 'Bạn đã khám phá toàn bộ 12 ô cửa!'}
          </h3>
          <p className="text-sm text-slate-300">
            Tổng điểm của bạn đạt được là: <strong className="text-amber-400 font-bold">{score} ĐIỂM</strong>
          </p>
          <button
            onClick={initGame}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
          >
            Chơi Bàn Ô Cửa Mới
          </button>
        </div>
      )}

      {/* Modal Popup for opened door */}
      {activeDoor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border-2 border-purple-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold text-purple-300">
              <span className="flex items-center gap-2">
                <span>🧩</span> {activeDoor.title}
                {activeDoor.type === 'jackpot' && <span className="text-amber-400">👑 CÂU HỎI JACKPOT (+100Đ)</span>}
              </span>
            </div>

            {/* If special event */}
            {eventMessage && (
              <div className="text-center py-6 space-y-4">
                <div className="text-5xl">
                  {activeDoor.type === 'star20' && '⭐'}
                  {activeDoor.type === 'bomb' && '💣'}
                  {activeDoor.type === 'gift_double' && '🎁'}
                  {activeDoor.type === 'heart_turn' && '❤️'}
                </div>
                <p className="text-lg font-bold text-slate-100">{eventMessage}</p>
                <button
                  onClick={handleCloseActive}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-md"
                >
                  Xác Nhận & Tiếp Tục
                </button>
              </div>
            )}

            {/* If question */}
            {activeDoor.question && !eventMessage && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
                  {activeDoor.question.question}
                </h3>

                <div className="space-y-2.5">
                  {(['A', 'B', 'C', 'D'] as const).map(letter => {
                    const isSelected = selectedAnswer === letter;
                    const isCorrect = letter === activeDoor.question?.correctAnswer;

                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800';
                    if (isAnswered) {
                      if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                      else if (isSelected && !isCorrect) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      else btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                    }

                    return (
                      <button
                        key={letter}
                        disabled={isAnswered}
                        onClick={() => handleAnswerQuestion(letter)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-start gap-2.5 cursor-pointer transition-all ${btnStyle}`}
                      >
                        <strong className="shrink-0">{letter}.</strong>
                        <span>{activeDoor.question?.options[letter]}</span>
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 animate-fadeIn">
                    <p className="text-slate-300">
                      <strong className="text-amber-400">Đáp án: </strong>
                      {activeDoor.question.correctAnswer}. {activeDoor.question.explanation}
                    </p>
                    <button
                      onClick={handleCloseActive}
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md"
                    >
                      Đóng & Mở Ô Tiếp Theo →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
