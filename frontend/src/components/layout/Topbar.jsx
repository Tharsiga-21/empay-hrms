import { useAuth } from '../../context/AuthContext';
import { Search, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/5"
      style={{ background: 'rgba(11, 19, 38, 0.6)', backdropFilter: 'blur(12px)' }}>
      {/* Search */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
        <input
          type="text"
          placeholder="Search employees, reports..."
          className="input-glass w-full pl-10 pr-4 py-2 text-sm rounded-xl"
        />
      </div>

      {/* Center brand */}
      <span className="text-primary font-semibold text-sm tracking-wide hidden md:block">EmPay</span>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl hover:bg-white/5 text-on-surface-variant transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-warning rounded-full pulse-dot" />
        </button>
        <button
          onClick={() => navigate('/admin/settings')}
          className="p-2 rounded-xl hover:bg-white/5 text-on-surface-variant transition-colors"
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-xl hover:bg-white/5 transition-colors"
        >
          <span className="text-sm text-on-surface font-medium hidden sm:block">{user?.full_name?.split(' ')[0]}</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{ background: 'linear-gradient(135deg, #4d8eff, #571bc1)', color: 'white' }}>
            {getInitials(user?.full_name)}
          </div>
        </button>
      </div>
    </header>
  );
}
