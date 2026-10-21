import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Search, 
  Filter, 
  Check, 
  Trash2, 
  Maximize, 
  Minimize, 
  CheckSquare, 
  Square,
  BookOpen,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { ALL_QUESTIONS, TRUE_FALSE_QUESTIONS, ESSAY_FLASHCARDS } from '../data/historyQuestions';
import { TeacherConfig } from '../hooks/useStorage';
import { soundManager } from '../utils/soundEffects';

interface TeacherSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: TeacherConfig;
  onUpdateConfig: (partial: Partial<TeacherConfig>) => void;
  onResetAllData: () => void;
}

export const TeacherSettingsModal: React.FC<TeacherSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetAllData
}) => {
  const [activeTab, setActiveTab] = useState<'bank' | 'settings' | 'classroom_picks'>('bank');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<string>('all');
  const [resetConfirm, setResetConfirm] = useState(false);

  if (!isOpen) return null;

  // Filter questions
  const filteredQuestions = ALL_QUESTIONS.filter(q => {
    const matchLesson = selectedLessonFilter === 'all' || q.lessonId === selectedLessonFilter;
    const matchSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(q.options).some(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchLesson && matchSearch;
  });

  const handleToggleDisabled = (id: string) => {
    soundManager.playClick();
    const currentDisabled = config.disabledQuestionIds || [];
    const exists = currentDisabled.includes(id);
    const updated = exists 
      ? currentDisabled.filter(item => item !== id)
      : [...currentDisabled, id];
    onUpdateConfig({ disabledQuestionIds: updated });
  };

  const handleToggleClassroomPick = (id: string) => {
    soundManager.playClick();
    const currentPicks = config.classroomSelectedIds || [];
    const exists = currentPicks.includes(id);
    const updated = exists
      ? currentPicks.filter(item => item !== id)
      : [...currentPicks, id];
    onUpdateConfig({ classroomSelectedIds: updated });
  };

  const handleSelectAllForClassroom = () => {
    soundManager.playClick();
    const ids = filteredQuestions.map(q => q.id);
    onUpdateConfig({ classroomSelectedIds: ids });
  };

  const handleClearClassroomPicks = () => {
    soundManager.playClick();
    onUpdateConfig({ classroomSelectedIds: [] });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border-2 border-purple-500/50 rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-purple-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>TRANG DÀNH CHO GIÁO VIÊN</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-semibold">
                  Quản Trị Tiết Học
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Lọc, bật/tắt câu hỏi, chọn trước bộ câu hỏi cho tiết dạy và chỉnh thời gian thi đấu
              </p>
            </div>
          </div>

          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="px-6 py-2.5 bg-slate-950/50 border-b border-slate-800 flex items-center gap-2 text-xs">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('bank'); }}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            📚 Ngân hàng câu hỏi ({ALL_QUESTIONS.length})
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('classroom_picks'); }}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'classroom_picks'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            🎯 Chọn câu hỏi tiết học ({config.classroomSelectedIds?.length || 0})
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('settings'); }}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            ⚙️ Cấu hình trò chơi
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'bank' || activeTab === 'classroom_picks' ? (
            <div className="space-y-4">
              {/* Search & Filter bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm nội dung câu hỏi hoặc đáp án..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>

                <select
                  value={selectedLessonFilter}
                  onChange={(e) => setSelectedLessonFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-purple-500 font-medium"
                >
                  <option value="all">Tất cả bài học</option>
                  <option value="bai-1">Bài 1: CM Tư sản</option>
                  <option value="bai-2">Bài 2: CNTB xác lập</option>
                  <option value="bai-3">Bài 3: Liên Xô</option>
                </select>
              </div>

              {activeTab === 'classroom_picks' && (
                <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/30 flex items-center justify-between text-xs">
                  <span className="text-purple-300 font-semibold">
                    Đã chọn <strong>{config.classroomSelectedIds?.length || 0}</strong> câu hỏi cho tiết học này.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSelectAllForClassroom}
                      className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px]"
                    >
                      Chọn tất cả {filteredQuestions.length} câu đang lọc
                    </button>
                    <button
                      onClick={handleClearClassroomPicks}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px]"
                    >
                      Bỏ chọn tất cả
                    </button>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-3">
                {filteredQuestions.map((q) => {
                  const isDisabled = config.disabledQuestionIds?.includes(q.id);
                  const isPickedForClass = config.classroomSelectedIds?.includes(q.id);

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border transition-all space-y-2 ${
                        isDisabled 
                          ? 'bg-slate-950/40 border-slate-900 opacity-50' 
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {q.lessonName.split(':')[0]} – Câu {q.questionNumber}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-semibold">
                            Đáp án: {q.correctAnswer}
                          </span>
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {activeTab === 'classroom_picks' && (
                            <button
                              onClick={() => handleToggleClassroomPick(q.id)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                                isPickedForClass
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {isPickedForClass ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                              <span>{isPickedForClass ? 'Đã chọn dạy' : 'Chọn dạy'}</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleToggleDisabled(q.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              isDisabled
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {isDisabled ? 'Đang tắt' : 'Đang bật'}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-slate-200">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-400 pt-1">
                        <div>A. {q.options.A}</div>
                        <div>B. {q.options.B}</div>
                        <div>C. {q.options.C}</div>
                        <div>D. {q.options.D}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Settings Tab */
            <div className="space-y-6 max-w-xl mx-auto py-4">
              {/* Game Duration setting */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Thời gian trò chơi đếm ngược:</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[45, 60, 90].map(duration => (
                    <button
                      key={duration}
                      onClick={() => {
                        soundManager.playClick();
                        onUpdateConfig({ gameTimerDuration: duration });
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        config.gameTimerDuration === duration
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {duration} Giây
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of questions per speed game */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Số câu hỏi mỗi phiên game:</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 15, 20].map(count => (
                    <button
                      key={count}
                      onClick={() => {
                        soundManager.playClick();
                        onUpdateConfig({ questionCountPerGame: count });
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        config.questionCountPerGame === count
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {count} Câu
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Data Warning Box */}
              <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/40 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-rose-300">
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  <span>Đặt lại toàn bộ tiến độ & điểm số:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hành động này sẽ xóa toàn bộ XP, điểm cao, lịch sử thi thử và danh sách câu sai trên trình duyệt này.
                </p>
                {!resetConfirm ? (
                  <button
                    onClick={() => setResetConfirm(true)}
                    className="px-4 py-2 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold border border-rose-700 transition-colors cursor-pointer"
                  >
                    Xóa Dữ Liệu
                  </button>
                ) : (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        onResetAllData();
                        setResetConfirm(false);
                        alert('Đã đặt lại dữ liệu thành công.');
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
                    >
                      Xác Nhận Xóa Hết
                    </button>
                    <button
                      onClick={() => setResetConfirm(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Dữ liệu lưu tự động trong localStorage thiết bị</span>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors cursor-pointer"
          >
            Đóng bảng
          </button>
        </div>
      </div>
    </div>
  );
};
