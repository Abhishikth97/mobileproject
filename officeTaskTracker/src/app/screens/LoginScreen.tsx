import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, CheckSquare, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [loading, setLoading]         = useState(false);
  const [showHint, setShowHint]       = useState(true);

  const validateField = (name: 'email' | 'password', value: string) => {
    if (name === 'email') {
      if (!value) return 'Email is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address.';
      return '';
    }
    if (name === 'password') {
      if (!value) return 'Password is required.';
      if (value.trim().length < 6) return 'Password must be at least 6 characters.';
      return '';
    }
    return '';
  };

  const handleBlur = (name: 'email' | 'password', value: string) => {
    setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr    = validateField('email', email);
    const passwordErr = validateField('password', password);
    setFieldErrors({ email: emailErr, password: passwordErr });
    if (emailErr || passwordErr) return;

    setLoading(true);
    setError('');
    // Simulate async
    setTimeout(() => {
      const err = login(email, password);
      setLoading(false);
      if (err) {
        setError(err);
      } else {
        navigate('/home');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#EAECF0] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-[430px] bg-white rounded-[36px] shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="bg-white px-6 pt-4 pb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-800">9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0" y="3" width="3" height="9" rx="0.5" fill="#1B2235"/>
              <rect x="4.5" y="2" width="3" height="10" rx="0.5" fill="#1B2235"/>
              <rect x="9" y="0" width="3" height="12" rx="0.5" fill="#1B2235"/>
              <rect x="13.5" y="1" width="2.5" height="11" rx="0.5" fill="#D1D5DB"/>
            </svg>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
              <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="#1B2235"/>
              <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#1B2235"/>
              <path d="M22 4.5V7.5C22.8 7.2 23.5 6.7 23.5 6C23.5 5.3 22.8 4.8 22 4.5Z" fill="#1B2235"/>
            </svg>
          </div>
        </div>

        <div className="px-8 pb-10">
          {/* Logo */}
          <div className="flex flex-col items-center mt-6 mb-6">
            <div className="w-16 h-16 bg-[#1B2235] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <CheckSquare size={32} className="text-white" />
            </div>
            <h1 className="text-[22px] font-bold text-[#1B2235]">officeTaskTracker</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
          </div>

          {/* Demo hint */}
          {showHint && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-5 flex items-start gap-2">
              <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-blue-700">Demo Credentials</p>
                <p className="text-xs text-blue-600 mt-0.5">
                  Email: <span className="font-mono font-medium">abhishikth@example.com</span><br />
                  Password: <span className="font-mono font-medium">abhishikth123</span>
                </p>
              </div>
              <button onClick={() => setShowHint(false)} className="text-blue-400 text-xs leading-none">✕</button>
            </div>
          )}

          {/* Global error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3 mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${fieldErrors.email ? 'text-red-400' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  onBlur={e => handleBlur('email', e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 bg-[#F5F6FA] rounded-xl border focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition
                    ${fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-transparent focus:border-[#1B2235]'}`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${fieldErrors.password ? 'text-red-400' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  onBlur={e => handleBlur('password', e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 bg-[#F5F6FA] rounded-xl border focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition
                    ${fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-transparent focus:border-[#1B2235]'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button type="button" className="text-xs text-[#1B2235] underline">
                Forgot password?
              </button>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1B2235] text-white rounded-xl font-semibold text-sm hover:bg-[#252f47] active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="32" strokeDashoffset="8" />
                  </svg>
                  Signing in…
                </>
              ) : 'Login'}
            </button>

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google placeholder */}
            <button
              type="button"
              className="w-full py-3 border border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-sm text-gray-500 hover:bg-gray-50 transition"
            >
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-500">G</span>
              </div>
              Continue with Google
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-[#1B2235] font-semibold underline"
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
