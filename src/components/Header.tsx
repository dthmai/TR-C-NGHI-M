import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  Sparkles, 
  Award, 
  Flame, 
  Home, 
  BookOpen, 
  Gamepad2, 
  FileText, 
  BrainCircuit, 
  AlertCircle
} from 'lucide-react';
import { StudentProfile, ViewMode } from '../types';
import { soundManager } from '../utils/soundEffects';

interface HeaderProps {
  profile: StudentProfile;
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onToggleSound: () => void;
  onOpenTeacher: () => void;
  levelInfo: {
    title: string;
    icon: string;
    minXp: number;
    nextXp: number;
    color: string;
  };
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  currentView,
  onNavigate,
  onToggleSound,
  onOpenTeacher,
  levelInfo
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    soundManager.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const xpProgress = Math.min(
    100,
    Math.round(((profile.xp - levelInfo.minXp) / (levelInfo.nextXp - levelInfo.minXp)) * 100)
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-amber-900/30 px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => { soundManager.playClick(); onNavigate('home'); }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xl shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-title font-black text-amber-400 text-sm sm:text-base tracking-wider uppercase group-hover:text-amber-300">
                Đấu Trường Lịch Sử
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold hidden md:inline">
                GK1
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Ôn thi Giữa Kỳ I (2026–2027)
            </p>
          </div>
        </div>

        {/* Quick Nav Links on Medium+ screens */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { soundManager.playClick(); onNavigate('home'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'home' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Trang chủ
          </button>
          <button
            onClick={() => { soundManager.playClick(); onNavigate('topics'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'topics' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Chủ đề
          </button>
          <button
            onClick={() => { soundManager.playClick(); onNavigate('games'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView.startsWith('game') || currentView === 'games' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" /> Trò chơi
          </button>
          <button
            onClick={() => { soundManager.playClick(); onNavigate('exam'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'exam' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Thi thử GK1
          </button>
          <button
            onClick={() => { soundManager.playClick(); onNavigate('flashcards'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'flashcards' 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" /> Flashcard
          </button>
          <button
            onClick={() => { soundManager.playClick(); onNavigate('wrong_notebook'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentView === 'wrong_notebook' 
                ? 'bg-rose-700 text-white shadow-sm' 
                : 'text-rose-300 hover:text-white hover:bg-rose-950/40'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" /> Sổ câu sai
          </button>
        </nav>

        {/* Student Stats & Controls */}
        <div className="flex items-center gap-2">
          {/* Level & XP Capsule */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-xl shadow-inner">
            <span className="text-base" title={levelInfo.title}>{levelInfo.icon}</span>
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2 text-[11px] leading-tight">
                <span className={`font-bold ${levelInfo.color}`}>{levelInfo.title}</span>
                <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> {profile.xp} XP
                </span>
              </div>
              <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, xpProgress)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Student badge */}
          {profile.name ? (
            <div 
              onClick={() => { soundManager.playClick(); onNavigate('home'); }}
              className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-600/30 px-2.5 py-1.5 rounded-xl cursor-pointer hover:bg-amber-900/40"
              title={`${profile.name} - ${profile.className || 'Chưa chọn lớp'}`}
            >
              <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-semibold text-amber-200 max-w-[90px] truncate">
                {profile.name}
              </span>
            </div>
          ) : null}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Bật/Tắt âm thanh"
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title={profile.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toàn màn hình"
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors hidden sm:flex"
            title="Trình chiếu toàn màn hình"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Teacher Mode Button */}
          <button
            onClick={() => { soundManager.playClick(); onOpenTeacher(); }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-900/50 hover:bg-purple-800/70 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all shadow-sm"
            title="Trang quản lý & Cài đặt Giáo viên"
          >
            <Settings className="w-3.5 h-3.5 text-purple-300 animate-spin-slow" />
            <span className="hidden md:inline">GIÁO VIÊN</span>
          </button>
        </div>
      </div>
    </header>
  );
};
