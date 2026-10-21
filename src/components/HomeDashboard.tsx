import React, { useState } from 'react';
import { 
  Rocket, 
  BookOpen, 
  Gamepad2, 
  Users, 
  FileText, 
  BrainCircuit, 
  AlertCircle, 
  Trophy, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  History,
  Target
} from 'lucide-react';
import { StudentProfile, ViewMode } from '../types';
import { soundManager } from '../utils/soundEffects';
import { TOPICS_META } from '../data/historyQuestions';

interface HomeDashboardProps {
  profile: StudentProfile;
  onUpdateProfile: (partial: Partial<StudentProfile>) => void;
  onNavigate: (view: ViewMode) => void;
  wrongCount: number;
  levelInfo: {
    title: string;
    icon: string;
    color: string;
  };
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  profile,
  onUpdateProfile,
  onNavigate,
  wrongCount,
  levelInfo
}) => {
  const [studentName, setStudentName] = useState(profile.name);
  const [className, setClassName] = useState(profile.className);
  const [isSaved, setIsSaved] = useState(false);

  const handleStart = () => {
    soundManager.playVictory();
    onUpdateProfile({
      name: studentName.trim() || 'Học sinh Sử 11',
      className: className.trim() || '11A1'
    });
    setIsSaved(true);
    setTimeout(() => {
      onNavigate('topics');
    }, 300);
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    onUpdateProfile({
      name: studentName.trim() || 'Học sinh Sử 11',
      className: className.trim() || '11A1'
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-8 animate-fadeIn">
      {/* Hero Historical Gateway */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-amber-950/40 to-slate-900 border-2 border-amber-600/40 p-6 sm:p-10 shadow-2xl shadow-amber-950/50">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <span>✨</span> ĐỀ CƯƠNG ÔN TẬP CHUẨN NĂM HỌC 2026 – 2027
          </div>

          {/* Epic Title */}
          <div className="space-y-2">
            <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 uppercase drop-shadow-[0_4px_14px_rgba(245,158,11,0.35)] flex flex-col items-center justify-center gap-1.5 sm:gap-2">
              <span className="text-xs sm:text-sm tracking-[0.2em] text-amber-300 font-extrabold bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 border border-amber-400/50 px-4 py-1 rounded-full shadow-sm">
                ★ MÔN LỊCH SỬ ★
              </span>
              <span>🏛️ ĐẤU TRƯỜNG LỊCH SỬ</span>
            </h1>
            <p className="font-serif-title text-xl sm:text-2xl font-bold text-amber-400 tracking-wider">
              🎯 CHINH PHỤC GIỮA HỌC KỲ I
            </p>
          </div>

          <p className="text-slate-300 italic text-base sm:text-lg max-w-xl mx-auto">
            “Ôn tập thông minh – Chinh phục điểm cao”
          </p>

          {/* Student Info Inputs Box */}
          <form 
            onSubmit={handleSaveInfo}
            className="mt-6 p-4 sm:p-6 bg-slate-950/80 rounded-2xl border border-amber-500/30 max-w-xl mx-auto shadow-inner"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  👤 Họ và tên học sinh:
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên..."
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  🏫 Lớp:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: 11A1, 11D2..."
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Big Launch Button */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-amber-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Rocket className="w-5 h-5 text-slate-950 animate-bounce" />
                <span>🚀 BẮT ĐẦU ÔN TẬP</span>
              </button>
            </div>
            {isSaved && (
              <p className="text-emerald-400 text-xs font-semibold mt-2 animate-fadeIn">
                ✓ Đã lưu thông tin của bạn!
              </p>
            )}
          </form>

          {/* Quick Stat Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="text-base">{levelInfo.icon}</span> Danh hiệu: <strong className={levelInfo.color}>{levelInfo.title}</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Tích lũy: <strong className="text-amber-300">{profile.xp} XP</strong>
            </span>
            {wrongCount > 0 && (
              <button
                onClick={() => { soundManager.playClick(); onNavigate('wrong_notebook'); }}
                className="flex items-center gap-1.5 bg-rose-950/60 text-rose-300 hover:bg-rose-900/80 px-3 py-1.5 rounded-full border border-rose-800/60 transition-colors cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Sổ câu sai: <strong>{wrongCount} câu</strong>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Navigation */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          <span>CÁC KHU VỰC ÔN LUYỆN & TRÒ CHƠI</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Học theo chủ đề */}
          <div 
            onClick={() => { soundManager.playClick(); onNavigate('topics'); }}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg hover:shadow-amber-900/20 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                Học theo chủ đề
              </h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                4 chuyên đề bám sát đề cương: Cách mạng tư sản, CNTB xác lập & phát triển, Liên bang Xô viết, CNXH sau CTTG II.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Bắt đầu ôn bài</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: 7 Trò chơi ôn tập */}
          <div 
            onClick={() => { soundManager.playClick(); onNavigate('games'); }}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg hover:shadow-amber-900/20 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              7 Minigames
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🎮
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                Đấu trường 7 Trò chơi
              </h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Chọn nhanh, 60 giây thử thách, Triệu phú lịch sử, Vòng quay may mắn, Ghép đôi mốc thời gian, Giải mã tư liệu, Ô cửa bí mật.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>Vào khu trò chơi</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Chế độ thi đấu theo đội */}
          <div 
            onClick={() => { soundManager.playClick(); onNavigate('team_battle'); }}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg hover:shadow-amber-900/20 flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              👥
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                Thi đấu theo đội (Lớp học)
              </h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Dành cho giáo viên & học sinh chia 2, 3, 4 đội thi đấu trực tiếp trên màn hình máy chiếu với hiệu ứng pháo hoa rực rỡ.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Mở phòng đấu đội</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Thi thử GK1 */}
          <div 
            onClick={() => { soundManager.playClick(); onNavigate('exam'); }}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg hover:shadow-amber-900/20 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Đúng cấu trúc
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📝
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                Thi thử Giữa Học Kỳ I
              </h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Đồng hồ đếm ngược, phân bổ chuẩn câu hỏi các bài, gắn cờ xem lại, chấm điểm thang 10 kèm phân tích đáp án chi tiết.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Bắt đầu làm bài thi</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 5: Flashcard Tự luận */}
          <div 
            onClick={() => { soundManager.playClick(); onNavigate('flashcards'); }}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg hover:shadow-amber-900/20 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🧠
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                Flashcard Tự luận
              </h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Nhớ nhanh các ý chính phần tự luận: CNXH châu Á, Cu-ba, sụp đổ Đông Âu & Liên Xô, cải cách mở cửa Trung Quốc 1978.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Luyện thẻ ghi nhớ</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 6: Sổ tay câu sai */}
          <div 
            onClick={() => { soundManager.playClick(); onNavigate('wrong_notebook'); }}
            className="group p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer shadow-lg hover:shadow-rose-950/20 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ❌
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
                Sổ tay câu làm sai
              </h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Tự động lưu lại mọi câu trả lời sai. Khi bạn trả lời đúng lại 2 lần liên tiếp sẽ được chứng nhận “✓ ĐÃ THUỘC”.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>{wrongCount > 0 ? `Ôn ${wrongCount} câu sai` : 'Chưa có câu sai'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Topics Overview Summary Bar */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-200 text-sm sm:text-base flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <span>Phạm vi đề cương kiểm tra giữa kì I</span>
          </h3>
          <span className="text-xs text-amber-400 font-semibold">100% Theo Đề Cương</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-slate-300">
          {TOPICS_META.map(tp => (
            <div key={tp.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/60 space-y-1">
              <span className="text-[10px] font-bold text-amber-400">{tp.number}</span>
              <p className="font-semibold text-slate-100 line-clamp-2">{tp.title}</p>
              <p className="text-slate-400 text-[11px]">{tp.questionCount} câu hỏi chuẩn</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
