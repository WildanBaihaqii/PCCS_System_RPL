import { useState } from 'react';
import { GraduationCap, Lock, User, AlertCircle, Shield, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userData: { role: 'student' | 'admin'; name: string; id: string }) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Username dan password harus diisi');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    onLogin({
      role,
      name: username,
      id: role === 'student' ? '250215001' : 'ADM001',
    });
  };

  const features = [
    'Laporan real-time dengan tracking status',
    'Komunikasi langsung via chat room',
    'Dashboard analitik & statistik lengkap',
    'Notifikasi progres pengaduan otomatis',
  ];

  return (
    <div className="min-h-screen flex">
      {/* ─── Brand panel ─── */}
      <div
        className="hidden lg:flex lg:w-[52%] xl:w-[55%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'var(--pccs-hero-gradient)' }}
      >
        {/* decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #93c5fd, transparent)' }} />
        <div className="absolute top-1/2 right-8 w-56 h-56 rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)' }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xl tracking-tight leading-none">PCCS</p>
            <p className="text-blue-300 text-xs mt-0.5">Polytechnic Cilacap Complaint System</p>
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-7">
          <div>
            <h1 className="text-white text-4xl xl:text-5xl font-extrabold leading-[1.15] tracking-tight">
              Sistem Pengaduan<br />
              <span className="text-blue-300">Digital</span> Politeknik<br />
              Negeri Cilacap
            </h1>
            <p className="text-blue-200/80 mt-5 text-base leading-relaxed max-w-sm">
              Platform modern untuk menyampaikan, mengelola, dan menindaklanjuti laporan pengaduan mahasiswa &amp; dosen secara efisien dan transparan.
            </p>
          </div>

          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle className="w-4.5 h-4.5 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100 text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-blue-400/60 text-xs">
          © 2026 Politeknik Negeri Cilacap. All rights reserved.
        </p>
      </div>

      {/* ─── Form panel ─── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
              style={{ background: 'var(--pccs-primary-gradient)' }}
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">PCCS</h1>
            <p className="text-muted-foreground text-sm">Polytechnic Cilacap Complaint System</p>
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="px-7 pt-7 pb-5">
              <h2 className="text-xl font-bold text-foreground">Selamat Datang</h2>
              <p className="text-muted-foreground text-sm mt-1">Masuk ke akun PCCS Anda</p>
            </div>

            {/* Role tabs */}
            <div className="px-7 mb-5">
              <div className="flex p-1 bg-muted rounded-xl">
                {([
                  { id: 'student', label: 'Mahasiswa/Dosen', icon: GraduationCap },
                  { id: 'admin', label: 'Administrator', icon: Shield },
                ] as const).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setRole(id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      role === id
                        ? 'bg-card text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-7 pb-7">
              {error && (
                <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    {role === 'student' ? 'NIM / NIP' : 'Username Admin'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-muted/50 focus:bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      placeholder={role === 'student' ? 'Masukkan NIM atau NIP' : 'Masukkan username'}
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 border border-border rounded-xl bg-muted/50 focus:bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-border accent-primary" />
                    <span className="text-sm text-muted-foreground">Ingat saya</span>
                  </label>
                  <button type="button" className="text-sm text-primary hover:underline font-medium">
                    Lupa password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
                  style={{ background: loading ? 'var(--pccs-blue-light)' : 'var(--pccs-primary-gradient)' }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Masuk...
                    </>
                  ) : (
                    <>
                      Masuk ke PCCS
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 p-3 bg-accent rounded-xl">
                <p className="text-xs text-accent-foreground text-center">
                  <span className="font-semibold">Demo Mode:</span> Gunakan username &amp; password apa saja
                </p>
              </div>

              <div className="mt-4 text-center">
                <a href="/wireframes" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Lihat Wireframes &amp; Activity Diagrams →
                </a>
              </div>
            </div>
          </div>

          {/* Politeknik badge */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground/70">
              Didukung oleh Politeknik Negeri Cilacap
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
