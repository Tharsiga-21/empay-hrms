import { useState } from 'react';
import { Mail, ArrowLeft, Loader2, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'var(--bg-main)' }}>
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[120px] opacity-30"
        style={{ background: 'var(--primary)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
        style={{ background: 'var(--secondary)' }} />

      <div className="w-full max-w-md relative z-10 fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <KeyRound className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-on-surface mb-3 tracking-tight">Forgot Password</h1>
          <p className="text-on-surface-variant">We'll send you a link to reset it.</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-surface shadow-2xl backdrop-blur-xl">
          {submitted ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-on-surface">Check your email</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                We sent a password reset link to <br/>
                <span className="font-semibold text-on-surface">{email}</span>
              </p>
              <Link to="/login" className="btn-glow w-full py-3 rounded-xl flex justify-center items-center font-semibold text-white mt-4"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-on-surface-variant ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-surface/50 border border-surface text-on-surface rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="btn-glow w-full py-3.5 rounded-xl flex justify-center items-center gap-2 font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>

        {!submitted && (
          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
