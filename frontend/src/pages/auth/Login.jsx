import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Building2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const roleRedirects = {
  admin: '/admin/dashboard',
  hr_officer: '/hr/dashboard',
  payroll_officer: '/payroll/dashboard',
  employee: '/dashboard',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.full_name}!`);
      navigate(roleRedirects[user.role] || '/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const autoLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Password@123');
    setLoading(true);
    try {
      const user = await login(demoEmail, 'Password@123');
      toast.success(`Welcome back, ${user.full_name}!`);
      navigate(roleRedirects[user.role] || '/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="mesh-gradient" />

      {/* Extra gradient orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
        style={{ background: 'radial-gradient(circle, rgba(87,27,193,0.15) 0%, transparent 70%)', transform: 'translateZ(0)' }} />

      <div className="glass-card-strong w-full max-w-md p-8 fade-in relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg, #4d8eff, #571bc1)' }}>
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">EmPay HRMS</h1>
          <p className="text-sm text-on-surface-variant mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass w-full px-4 py-3 text-sm rounded-xl"
              placeholder="admin@empay.com"
              required
              id="login-email"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-glass w-full px-4 py-3 pr-12 text-sm rounded-xl"
                placeholder="••••••••"
                required
                id="login-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <div className="flex justify-between items-center mt-3">
                <Link to="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-glow w-full py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #4d8eff, #571bc1)' }}
            id="login-submit"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Demo credentials hint */}
        <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(77, 142, 255, 0.08)', border: '1px solid rgba(77, 142, 255, 0.15)' }}>
          <p className="text-[0.65rem] uppercase tracking-widest font-semibold text-primary mb-3 text-center">Click to Auto-Login as Demo User</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Admin', email: 'admin@empay.com' },
              { label: 'HR Officer', email: 'hr@empay.com' },
              { label: 'Payroll', email: 'payroll@empay.com' },
              { label: 'Employee', email: 'sneha@empay.com' }
            ].map(r => (
              <button key={r.email} onClick={() => autoLogin(r.email)} disabled={loading}
                className="px-3 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:text-on-surface transition-all border hover:border-primary/30 hover:bg-primary/10 flex flex-col items-start gap-0.5 text-left disabled:opacity-50" style={{ borderColor: 'var(--glass-border)' }}>
                <span className="font-semibold">{r.label}</span>
                <span className="text-[0.65rem] opacity-70 truncate w-full">{r.email}</span>
              </button>
            ))}
          </div>
          <p className="text-[0.6rem] mt-3 text-center text-on-surface-variant">Default Password: <span className="text-on-surface font-semibold tracking-wider">Password@123</span></p>
        </div>
      </div>
    </div>
  );
}
