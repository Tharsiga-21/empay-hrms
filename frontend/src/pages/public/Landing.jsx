import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Building2, CalendarCheck, Clock, Banknote, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';

export default function Landing() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: '#0b1326' }}>
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-30 pointer-events-none" style={{ background: '#4d8eff' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] opacity-30 pointer-events-none" style={{ background: '#571bc1' }} />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between z-10 glass-card rounded-none border-t-0 border-l-0 border-r-0 border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4d8eff, #571bc1)' }}>
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">EmPay HRMS</span>
        </div>
        <Link to="/login" className="btn-glow px-6 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 border border-primary/30 bg-primary/10">
          <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">The Future of HR is Here</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white max-w-4xl tracking-tight mb-6 leading-tight">
          Manage your workforce with <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #4d8eff, #a78bfa)' }}>intelligent precision</span>
        </h1>
        
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12">
          EmPay combines seamless attendance tracking, automated leave management, and complex payroll processing into a single, beautiful glassmorphic experience.
        </p>
        
        <div className="flex items-center gap-4">
          <Link to="/login" className="btn-glow flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #4d8eff, #571bc1)' }}>
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="#features" className="px-8 py-4 rounded-2xl text-base font-semibold text-on-surface hover:bg-white/5 border border-white/10 transition-colors">
            Explore Features
          </a>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 md:px-12 z-10 bg-black/20 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to scale</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Powerful modules perfectly integrated to streamline your human resource operations from day one.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Smart Attendance', desc: 'Real-time check-ins, monthly calendar grids, and precise hour tracking.', icon: Clock, color: '#4d8eff' },
              { title: 'Leave Management', desc: 'Custom leave types, balance tracking, and automated approval workflows.', icon: CalendarCheck, color: '#f87171' },
              { title: 'Payroll Engine', desc: '12-step salary calculations, tax deductions, and one-click payruns.', icon: Banknote, color: '#4ade80' },
              { title: 'Role-Based Access', desc: 'Granular permissions for Admins, HR, Payroll Officers, and Employees.', icon: ShieldCheck, color: '#a78bfa' },
              { title: 'Beautiful Analytics', desc: 'Interactive charts and Bento-grid dashboards for actionable insights.', icon: BarChart3, color: '#4cd7f6' },
              { title: 'PDF Payslips', desc: 'Automatically generate and distribute professional, compliant salary slips.', icon: Building2, color: '#fbbf24' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glass-card p-6 fade-in hover:-translate-y-1 transition-transform cursor-default" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                    <Icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-on-surface-variant">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-on-surface-variant text-sm border-t border-white/5 z-10 bg-black/40">
        <p>© {new Date().getFullYear()} EmPay HRMS. All rights reserved.</p>
      </footer>
    </div>
  );
}
