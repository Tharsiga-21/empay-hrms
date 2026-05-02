import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Search, Bell, Settings, Sun, Moon, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import api from '../../api/axios';

export default function Topbar() {
  const { user } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    
    // Fetch initial notifications
    api.get('/notifications').then(res => setNotifications(res.data.data)).catch(console.error);

    // Setup Socket
    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const socket = io(socketUrl);
    
    socket.emit('join', user.id);
    
    socket.on('notification', (newNotif) => {
      setNotifications(prev => [newNotif, ...prev]);
    });

    return () => socket.disconnect();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.length > 1) {
      setShowSearch(true);
      try {
        const res = await api.get(`/search?q=${q}`);
        setSearchResults(res.data.data);
      } catch (err) { console.error(err); }
    } else {
      setShowSearch(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) { console.error(err); }
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b"
      style={{ background: 'var(--topbar-bg)', backdropFilter: 'blur(12px)', borderColor: 'var(--sidebar-border)' }}>
      {/* Search */}
      <div className="relative w-80" ref={searchRef}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => searchQuery.length > 1 && setShowSearch(true)}
          placeholder="Search employees, reports..."
          className="input-glass w-full pl-10 pr-4 py-2 text-sm rounded-xl"
        />
        {showSearch && (
          <div className="absolute top-full left-0 mt-2 w-full glass-panel border border-surface rounded-xl shadow-lg overflow-hidden z-50">
            {searchResults.length === 0 ? (
              <div className="p-4 text-sm text-on-surface-variant text-center">No results found</div>
            ) : (
              searchResults.map(result => (
                <div key={result.id} className="p-3 border-b border-surface hover:bg-[var(--sidebar-hover)] cursor-pointer flex items-center gap-3 transition-colors"
                     onClick={() => { setShowSearch(false); setSearchQuery(''); }}>
                  {result.profile_pic ? (
                    <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${result.profile_pic}`} className="w-8 h-8 rounded-full object-cover" alt="" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{getInitials(result.full_name)}</div>
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-on-surface">{result.full_name}</h4>
                    <p className="text-[10px] text-on-surface-variant">{result.designation || result.department || 'Employee'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Center brand */}
      <span className="text-primary font-semibold text-sm tracking-wide hidden md:block">EmPay</span>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn relative p-2 rounded-xl hover:bg-[var(--sidebar-hover)] text-on-surface-variant transition-colors"
          title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
          id="theme-toggle"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="theme-toggle-icon w-[18px] h-[18px]" />
          ) : (
            <Moon className="theme-toggle-icon w-[18px] h-[18px]" />
          )}
        </button>

        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl hover:bg-[var(--sidebar-hover)] text-on-surface-variant transition-colors"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-warning rounded-full pulse-dot" />}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl glass-panel shadow-lg border border-surface overflow-hidden z-50">
              <div className="p-4 border-b border-surface flex items-center justify-between">
                <h3 className="font-semibold text-on-surface">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => api.put('/notifications/read-all').then(() => setNotifications(prev => prev.map(n => ({...n, is_read: true}))))}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-on-surface-variant text-sm">No new notifications</div>
                ) : (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => !n.is_read && markAsRead(n.id)}
                      className={`p-4 border-b border-surface cursor-pointer hover:bg-[var(--sidebar-hover)] transition-colors ${!n.is_read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className={`text-sm ${!n.is_read ? 'font-semibold text-on-surface' : 'text-on-surface-variant'}`}>{n.title}</h4>
                          <p className="text-xs text-on-surface-variant mt-1">{n.message}</p>
                          <span className="text-[10px] text-outline mt-2 block">{new Date(n.created_at).toLocaleString()}</span>
                        </div>
                        {!n.is_read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate('/admin/settings')}
          className="p-2 rounded-xl hover:bg-[var(--sidebar-hover)] text-on-surface-variant transition-colors"
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-xl hover:bg-[var(--sidebar-hover)] transition-colors"
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
