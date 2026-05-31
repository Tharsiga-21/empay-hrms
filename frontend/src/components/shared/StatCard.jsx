export default function StatCard({ title, value, icon: Icon, color = 'primary', subtitle, trend }) {
  const colorMap = {
    primary: { bg: 'rgba(77, 142, 255, 0.12)', icon: '#4d8eff', border: 'rgba(77, 142, 255, 0.2)' },
    success: { bg: 'rgba(74, 222, 128, 0.12)', icon: '#4ade80', border: 'rgba(74, 222, 128, 0.2)' },
    warning: { bg: 'rgba(251, 191, 36, 0.12)', icon: '#fbbf24', border: 'rgba(251, 191, 36, 0.2)' },
    danger: { bg: 'rgba(248, 113, 113, 0.12)', icon: '#f87171', border: 'rgba(248, 113, 113, 0.2)' },
    purple: { bg: 'rgba(167, 139, 250, 0.12)', icon: '#a78bfa', border: 'rgba(167, 139, 250, 0.2)' },
    cyan: { bg: 'rgba(76, 215, 246, 0.12)', icon: '#4cd7f6', border: 'rgba(76, 215, 246, 0.2)' },
  };

  const c = colorMap[color] || colorMap.primary;

  return (
    <div className="glass-card p-4 md:p-5 flex items-start justify-between fade-in">
      <div className="flex-1 min-w-0 pr-3">
        <p className="text-[0.7rem] uppercase tracking-widest font-semibold text-on-surface-variant mb-2 truncate">{title}</p>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-on-surface tracking-tight truncate">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {subtitle && (
          <p className="text-xs mt-1.5 truncate" style={{ color: c.icon }}>{subtitle}</p>
        )}
        {trend && (
          <p className="text-xs mt-1.5 flex items-center gap-1 truncate" style={{ color: trend.startsWith('+') ? '#4ade80' : '#f87171' }}>
            <span className="text-base">↗</span> {trend}
          </p>
        )}
      </div>
      {Icon && (
        <div className="p-2 md:p-3 rounded-xl flex-shrink-0" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
          <Icon className="size-5 md:size-6" style={{ color: c.icon }} />
        </div>
      )}
    </div>
  );
}
