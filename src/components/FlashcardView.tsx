import React, { useState, useMemo } from 'react';
import { ArrowLeft, RotateCw, CheckCircle2, HelpCircle, Sparkles, Filter, ChevronRight, ChevronLeft, BrainCircuit } from 'lucide-react';
import { ESSAY_FLASHCARDS } from '../data/historyQuestions';
import { Flashcard } from '../types';
import { soundManager } from '../utils/soundEffects';
import { fireConfetti } from '../utils/confetti';
import { FlashcardRating } from '../hooks/useStorage';

interface FlashcardViewProps {
  ratings: FlashcardRating;
  onRecordRating: (id: string, rating: 'not_remembered' | 'almost' | 'mastered') => void;
  onAddXP: (amount: number) => void;
  onBack: () => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  ratings,
  onRecordRating,
  onAddXP,
  onBack
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter and weight cards: cards marked 'not_remembered' appear with higher priority
  const filteredCards = useMemo(() => {
    let pool = [...ESSAY_FLASHCARDS];
    if (selectedCategory !== 'all') {
      pool = pool.filter(c => c.category === selectedCategory);
    }
    // Sort cards so 'not_remembered' appear first, then 'almost', then 'mastered'
    return pool.sort((a, b) => {
      const rateA = ratings[a.id] || 'almost';
      const rateB = ratings[b.id] || 'almost';
      const order = { not_remembered: 0, almost: 1, mastered: 2 };
      return order[rateA] - order[rateB];
    });
  }, [selectedCategory, ratings]);

  const activeCard = filteredCards[currentIndex % Math.max(1, filteredCards.length)];

  const handleFlip = () => {
    soundManager.playClick();
    setIsFlipped(prev => !prev);
  };

  const handleRating = (rating: 'not_remembered' | 'almost' | 'mastered') => {
    if (!activeCard) return;

    soundManager.playClick();
    onRecordRating(activeCard.id, rating);

    if (rating === 'mastered') {
      soundManager.playCorrect();
      onAddXP(15);
    } else if (rating === 'almost') {
      onAddXP(5);
    }

    // Advance to next card
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex + 1 < filteredCards.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        soundManager.playVictory();
        fireConfetti();
        alert('Bạn đã ôn xong một vòng các thẻ ghi nhớ! Tiếp tục ôn luyện để khắc sâu kiến thức.');
        setCurrentIndex(0);
      }
    }, 250);
  };

  const categories = [
    { id: 'all', label: 'Tất cả thẻ tự luận' },
    { id: 'asia', label: 'Châu Á (TQ 1949, VN, Lào...)' },
    { id: 'latin_america', label: 'Mỹ La-tinh (Cu-ba 1959, 1961)' },
    { id: 'collapse', label: 'Khủng hoảng & Sụp đổ Đông Âu, Liên Xô' },
    { id: 'china_reform', label: 'Cải cách mở cửa Trung Quốc 1978' }
  ];

  const currentCardRating = activeCard ? (ratings[activeCard.id] || 'Chưa đánh giá') : '';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { soundManager.playClick(); onBack(); }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-cyan-400 font-serif-title uppercase flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-cyan-400" />
              <span>Flashcard Tự Luận – Nhớ Nhanh Kiến Thức</span>
            </h1>
            <p className="text-xs text-slate-400">
              Lật thẻ học nhanh mốc sự kiện, nguyên nhân, thành tựu theo chuẩn đề cương
            </p>
          </div>
        </div>

        {activeCard && (
          <span className="text-xs font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Thẻ {currentIndex + 1} / {filteredCards.length}
          </span>
        )}
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              soundManager.playClick();
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-cyan-600 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive 3D Flip Flashcard */}
      {activeCard && (
        <div className="space-y-6">
          <div 
            onClick={handleFlip}
            className="relative min-h-[300px] sm:min-h-[340px] rounded-3xl p-6 sm:p-10 border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-2xl flex flex-col justify-between select-none bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-cyan-500/40 hover:border-cyan-400"
          >
            {/* Card header */}
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800/80">
              <span className="font-bold text-cyan-300 uppercase tracking-wider">
                {activeCard.topic}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" /> Chạm để lật thẻ
              </span>
            </div>

            {/* Front or Back Content */}
            {!isFlipped ? (
              /* Front Side */
              <div className="py-8 text-center space-y-4 my-auto">
                <span className="text-4xl block">❓</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-serif-title max-w-xl mx-auto leading-relaxed">
                  {activeCard.front}
                </h3>
                <p className="text-xs text-amber-400 font-semibold">
                  (Nhấn vào thẻ để xem đáp án kiến thức)
                </p>
              </div>
            ) : (
              /* Back Side */
              <div className="py-4 space-y-3 text-left animate-fadeIn my-auto">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> NỘI DUNG TỰ LUẬN TRONG TÀI LIỆU:
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                  {activeCard.back}
                </div>
              </div>
            )}

            {/* Card footer status */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
              <span>Trạng thái: <strong className="text-amber-400">
                {ratings[activeCard.id] === 'mastered' ? '😍 Đã thuộc' : ratings[activeCard.id] === 'not_remembered' ? '😕 Chưa nhớ' : '🙂 Gần nhớ'}
              </strong></span>
              <span className="italic">Nhớ kiến thức để làm tốt phần tự luận</span>
            </div>
          </div>

          {/* Self-Assessment Buttons */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              TỰ ĐÁNH GIÁ MỨC ĐỘ THUỘC BÀI CỦA BẠN:
            </span>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              <button
                onClick={() => handleRating('not_remembered')}
                className="py-3 px-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-300 text-xs sm:text-sm font-bold flex flex-col items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <span className="text-xl">😕</span>
                <span>Chưa nhớ</span>
                <span className="text-[10px] text-rose-400/80 font-normal">Xuất hiện lại nhiều</span>
              </button>

              <button
                onClick={() => handleRating('almost')}
                className="py-3 px-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-700/60 text-amber-300 text-xs sm:text-sm font-bold flex flex-col items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <span className="text-xl">🙂</span>
                <span>Gần nhớ</span>
                <span className="text-[10px] text-amber-400/80 font-normal">+5 XP</span>
              </button>

              <button
                onClick={() => handleRating('mastered')}
                className="py-3 px-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs sm:text-sm font-bold flex flex-col items-center gap-1 transition-all cursor-pointer active:scale-95 shadow-sm"
              >
                <span className="text-xl">😍</span>
                <span>Đã thuộc</span>
                <span className="text-[10px] text-emerald-400/80 font-normal">+15 XP</span>
              </button>
            </div>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                soundManager.playClick();
                setIsFlipped(false);
                setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Thẻ trước
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setIsFlipped(false);
                setCurrentIndex(prev => (prev + 1) % filteredCards.length);
              }}
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span>Thẻ tiếp</span> <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
