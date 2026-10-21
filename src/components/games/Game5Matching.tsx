import React, { useState, useEffect } from 'react';
import { ArrowLeft, Timer, RotateCcw, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { MATCHING_PAIRS } from '../../data/historyQuestions';
import { MatchingPair } from '../../types';
import { soundManager } from '../../utils/soundEffects';
import { fireConfetti } from '../../utils/confetti';

interface Game5MatchingProps {
  onBack: () => void;
  onAddXP: (amount: number) => void;
}

interface TileItem {
  id: string; // unique tile instance id
  pairId: string;
  side: 'left' | 'right';
  text: string;
  matched: boolean;
}

export const Game5Matching: React.FC<Game5MatchingProps> = ({ onBack, onAddXP }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tiles, setTiles] = useState<TileItem[]>([]);
  const [firstSelected, setFirstSelected] = useState<TileItem | null>(null);
  const [secondSelected, setSecondSelected] = useState<TileItem | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);

  // Initialize a set of 6 pairs for the current game
  const initGame = (category: string = 'all') => {
    let pool = [...MATCHING_PAIRS];
    if (category !== 'all') {
      pool = pool.filter(p => p.category === category);
    }
    // Take 6 random pairs
    const chosenPairs = pool.sort(() => Math.random() - 0.5).slice(0, 6);

    const leftTiles: TileItem[] = chosenPairs.map(p => ({
      id: `left_${p.id}`,
      pairId: p.id,
      side: 'left',
      text: p.left,
      matched: false
    }));

    const rightTiles: TileItem[] = chosenPairs.map(p => ({
      id: `right_${p.id}`,
      pairId: p.id,
      side: 'right',
      text: p.right,
      matched: false
    }));

    // Shuffle tiles together
    const allTiles = [...leftTiles, ...rightTiles].sort(() => Math.random() - 0.5);

    setTiles(allTiles);
    setFirstSelected(null);
    setSecondSelected(null);
    setMatchedPairIds([]);
    setSeconds(0);
    setTotalAttempts(0);
    setIsCompleted(false);
    setTimerActive(true);
  };

  useEffect(() => {
    initGame(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isCompleted]);

  const handleTileClick = (tile: TileItem) => {
    if (tile.matched || firstSelected?.id === tile.id || secondSelected) return;

    soundManager.playClick();

    if (!firstSelected) {
      setFirstSelected(tile);
    } else {
      setSecondSelected(tile);
      setTotalAttempts(prev => prev + 1);

      // Check match
      if (firstSelected.pairId === tile.pairId && firstSelected.side !== tile.side) {
        // MATCH!
        soundManager.playCorrect();
        const newMatched = [...matchedPairIds, tile.pairId];
        setMatchedPairIds(newMatched);

        setTiles(prev =>
          prev.map(t => (t.pairId === tile.pairId ? { ...t, matched: true } : t))
        );

        setFirstSelected(null);
        setSecondSelected(null);

        // Check victory
        if (newMatched.length === 6) {
          setIsCompleted(true);
          setTimerActive(false);
          soundManager.playVictory();
          fireConfetti();
          onAddXP(50);
        }
      } else {
        // MISMATCH
        soundManager.playWrong();
        setTimeout(() => {
          setFirstSelected(null);
          setSecondSelected(null);
        }, 800);
      }
    }
  };

  const categories = [
    { id: 'all', label: 'Tất cả dạng thẻ' },
    { id: 'Sự kiện ↔ Thời gian', label: 'Sự kiện ↔ Mốc năm (1776, 1789, 1917, 1922...)' },
    { id: 'Nhân vật ↔ Sự kiện', label: 'Nhân vật ↔ Sự kiện' },
    { id: 'Quốc gia ↔ Đặc điểm', label: 'Quốc gia ↔ Đặc điểm' },
    { id: 'Khái niệm ↔ Nội dung', label: 'Khái niệm ↔ Nội dung' }
  ];

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
            <h1 className="text-xl sm:text-2xl font-black text-emerald-400 font-serif-title uppercase flex items-center gap-2">
              <span>🔗</span> Ghép Đôi Lịch Sử
            </h1>
            <p className="text-xs text-slate-400">Ghép đúng 6 cặp Sự kiện, Thời gian, Nhân vật để chiến thắng</p>
          </div>
        </div>

        {/* Live Timer & Progress */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-3.5 py-1.5 rounded-xl text-emerald-400 font-bold text-xs sm:text-sm">
            <Timer className="w-4 h-4" />
            <span>{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-300 font-bold text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{matchedPairIds.length} / 6 Cặp</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {!isCompleted ? (
        /* Card Grid (12 cards) */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {tiles.map((tile) => {
            const isFirst = firstSelected?.id === tile.id;
            const isSecond = secondSelected?.id === tile.id;
            const isSelected = isFirst || isSecond;
            const isWrongPair = isSecond && firstSelected && (firstSelected.pairId !== tile.pairId || firstSelected.side === tile.side);

            let style = 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-emerald-500/60 hover:bg-slate-850';

            if (tile.matched) {
              style = 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400/40 opacity-30 cursor-default scale-95 pointer-events-none';
            } else if (isSelected) {
              if (isWrongPair) {
                style = 'bg-rose-950 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
              } else {
                style = 'bg-emerald-950 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/40 scale-102';
              }
            }

            return (
              <button
                key={tile.id}
                disabled={tile.matched}
                onClick={() => handleTileClick(tile)}
                className={`min-h-[110px] sm:min-h-[130px] p-4 rounded-2xl border-2 transition-all flex flex-col justify-center items-center text-center cursor-pointer shadow-lg relative ${style}`}
              >
                {tile.matched && (
                  <span className="absolute top-2 right-2 text-emerald-400 text-xs font-bold">✓ Ghép xong</span>
                )}
                <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                  {tile.text}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Victory Screen */
        <div className="text-center py-10 px-6 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 space-y-6 shadow-2xl animate-scaleUp">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-4xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            🏆
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-300 font-serif-title uppercase">
              Xuất Sắc! Ghép Đúng Toàn Bộ!
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Bạn đã hoàn thành trong {Math.floor(seconds / 60)} phút {seconds % 60} giây với {totalAttempts} lượt ghép (+50 XP).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => initGame(selectedCategory)}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-4 h-4" /> Chơi Bàn Ghép Mới
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
