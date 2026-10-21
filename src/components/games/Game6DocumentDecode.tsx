import React, { useState } from 'react';
import { ArrowLeft, Scroll, CheckCircle2, XCircle, HelpCircle, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { TRUE_FALSE_QUESTIONS } from '../../data/historyQuestions';
import { TrueFalseQuestion } from '../../types';
import { soundManager } from '../../utils/soundEffects';
import { fireConfetti } from '../../utils/confetti';

interface Game6DocumentDecodeProps {
  onBack: () => void;
  onAddXP: (amount: number) => void;
}

export const Game6DocumentDecode: React.FC<Game6DocumentDecodeProps> = ({ onBack, onAddXP }) => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [userChoices, setUserChoices] = useState<Record<string, boolean | null>>({
    a: null,
    b: null,
    c: null,
    d: null
  });
  const [isGraded, setIsGraded] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const doc = TRUE_FALSE_QUESTIONS[currentDocIndex];

  const handleSelectChoice = (statementId: 'a' | 'b' | 'c' | 'd', choice: boolean) => {
    if (isGraded) return;
    soundManager.playClick();
    setUserChoices(prev => ({
      ...prev,
      [statementId]: choice
    }));
  };

  const isAllAnswered = (['a', 'b', 'c', 'd'] as const).every(k => userChoices[k] !== null);

  const handleGrade = () => {
    if (!isAllAnswered || isGraded) return;

    let correctCount = 0;
    doc.statements.forEach(st => {
      if (userChoices[st.id] === st.isCorrect) {
        correctCount += 1;
      }
    });

    setIsGraded(true);
    setShowExplanation(true);

    if (correctCount >= 3) {
      soundManager.playVictory();
      fireConfetti();
    } else {
      soundManager.playCorrect();
    }

    onAddXP(correctCount * 10);
  };

  const correctCount = isGraded
    ? doc.statements.filter(st => userChoices[st.id] === st.isCorrect).length
    : 0;

  const handleNextDoc = () => {
    soundManager.playClick();
    if (currentDocIndex + 1 < TRUE_FALSE_QUESTIONS.length) {
      setCurrentDocIndex(prev => prev + 1);
      setUserChoices({ a: null, b: null, c: null, d: null });
      setIsGraded(false);
      setShowExplanation(false);
    } else {
      alert('Bạn đã hoàn thành giải mã tất cả 4 bộ văn bản tư liệu lịch sử!');
      setCurrentDocIndex(0);
      setUserChoices({ a: null, b: null, c: null, d: null });
      setIsGraded(false);
      setShowExplanation(false);
    }
  };

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
              <span>📜</span> Giải Mã Tư Liệu Lịch Sử
            </h1>
            <p className="text-xs text-slate-400">Đọc kĩ tư liệu gốc và xác định tính Đúng/Sai của 4 nhận định a, b, c, d</p>
          </div>
        </div>

        {/* Document progress selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {TRUE_FALSE_QUESTIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playClick();
                setCurrentDocIndex(idx);
                setUserChoices({ a: null, b: null, c: null, d: null });
                setIsGraded(false);
                setShowExplanation(false);
              }}
              className={`w-8 h-8 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                idx === currentDocIndex
                  ? 'bg-cyan-600 text-slate-950 border-cyan-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Document Box */}
      <div className="bg-slate-900 rounded-3xl border-2 border-cyan-800/40 p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Document Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
          <span className="font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-700/50 flex items-center gap-1.5">
            <Scroll className="w-4 h-4" /> Tư liệu số {doc.questionNumber} / {TRUE_FALSE_QUESTIONS.length}
          </span>
          <span className="text-slate-400 italic">Trắc nghiệm Đúng / Sai</span>
        </div>

        {/* Verbatim Source Text in Dedicated Scrollable Parchment Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-amber-600/30 text-slate-200 text-sm sm:text-base leading-relaxed max-h-72 overflow-y-auto space-y-3 font-serif shadow-inner">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-sans flex items-center gap-1.5">
            <span>📜</span> NGUYÊN VĂN ĐOẠN TƯ LIỆU:
          </div>
          <p className="whitespace-pre-line text-slate-300 italic">
            {doc.sourceText}
          </p>
          <p className="text-[11px] text-amber-500/80 text-right font-sans not-italic">
            Nguồn: {doc.sourceCitation}
          </p>
        </div>

        {/* 4 Statements List */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">
            Hãy xác định tính ĐÚNG hoặc SAI cho từng nhận định sau:
          </h3>

          <div className="space-y-3">
            {doc.statements.map((st) => {
              const userVal = userChoices[st.id];
              const isMatch = isGraded && userVal === st.isCorrect;

              let cardBorder = 'border-slate-800 bg-slate-950/60';
              if (isGraded) {
                cardBorder = isMatch 
                  ? 'border-emerald-500/80 bg-emerald-950/20' 
                  : 'border-rose-500/80 bg-rose-950/20';
              }

              return (
                <div
                  key={st.id}
                  className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${cardBorder}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-300 text-sm shrink-0">
                        {st.id})
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                        {st.statement}
                      </p>
                    </div>

                    {/* True / False Choice Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        disabled={isGraded}
                        onClick={() => handleSelectChoice(st.id, true)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          userVal === true
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>ĐÚNG</span>
                      </button>

                      <button
                        disabled={isGraded}
                        onClick={() => handleSelectChoice(st.id, false)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          userVal === false
                            ? 'bg-rose-600 text-white shadow-md'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>SAI</span>
                      </button>
                    </div>
                  </div>

                  {/* Individual Statement Explanation (Shown after grading) */}
                  {showExplanation && (
                    <div className="text-xs p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 space-y-1 animate-fadeIn">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-amber-400">Đáp án chuẩn: {st.isCorrect ? 'ĐÚNG ✓' : 'SAI ✕'}</span>
                        {isMatch ? (
                          <span className="text-emerald-400 font-semibold">(Bạn chọn chính xác)</span>
                        ) : (
                          <span className="text-rose-400 font-semibold">(Bạn chọn chưa đúng)</span>
                        )}
                      </div>
                      <p className="text-slate-400">{st.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls & Grade Result */}
        {!isGraded ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              {isAllAnswered ? 'Đã hoàn thành 4 nhận định. Nhấn Chấm điểm!' : 'Hãy chọn ĐÚNG hoặc SAI cho cả 4 nhận định a, b, c, d.'}
            </span>

            <button
              disabled={!isAllAnswered}
              onClick={handleGrade}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isAllAnswered
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-950/40 hover:scale-102'
                  : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
              }`}
            >
              <span>CHẤM ĐIỂM TƯ LIỆU</span>
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Kết quả chấm điểm</span>
                <h4 className="text-xl sm:text-2xl font-black text-cyan-300">
                  Bạn đúng {correctCount}/4 nhận định! (+{correctCount * 10} XP)
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setUserChoices({ a: null, b: null, c: null, d: null });
                    setIsGraded(false);
                    setShowExplanation(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Làm lại tư liệu này
                </button>

                <button
                  onClick={handleNextDoc}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <span>Tư liệu tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
