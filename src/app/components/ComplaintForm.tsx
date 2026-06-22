import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Send, Paperclip, CheckCircle, BookOpen, Wrench, Leaf, User, Hash, ArrowLeft, ArrowRight } from 'lucide-react';
import Layout from './Layout';
import { addComplaint } from '../utils/storage';
import { showSuccess, showError } from './ToastNotification';

interface User { role: 'student' | 'admin'; name: string; id: string; }
interface Props { user: User; onLogout: () => void; }

const CATEGORIES = [
  { id: 'Akademik',          label: 'Akademik',          desc: 'Perkuliahan, jadwal, nilai', icon: BookOpen, cls: 'text-blue-600',   activeBg: 'bg-blue-50',   activeBorder: 'border-blue-500'   },
  { id: 'Fasilitas',         label: 'Fasilitas',         desc: 'Sarana prasarana kampus',   icon: Wrench,   cls: 'text-violet-600', activeBg: 'bg-violet-50', activeBorder: 'border-violet-500' },
  { id: 'Lingkungan Kampus', label: 'Lingkungan',        desc: 'Kebersihan, parkir, keamanan', icon: Leaf,  cls: 'text-emerald-600', activeBg: 'bg-emerald-50', activeBorder: 'border-emerald-500' },
];

const PRIORITIES = [
  { id: 'Rendah', cls: 'border-slate-300 text-slate-600', activeCls: 'border-slate-400 bg-slate-100 text-slate-700' },
  { id: 'Sedang', cls: 'border-slate-300 text-slate-600', activeCls: 'border-orange-400 bg-orange-50 text-orange-700' },
  { id: 'Tinggi', cls: 'border-slate-300 text-slate-600', activeCls: 'border-red-400 bg-red-50 text-red-700' },
];

export default function ComplaintForm({ user, onLogout }: Props) {
  const navigate = useNavigate();
  const [title, setTitle]           = useState('');
  const [category, setCategory]     = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority]     = useState('Sedang');
  const [step, setStep]             = useState(1);
  const [done, setDone]             = useState(false);

  const validateForm = (): boolean => {
    if (!title.trim()) {
      showError('Judul laporan tidak boleh kosong');
      return false;
    }
    if (title.length < 10) {
      showError('Judul laporan minimal 10 karakter');
      return false;
    }
    if (!category) {
      showError('Kategori laporan harus dipilih');
      return false;
    }
    if (!description.trim()) {
      showError('Deskripsi laporan tidak boleh kosong');
      return false;
    }
    if (description.length < 20) {
      showError('Deskripsi laporan minimal 20 karakter');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    addComplaint({
      title,
      category,
      description,
      priority,
      reporter: user.name,
      reporterId: user.id,
    });
    showSuccess('Laporan Anda berhasil dikirim! Admin akan segera meninjau.');
    setDone(true);
    setTimeout(() => navigate('/dashboard'), 1200);
  };

  if (done) return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-card rounded-2xl shadow-lg border border-border p-8 text-center">
        <div className="w-20 h-20 bg-green-50 border-2 border-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-11 h-11 text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Laporan Terkirim!</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Laporan Anda berhasil dikirim. Admin akan segera meninjau dan menindaklanjuti pengaduan Anda.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Mengalihkan ke dashboard...
        </div>
      </div>
    </div>
  );

  return (
    <Layout user={user} onLogout={onLogout} title="Buat Laporan Baru" subtitle="Form pengaduan mahasiswa/dosen">
      <div className="max-w-2xl mx-auto">
        {/* Step bar */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { n: 1, label: 'Informasi Dasar' },
            { n: 2, label: 'Detail Laporan'  },
            { n: 3, label: 'Konfirmasi'       },
          ].map(({ n, label }, i) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step > n  ? 'bg-green-500 text-white'
                : step === n ? 'text-white'
                : 'bg-muted text-muted-foreground'
              }`} style={step === n ? { background: 'var(--pccs-primary-gradient)' } : {}}>
                {step > n ? <CheckCircle className="w-4 h-4" /> : n}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${step === n ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {i < 2 && <div className={`w-8 h-0.5 mx-1 ${step > n ? 'bg-green-400' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Reporter */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                  <User className="w-4 h-4 text-primary" />Informasi Pelapor
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: 'Nama Lengkap', v: user.name },
                    { l: 'NIM / NIP',    v: user.id   },
                  ].map(({ l, v }) => (
                    <div key={l} className="p-3.5 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-0.5">{l}</p>
                      <p className="font-semibold text-foreground text-sm">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Hash className="w-4 h-4 text-primary" />Judul Pengaduan
                </h3>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Kerusakan AC di Ruang Lab A301"
                  className="w-full px-4 py-2.5 border border-border rounded-xl bg-muted/50 focus:bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>

              {/* Category */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Kategori Pengaduan</h3>
                <div className="grid grid-cols-3 gap-3">
                  {CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    const active = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          active
                            ? `${cat.activeBg} ${cat.activeBorder}`
                            : 'border-border bg-muted/30 hover:border-border/80'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${active ? cat.activeBg : 'bg-muted'}`}>
                          <Icon className={`w-4 h-4 ${active ? cat.cls : 'text-muted-foreground'}`} />
                        </div>
                        <p className={`font-semibold text-xs ${active ? cat.cls : 'text-foreground'}`}>{cat.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{cat.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!title || !category}
                  className="flex items-center gap-2 px-5 py-2.5 text-primary-foreground font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
                  style={{ background: 'var(--pccs-primary-gradient)' }}
                >
                  Lanjut <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">
                    Deskripsi Detail <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value.slice(0, 500))}
                    rows={6}
                    placeholder="Jelaskan secara detail: waktu, lokasi, dampak yang dirasakan, dan informasi relevan lainnya."
                    className="w-full px-4 py-3 border border-border rounded-xl bg-muted/50 focus:bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-sm"
                  />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Jelaskan sejelas mungkin agar segera ditindaklanjuti</span>
                    <span className={description.length > 400 ? 'text-amber-600' : ''}>{description.length}/500</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Tingkat Prioritas</label>
                  <div className="flex gap-2">
                    {PRIORITIES.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPriority(p.id)}
                        className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                          priority === p.id ? p.activeCls : p.cls + ' hover:border-slate-400'
                        }`}
                      >
                        {p.id}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Lampiran <span className="text-muted-foreground font-normal">(opsional)</span>
                  </label>
                  <label className="flex flex-col items-center gap-2 border-2 border-dashed border-border rounded-xl p-5 cursor-pointer hover:border-primary/40 hover:bg-accent/30 transition-all">
                    <Paperclip className="w-5 h-5 text-muted-foreground/50" />
                    <span className="text-xs font-medium text-muted-foreground">Klik untuk upload file</span>
                    <span className="text-xs text-muted-foreground/60">JPG, PNG, PDF · Maks. 5MB</span>
                    <input type="file" className="hidden" accept="image/*,.pdf" />
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-semibold rounded-xl hover:bg-muted/50 transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!description}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-primary-foreground font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
                  style={{ background: 'var(--pccs-primary-gradient)' }}
                >
                  Review Laporan <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-6 py-4 bg-muted/30 border-b border-border">
                  <h3 className="font-semibold text-foreground text-sm">Ringkasan Laporan</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Periksa kembali sebelum mengirimkan</p>
                </div>
                <div className="divide-y divide-border/50">
                  {[
                    { label: 'Pelapor',   value: `${user.name} (${user.id})` },
                    { label: 'Judul',     value: title       },
                    { label: 'Kategori',  value: category    },
                    { label: 'Prioritas', value: priority    },
                    { label: 'Deskripsi', value: description },
                  ].map(({ label, value }) => (
                    <div key={label} className="px-6 py-3.5 flex gap-4">
                      <span className="text-xs text-muted-foreground w-20 flex-shrink-0 pt-0.5">{label}</span>
                      <span className="text-sm text-foreground font-medium flex-1">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground font-semibold rounded-xl hover:bg-muted/50 transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Edit
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-primary-foreground font-bold rounded-xl transition-all hover:opacity-90 active:scale-[0.99] text-sm"
                  style={{ background: 'var(--pccs-primary-gradient)' }}
                >
                  <Send className="w-4 h-4" />
                  Kirim Laporan
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}
