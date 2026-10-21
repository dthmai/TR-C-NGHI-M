import React, { useState } from 'react';
import { ArrowLeft, Users, Trophy, Plus, Minus, SkipForward, Play, RotateCcw, Volume2, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { ALL_QUESTIONS } from '../data/historyQuestions';
import { Question, TeamScore } from '../types';
import { soundManager } from '../utils/soundEffects';
import { fireConfetti, fireSuperConfetti } from '../utils/confetti';

interface TeamBattleViewProps {
  onBack: () => void;
}

const DEFAULT_TEAMS: Record<number, TeamScore[]> = {
  2: [
    { id: 'team_1', name: 'Đội Đỏ', color: 'from-rose-500 to-red-700 border-red-500 text-rose-300', score: 0 },
    { id: 'team_2', name: 'Đội Xanh Lam', color: 'from-blue-500 to-indigo-700 border-blue-500 text-blue-300', score: 0 }
  ],
  3: [
    { id: 'team_1', name: 'Đội Đỏ', color: 'from-rose-500 to-red-700 border-red-500 text-rose-300', score: 0 },
    { id: 'team_2', name: 'Đội Xanh Lam', color: 'from-blue-500 to-indigo-700 border-blue-500 text-blue-300', score: 0 },
    { id: 'team_3', name: 'Đội Xanh Lá', color: 'from-emerald-500 to-teal-700 border-emerald-500 text-emerald-300', score: 0 }
  ],
  4: [
    { id: 'team_1', name: 'Đội Đỏ', color: 'from-rose-500 to-red-700 border-red-500 text-rose-300', score: 0 },
    { id: 'team_2', name: 'Đội Xanh Lam', color: 'from-blue-500 to-indigo-700 border-blue-500 text-blue-300', score: 0 },
    { id: 'team_3', name: 'Đội Xanh Lá', color: 'from-emerald-500 to-teal-700 border-emerald-500 text-emerald-300', score: 0 },
    { id: 'team_4', name: 'Đội Vàng', color: 'from-amber-500 to-yellow-600 border-amber-500 text-yellow-300', score: 0 }
  ]
};

export const TeamBattleView: React.FC<TeamBattleViewProps> = ({ onBack }) => {
  const [numTeams, setNumTeams] = useState<number>(2);
  const [teams, setTeams] = useState<TeamScore[]>(DEFAULT_TEAMS[2]);
  const [isBattleStarted, setIsBattleStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [activeTeamTurn, setActiveTeamTurn] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleSelectNumTeams = (count: number) => {
    soundManager.playClick();
    setNumTeams(count);
    setTeams(DEFAULT_TEAMS[count]);
  };

  const handleUpdateTeamName = (index: number, newName: string) => {
    setTeams(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], name: newName };
      return copy;
    });
  };

  const startBattle = () => {
    soundManager.playVictory();
    const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setActiveTeamTurn(0);
    setShowAnswer(false);
    setIsFinished(false);
    setIsBattleStarted(true);
  };

  const activeQuestion = shuffledQuestions[currentQuestionIndex];
  const currentTeam = teams[activeTeamTurn];

  const handleAddPoints = (teamIndex: number, delta: number) => {
    soundManager.playClick();
    if (delta > 0) {
      soundManager.playCorrect();
      fireConfetti();
    } else {
      soundManager.playWrong();
    }

    setTeams(prev => {
      const copy = [...prev];
      copy[teamIndex] = {
        ...copy[teamIndex],
        score: Math.max(0, copy[teamIndex].score + delta)
      };
      return copy;
    });
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    setShowAnswer(false);
    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setActiveTeamTurn(prev => (prev + 1) % teams.length);
    } else {
      handleFinishBattle();
    }
  };

  const handleSkipQuestion = () => {
    soundManager.playClick();
    setShowAnswer(false);
    setCurrentQuestionIndex(prev => (prev + 1) % shuffledQuestions.length);
    setActiveTeamTurn(prev => (prev + 1) % teams.length);
  };

  const handleFinishBattle = () => {
    soundManager.playVictory();
    fireSuperConfetti();
    setIsFinished(true);
  };

  // Determine winning team(s)
  const maxScore = Math.max(...teams.map(t => t.score));
  const winners = teams.filter(t => t.score === maxScore);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
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
            <h1 className="text-xl sm:text-2xl font-black text-purple-400 font-serif-title uppercase flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-400" />
              <span>Chế Độ Thi Đấu Theo Đội (Lớp Học)</span>
            </h1>
            <p className="text-xs text-slate-400">
              Dành cho giáo viên trình chiếu trên TV/Máy chiếu lớp học và cộng điểm trực tiếp
            </p>
          </div>
        </div>

        {isBattleStarted && !isFinished && (
          <button
            onClick={handleFinishBattle}
            className="px-4 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-800 border border-rose-500/40 text-rose-200 text-xs font-bold transition-all cursor-pointer"
          >
            🏆 Kết Thúc & Tổng Kết Điểm
          </button>
        )}
      </div>

      {!isBattleStarted ? (
        /* Setup Battle Screen */
        <div className="bg-slate-900 rounded-3xl border-2 border-purple-600/40 p-6 sm:p-10 space-y-8 shadow-2xl max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-serif-title uppercase">
              Thiết Lập Đội Thi Đấu
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Chọn số lượng đội và đặt tên cho các đội trong tiết học
            </p>
          </div>

          {/* Choose 2, 3, 4 teams */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 text-center">
              Số Lượng Đội:
            </label>
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              {[2, 3, 4].map(count => (
                <button
                  key={count}
                  onClick={() => handleSelectNumTeams(count)}
                  className={`py-3 rounded-2xl font-black text-sm border-2 transition-all cursor-pointer ${
                    numTeams === count
                      ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-900/40 scale-105'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {count} ĐỘI
                </button>
              ))}
            </div>
          </div>

          {/* Team Name Customization */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300">
              Tùy chỉnh tên các đội:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {teams.map((t, idx) => (
                <div key={t.id} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400">Đội {idx + 1}:</span>
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) => handleUpdateTeamName(idx, e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm font-semibold focus:outline-none focus:border-purple-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={startBattle}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-lg shadow-2xl shadow-purple-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              🚀 BẮT ĐẦU TRẬN ĐẤU!
            </button>
          </div>
        </div>
      ) : !isFinished ? (
        /* Active Battle Screen with live scoreboard and teacher controls */
        <div className="space-y-6">
          {/* Permanent Top Scoreboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {teams.map((t, idx) => {
              const isCurrentTurn = idx === activeTeamTurn;

              return (
                <div
                  key={t.id}
                  className={`p-4 rounded-2xl border-2 transition-all relative overflow-hidden bg-slate-900/95 shadow-xl ${
                    isCurrentTurn 
                      ? 'border-amber-400 ring-4 ring-amber-500/20 scale-[1.02]' 
                      : 'border-slate-800 opacity-80'
                  }`}
                >
                  {isCurrentTurn && (
                    <div className="absolute top-1.5 right-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                      LƯỢT TRẢ LỜI
                    </div>
                  )}

                  <h4 className="font-bold text-sm text-slate-100 truncate pr-14">
                    {t.name}
                  </h4>

                  <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-2 font-serif-title">
                    {t.score} <span className="text-xs font-normal text-slate-400">điểm</span>
                  </div>

                  {/* Teacher Quick Point Modifiers */}
                  <div className="grid grid-cols-3 gap-1 mt-3 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => handleAddPoints(idx, 10)}
                      className="py-1 rounded bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-300 text-[11px] font-bold cursor-pointer transition-colors"
                      title="Cộng 10 điểm"
                    >
                      +10
                    </button>
                    <button
                      onClick={() => handleAddPoints(idx, 20)}
                      className="py-1 rounded bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-600/40 text-emerald-300 text-[11px] font-bold cursor-pointer transition-colors"
                      title="Cộng 20 điểm"
                    >
                      +20
                    </button>
                    <button
                      onClick={() => handleAddPoints(idx, -10)}
                      className="py-1 rounded bg-rose-950/70 hover:bg-rose-900 border border-rose-600/40 text-rose-300 text-[11px] font-bold cursor-pointer transition-colors"
                      title="Trừ 10 điểm"
                    >
                      -10
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Question Display Screen for Classroom Projection */}
          {activeQuestion && (
            <div className="bg-slate-900 rounded-3xl border-2 border-slate-800 p-6 sm:p-10 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-xl">
                  Câu hỏi số {currentQuestionIndex + 1}
                </span>
                <span className="text-slate-400 text-xs sm:text-sm">
                  Đội trả lời: <strong className="text-amber-300 font-bold">{currentTeam.name}</strong>
                </span>
              </div>

              {/* Big Question Font for Projector */}
              <h2 className="text-xl sm:text-3xl font-black text-slate-100 leading-relaxed text-center py-2">
                {activeQuestion.question}
              </h2>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['A', 'B', 'C', 'D'] as const).map(letter => {
                  const isCorrect = letter === activeQuestion.correctAnswer;
                  let style = 'bg-slate-950/90 border-slate-800 text-slate-100';

                  if (showAnswer) {
                    if (isCorrect) {
                      style = 'bg-emerald-950 border-emerald-400 text-emerald-100 ring-4 ring-emerald-500/30';
                    } else {
                      style = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                    }
                  }

                  return (
                    <div
                      key={letter}
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${style}`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-base text-amber-400 shrink-0">
                        {letter}
                      </div>
                      <div className="text-sm sm:text-lg font-medium leading-snug">
                        {activeQuestion.options[letter]}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Answer Explanation & Teacher Toolbar */}
              {showAnswer && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>ĐÁP ÁN ĐÚNG LÀ: {activeQuestion.correctAnswer}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Master Teacher Actions Toolbar */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setShowAnswer(prev => !prev)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-500/40 text-indigo-200 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  {showAnswer ? 'Ẩn đáp án' : '👁️ Xem đáp án chuẩn'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSkipQuestion}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <SkipForward className="w-4 h-4" /> Bỏ qua câu này
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer transition-all"
                  >
                    <span>Câu Tiếp Theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Winner Announcement Screen with Confetti */
        <div className="text-center py-12 px-6 rounded-3xl bg-slate-900 border-2 border-amber-500/50 space-y-8 shadow-2xl animate-scaleUp">
          <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-500 text-5xl flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30">
            🏆
          </div>

          <div className="space-y-2">
            <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-black text-xs tracking-wider uppercase border border-amber-500/30">
              VINH DANH ĐẤU TRƯỜNG LỚP HỌC
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-amber-300 font-serif-title uppercase">
              {winners.length === 1 ? `🏆 ${winners[0].name} CHIẾN THẮNG!` : '🏆 KẾT QUẢ HÒA ĐỒNG HẠNG NHẤT!'}
            </h2>
            <p className="text-slate-300 text-base">
              Điểm số cao nhất: <strong className="text-yellow-400 text-xl font-bold">{maxScore} ĐIỂM</strong>
            </p>
          </div>

          {/* Final Standings Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {teams.map((t, i) => (
              <div 
                key={t.id}
                className={`p-5 rounded-2xl border-2 text-center space-y-2 bg-slate-950 ${
                  t.score === maxScore ? 'border-amber-400 bg-amber-950/20' : 'border-slate-800'
                }`}
              >
                <span className="text-xs text-slate-400 font-bold">Hạng #{i + 1}</span>
                <h4 className="font-bold text-base text-slate-100">{t.name}</h4>
                <div className="text-3xl font-black text-amber-400 font-serif-title">{t.score}đ</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={startBattle}
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-4 h-4" /> Bắt Đầu Trận Mới
            </button>
            <button
              onClick={() => setIsBattleStarted(false)}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all cursor-pointer"
            >
              Cài Đặt Lại Đội
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
