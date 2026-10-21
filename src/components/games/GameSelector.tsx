import React from 'react';
import { 
  Zap, 
  Timer, 
  Trophy, 
  Disc, 
  Link2, 
  Scroll, 
  Grid, 
  ArrowLeft,
  Sparkles,
  ChevronRight,
  Flame,
  Star
} from 'lucide-react';
import { ViewMode } from '../../types';
import { soundManager } from '../../utils/soundEffects';

interface GameSelectorProps {
  onSelectGame: (view: ViewMode) => void;
  onBack: () => void;
}

export const GameSelector: React.FC<GameSelectorProps> = ({ onSelectGame, onBack }) => {
  const games = [
    {
      id: 'game_speed' as ViewMode,
      icon: '🎯',
      title: 'Game 1 – Chọn Nhanh Đáp Án',
      subtitle: 'Tốc độ phản xạ & Độ chính xác',
      desc: 'Trả lời nhanh trắc nghiệm 4 lựa chọn A, B, C, D. Phản hồi tức thì, thưởng điểm tốc độ trong 5 giây đầu.',
      color: 'from-amber-600/30 to-amber-900/30 border-amber-500/40 text-amber-300',
      badge: 'Phổ biến nhất'
    },
    {
      id: 'game_60s' as ViewMode,
      icon: '⏱️',
      title: 'Game 2 – 60 Giây Thử Thách',
      subtitle: 'Đua điểm & Chuỗi Combo x2, x3',
      desc: '60 giây nghẹt thở! Trả lời đúng liên tiếp 3 câu kích hoạt Combo x2, 5 câu kích hoạt Combo x3 rực lửa.',
      color: 'from-rose-600/30 to-rose-900/30 border-rose-500/40 text-rose-300',
      badge: 'Cực kịch tính'
    },
    {
      id: 'game_millionaire' as ViewMode,
      icon: '💰',
      title: 'Game 3 – Ai Là Triệu Phú Lịch Sử',
      subtitle: '15 Câu hỏi & 3 Quyền trợ giúp',
      desc: '15 mốc điểm từ 100 đến 1.000.000 điểm. Trợ giúp 50:50, Hỏi ý kiến khán giả, Đổi câu hỏi với âm thanh hồi hộp.',
      color: 'from-yellow-600/30 to-yellow-900/30 border-yellow-500/40 text-yellow-300',
      badge: '1.000.000 Điểm'
    },
    {
      id: 'game_wheel' as ViewMode,
      icon: '🎡',
      title: 'Game 4 – Vòng Quay Lịch Sử',
      subtitle: 'Vòng quay ngẫu nhiên & May mắn',
      desc: 'Quay chọn ngẫu nhiên chủ đề kiến thức, ô nhân đôi điểm số, ô may mắn bất ngờ để bứt phá bảng xếp hạng.',
      color: 'from-indigo-600/30 to-indigo-900/30 border-indigo-500/40 text-indigo-300',
      badge: 'Vui nhộn'
    },
    {
      id: 'game_matching' as ViewMode,
      icon: '🔗',
      title: 'Game 5 – Ghép Đôi Lịch Sử',
      subtitle: 'Sự kiện ↔ Mốc thời gian ↔ Nhân vật',
      desc: 'Ghép nối các mốc năm quan trọng (1776, 1789, 1917, 1922, 1949, 1978, 1991...), quốc gia và khái niệm cốt lõi.',
      color: 'from-emerald-600/30 to-emerald-900/30 border-emerald-500/40 text-emerald-300',
      badge: 'Ghi nhớ sâu'
    },
    {
      id: 'game_source' as ViewMode,
      icon: '📜',
      title: 'Game 6 – Giải Mã Tư Liệu',
      subtitle: 'Trắc nghiệm Đúng / Sai Đề cương',
      desc: 'Đọc nguyên văn tư liệu lịch sử gốc, phán đoán 4 nhận định a, b, c, d Đúng hay Sai và nhận phân tích chuyên sâu.',
      color: 'from-cyan-600/30 to-cyan-900/30 border-cyan-500/40 text-cyan-300',
      badge: 'Chuẩn format mới'
    },
    {
      id: 'game_secret_doors' as ViewMode,
      icon: '🧩',
      title: 'Game 7 – Ô Cửa Bí Mật',
      subtitle: '12 Ô thử thách & Phần quà bí ẩn',
      desc: 'Bảng 12 ô số ẩn chứa câu hỏi, ngôi sao +20 điểm, bom mất lượt, quà nhân đôi hoặc câu hỏi Jackpot độc đắc.',
      color: 'from-purple-600/30 to-purple-900/30 border-purple-500/40 text-purple-300',
      badge: 'Bất ngờ'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { soundManager.playClick(); onBack(); }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-amber-400 font-serif-title uppercase tracking-wide">
              🎮 Đấu Trường 7 Trò Chơi Lịch Sử
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Chọn trò chơi yêu thích để bắt đầu hành trình chinh phục kiến thức Giữa Kỳ I
            </p>
          </div>
        </div>
      </div>

      {/* Grid of 7 games */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map((g) => (
          <div
            key={g.id}
            onClick={() => {
              soundManager.playClick();
              onSelectGame(g.id);
            }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${g.color} bg-slate-900/80 border-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl flex flex-col justify-between group`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl filter drop-shadow">{g.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950/60 border border-slate-700 text-slate-200">
                  {g.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                {g.title}
              </h3>
              <p className="text-xs font-semibold text-amber-400/90 mt-0.5">
                {g.subtitle}
              </p>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                {g.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>BẮT ĐẦU CHƠI</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
