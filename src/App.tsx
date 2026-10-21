import React, { useState } from 'react';
import { ViewMode } from './types';
import { useStorage } from './hooks/useStorage';
import { soundManager } from './utils/soundEffects';

import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { TopicLearningView } from './components/TopicLearningView';
import { GameSelector } from './components/games/GameSelector';
import { Game1Speed } from './components/games/Game1Speed';
import { Game2SixtySeconds } from './components/games/Game2SixtySeconds';
import { Game3Millionaire } from './components/games/Game3Millionaire';
import { Game4HistoryWheel } from './components/games/Game4HistoryWheel';
import { Game5Matching } from './components/games/Game5Matching';
import { Game6DocumentDecode } from './components/games/Game6DocumentDecode';
import { Game7SecretDoors } from './components/games/Game7SecretDoors';
import { TeamBattleView } from './components/TeamBattleView';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { FlashcardView } from './components/FlashcardView';
import { WrongNotebookView } from './components/WrongNotebookView';
import { TeacherSettingsModal } from './components/TeacherSettingsModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);

  const {
    profile,
    updateProfile,
    addXP,
    updateHighScore,
    wrongQuestions,
    topicStats,
    recordAnswer,
    examHistory,
    addExamResult,
    flashcardRatings,
    recordFlashcardRating,
    teacherConfig,
    setTeacherConfig,
    resetAllProgress,
    getLevelInfo
  } = useStorage();

  const levelInfo = getLevelInfo(profile.xp);
  const unmasteredWrongCount = Object.values(wrongQuestions).filter(w => !w.isMastered).length;

  const handleToggleSound = () => {
    const nextVal = !profile.soundEnabled;
    updateProfile({ soundEnabled: nextVal });
    soundManager.setEnabled(nextVal);
    if (nextVal) soundManager.playClick();
  };

  const navigateTo = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Universal Top Header */}
      <Header
        profile={profile}
        currentView={currentView}
        onNavigate={navigateTo}
        onToggleSound={handleToggleSound}
        onOpenTeacher={() => setIsTeacherModalOpen(true)}
        levelInfo={levelInfo}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          <HomeDashboard
            profile={profile}
            onUpdateProfile={updateProfile}
            onNavigate={navigateTo}
            wrongCount={unmasteredWrongCount}
            levelInfo={levelInfo}
          />
        )}

        {currentView === 'topics' && (
          <TopicLearningView
            topicStats={topicStats}
            wrongQuestions={wrongQuestions}
            onRecordAnswer={recordAnswer}
            onAddXP={addXP}
            onNavigate={navigateTo}
          />
        )}

        {currentView === 'games' && (
          <GameSelector
            onSelectGame={navigateTo}
            onBack={() => navigateTo('home')}
          />
        )}

        {currentView === 'game_speed' && (
          <Game1Speed
            onBack={() => navigateTo('games')}
            onRecordAnswer={recordAnswer}
            onAddXP={addXP}
          />
        )}

        {currentView === 'game_60s' && (
          <Game2SixtySeconds
            onBack={() => navigateTo('games')}
            onRecordAnswer={recordAnswer}
            onAddXP={addXP}
          />
        )}

        {currentView === 'game_millionaire' && (
          <Game3Millionaire
            onBack={() => navigateTo('games')}
            onRecordAnswer={recordAnswer}
            onAddXP={addXP}
          />
        )}

        {currentView === 'game_wheel' && (
          <Game4HistoryWheel
            onBack={() => navigateTo('games')}
            onRecordAnswer={recordAnswer}
            onAddXP={addXP}
          />
        )}

        {currentView === 'game_matching' && (
          <Game5Matching
            onBack={() => navigateTo('games')}
            onAddXP={addXP}
          />
        )}

        {currentView === 'game_source' && (
          <Game6DocumentDecode
            onBack={() => navigateTo('games')}
            onAddXP={addXP}
          />
        )}

        {currentView === 'game_secret_doors' && (
          <Game7SecretDoors
            onBack={() => navigateTo('games')}
            onRecordAnswer={recordAnswer}
            onAddXP={addXP}
          />
        )}

        {currentView === 'team_battle' && (
          <TeamBattleView
            onBack={() => navigateTo('home')}
          />
        )}

        {currentView === 'exam' && (
          <ExamSimulatorView
            onBack={() => navigateTo('home')}
            onRecordAnswer={recordAnswer}
            onAddExamResult={addExamResult}
            onAddXP={addXP}
            onNavigate={navigateTo}
          />
        )}

        {currentView === 'flashcards' && (
          <FlashcardView
            ratings={flashcardRatings}
            onRecordRating={recordFlashcardRating}
            onAddXP={addXP}
            onBack={() => navigateTo('home')}
          />
        )}

        {currentView === 'wrong_notebook' && (
          <WrongNotebookView
            wrongQuestions={wrongQuestions}
            onRecordAnswer={recordAnswer}
            onAddXP={addXP}
            onBack={() => navigateTo('home')}
          />
        )}
      </main>

      {/* Teacher Control Modal */}
      <TeacherSettingsModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        config={teacherConfig}
        onUpdateConfig={(partial) => setTeacherConfig(prev => ({ ...prev, ...partial }))}
        onResetAllData={resetAllProgress}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <p>
          🏛️ ĐẤU TRƯỜNG LỊCH SỬ – Chinh Phục Kiểm Tra Giữa Học Kỳ I (2026–2027)
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          Bám sát 100% Đề cương ôn tập chuẩn môn Lịch sử 11
        </p>
      </footer>
    </div>
  );
}
