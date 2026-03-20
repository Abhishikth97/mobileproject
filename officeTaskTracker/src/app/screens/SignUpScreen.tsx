import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Lock, CheckSquare, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FieldErrors {
  username: string;
  email: string;
  password: string;
  confirm: string;
  terms: string;
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const len    = password.length >= 8;
  const upper  = /[A-Z]/.test(password);
  const number = /[0-9]/.test(password);
  const score  = [len, upper, number].filter(Boolean).length;
  const labels = ['', 'Weak', 'Fair', 'Strong'];
  const colors = ['', 'bg-red-400', 'bg-amber-400', 'bg-green-500'];
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3].map(i => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i <= score ? colors[score] : 'bg-gray-200'}`} />
        ))}
      </div>
      <p className={`text-[10px] font-medium ${score === 1 ? 'text-red-500' : score === 2 ? 'text-amber-500' : 'text-green-600'}`}>
        {labels[score]}
      </p>
    </div>
  );
}

export function SignUpScreen() {
  const navigate = useNavigate();
  const { signup } = useApp();

  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass]     = useState(false);
  const [showConf, setShowConf]     = useState(false);
  const [agreed, setAgreed]         = useState(false);
  const [loading, setLoading]       = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    username: '', email: '', password: '', confirm: '', terms: '',
  });

  const validateField = (name: keyof typeof form, value: string): string => {
    switch (name) {
      case 'username':
        if (!value.trim()) return 'Username is required.';
        if (value.trim().length < 3) return 'Username must be at least 3 characters.';
        if (/\s/.test(value.trim())) return 'Username cannot contain spaces.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address.';
        return '';
      case 'password':
        if (!value) return 'Password is required.';
        if (value.length < 6) return 'Password must be at least 6 characters.';
        return '';
      case 'confirm':
        if (!value) return 'Please confirm your password.';
        if (value !== form.password) return 'Passwords do not match.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (name: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm(prev => ({ ...prev, [name]: val }));
    setGlobalError('');
    // Clear field error on type
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
    // Re-validate confirm when password changes
    if (name === 'password' && form.confirm) {
      setFieldErrors(prev => ({
        ...prev,
        confirm: val !== form.confirm ? 'Passwords do not match.' : '',
      }));
    }
  };

  const handleBlur = (name: keyof typeof form) => () => {
    setFieldErrors(prev => ({ ...prev, [name]: validateField(name, form[name]) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameErr = validateField('username', form.username);
    const emailErr    = validateField('email', form.email);
    const passwordErr = validateField('password', form.password);
    const confirmErr  = validateField('confirm', form.confirm);
    const termsErr    = agreed ? '' : 'You must agree to the Terms & Privacy Policy.';

    setFieldErrors({ username: usernameErr, email: emailErr, password: passwordErr, confirm: confirmErr, terms: termsErr });

    if (usernameErr || emailErr || passwordErr || confirmErr || termsErr) return;

    setLoading(true);
    setTimeout(() => {
      const err = signup(form.username, form.email, form.password, form.confirm);
      setLoading(false);
      if (err) {
        setGlobalError(err);
      } else {
        navigate('/home');
      }
    }, 600);
  };

  const InputField = ({
    name, icon: Icon, label, type, placeholder, showToggle, show, onToggle,
  }: {
    name: keyof typeof form;
    icon: React.ElementType;
    label: string;
    type: string;
    placeholder: string;
    showToggle?: boolean;
    show?: boolean;
    onToggle?: () => void;
  }) => {
    const err = fieldErrors[name];
    return (
      <div>
        <label className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase block mb-1.5">
          {label}
        </label>
        <div className="relative">
          <Icon size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${err ? 'text-red-400' : 'text-gray-400'}`} />
          <input
            type={showToggle ? (show ? 'text' : 'password') : type}
            value={form[name]}
            onChange={handleChange(name)}
            onBlur={handleBlur(name)}
            placeholder={placeholder}
            className={`w-full pl-10 ${showToggle ? 'pr-10' : 'pr-4'} py-3 bg-[#F5F6FA] rounded-xl border focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition
              ${err ? 'border-red-300 bg-red-50' : 'border-transparent focus:border-[#1B2235]'}`}
          />
          {showToggle && (
            <button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {err && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle size={11} /> {err}
          </p>
        )}
        {name === 'password' && !err && <PasswordStrength password={form.password} />}
        {name === 'confirm' && form.confirm && !err && (
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <CheckCircle2 size={11} /> Passwords match
          </p>
        )}
      </div>
    );
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
          <div className="flex flex-col items-center mt-4 mb-5">
            <div className="w-14 h-14 bg-[#1B2235] rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <CheckSquare size={28} className="text-white" />
            </div>
            <h1 className="text-[22px] font-bold text-[#1B2235]">Create Account</h1>
            <p className="text-sm text-gray-500 mt-1">Join officeTaskTracker today</p>
          </div>

          {/* Global error */}
          {globalError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3 mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{globalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <InputField
              name="username" icon={User} label="Username" type="text" placeholder="e.g. Abhishikth"
            />
            <InputField
              name="email" icon={Mail} label="Email Address" type="email" placeholder="you@example.com"
            />
            <InputField
              name="password" icon={Lock} label="Password" type="password"
              placeholder="Min. 6 characters"
              showToggle show={showPass} onToggle={() => setShowPass(p => !p)}
            />
            <InputField
              name="confirm" icon={Lock} label="Confirm Password" type="password"
              placeholder="Re-enter password"
              showToggle show={showConf} onToggle={() => setShowConf(p => !p)}
            />

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => {
                    setAgreed(e.target.checked);
                    setFieldErrors(prev => ({ ...prev, terms: '' }));
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#1B2235]"
                />
                <span className="text-xs text-gray-500">
                  I agree to the{' '}
                  <button type="button" className="text-[#1B2235] underline">Terms</button>
                  {' '}&{' '}
                  <button type="button" className="text-[#1B2235] underline">Privacy Policy</button>
                </span>
              </label>
              {fieldErrors.terms && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} /> {fieldErrors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
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
                  Creating account…
                </>
              ) : 'Create Account'}
            </button>

            {/* OR */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-3 border border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-sm text-gray-500 hover:bg-gray-50 transition"
            >
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-500">G</span>
              </div>
              Sign up with Google
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-[#1B2235] font-semibold underline"
              >
                Log In
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
