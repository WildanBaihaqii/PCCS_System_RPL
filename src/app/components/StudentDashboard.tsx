import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Plus, MessageSquare, Clock, CheckCircle, XCircle, HourglassIcon,
  FileText, TrendingUp, AlertTriangle, ChevronRight, Calendar, Tag, Search
} from 'lucide-react';
import Layout from './Layout';

interface UserData { role: 'student' | 'admin'; name: string; id: string; }
interface Props { user: UserData; onLogout: () => void; }

const COMPLAINTS = [
  {
    id: 'C001', title: 'Kerusakan AC di Ruang Lab Komputer', category: 'Fasilitas', status: 'Diproses',
    date: '15 Mei 2026', priority: 'Tinggi',
    description: 'AC di ruang lab A301 tidak berfungsi dengan baik, suhu ruangan sangat panas sehingga mengganggu kegiatan praktikum.',
  },
  {
    id: 'C002', title: 'Jadwal Kuliah Bentrok', category: 'Akademik', status: 'Selesai',
    date: '10 Mei 2026', priority: 'Sedang',
    description: 'Ada bentrok jadwal antara mata kuliah RPL dan Basis Data pada hari Selasa pukul 09.00–11.00.',
  },
  {
    id: 'C003', title: 'Kebersihan Toilet Kurang Terjaga', category: 'Lingkungan Kampus', status: 'Menunggu',
    date: '18 Mei 2026', priority: 'Rendah',
    description: 'Kebersihan toilet di gedung A lantai 2 perlu ditingkatkan, kondisi tidak layak untuk digunakan.',
  },
];

const STATUS = {
  'Menunggu': { cls: 'text-amber-700 bg-amber-50 border-amber-200', icon: HourglassIcon, dot: 'bg-amber-400' },
  'Diproses':  { cls: 'text-blue-700 bg-blue-50 border-blue-200',   icon: Clock,         dot: 'bg-blue-500'  },
  'Selesai':   { cls: 'text-green-700 bg-green-50 border-green-200', icon: CheckCircle,   dot: 'bg-green-500' },
  'Ditolak':   { cls: 'text-red-700 bg-red-50 border-red-200',       icon: XCircle,       dot: 'bg-red-500'   },
} as const;

const PRIORITY_CLS: Record<string, string> = {
  'Tinggi': 'text-red-600 bg-red-50',
  'Sedang': 'text-orange-600 bg-orange-50',
  'Rendah': 'text-slate-500 bg-slate-100',
};

const CATEGORY_CLS: Record<string, string> = {
  'Fasilitas': 'text-violet-700 bg-violet-50',
  'Akademik': 'text-blue-700 bg-blue-50',
  'Lingkungan Kampus': 'text-emerald-700 bg-emerald-50',
};

export default function StudentDashboard({ user, onLogout }: Props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const stats = {
    total:    COMPLAINTS.length,
    menunggu: COMPLAINTS.filter(c => c.status === 'Menunggu').length,
    diproses: COMPLAINTS.filter(c => c.status === 'Diproses').length,
    selesai:  COMPLAINTS.filter(c => c.status === 'Selesai').length,
  };

  const filtered = COMPLAINTS.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout user={user} onLogout={onLogout} title="Dashboard Mahasiswa" subtitle={`Halo, ${user.name}!`}>
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 mb-6 relative overflow-hidden"
        style={{ background: 'var(--pccs-primary-gradient)' }}
      >
        <div
          className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fff, transparent)' }}
        />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg">Selamat datang, {user.name}! 👋</h3>
            <p className="text-blue-200 text-sm mt-1">NIM/NIP: {user.id} · Semester Genap 2025/2026</p>
            <button
              onClick={() => navigate('/complaint/new')}
              className="mt-4 inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-blue-50 active:scale-[0.98] transition-all"
            >
              <Plus className="w-4 h-4" />
              Buat Laporan Baru
            </button>
          </div>
          <div className="hidden sm:flex w-20 h-20 rounded-2xl bg-white/10 items-center justify-center flex-shrink-0">
            <FileText className="w-10 h-10 text-white/40" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Laporan', value: stats.total,    icon: FileText,      border: 'border-slate-200',  iconCls: 'text-slate-400  bg-slate-100',  text: 'text-slate-700'  },
          { label: 'Menunggu',      value: stats.menunggu, icon: HourglassIcon, border: 'border-amber-200',  iconCls: 'text-amber-500  bg-amber-50',   text: 'text-amber-700'  },
          { label: 'Diproses',      value: stats.diproses, icon: Clock,         border: 'border-blue-200',   iconCls: 'text-blue-500   bg-blue-50',    text: 'text-blue-700'   },
          { label: 'Selesai',       value: stats.selesai,  icon: CheckCircle,   border: 'border-green-200',  iconCls: 'text-green-500  bg-green-50',   text: 'text-green-700'  },
        ].map(({ label, value, icon: Icon, border, iconCls, text }) => (
          <div key={label} className={`bg-card border ${border} rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconCls}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
            </div>
            <p className={`text-2xl font-bold ${text}`}>{value}</p>
            <p className={`text-xs mt-0.5 ${text} opacity-70`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Complaint list */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Riwayat Laporan Saya</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} laporan</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari laporan..."
              className="pl-9 pr-4 py-2 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-muted/50 w-48"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-7 h-7 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground font-medium text-sm">Tidak ada laporan ditemukan</p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {filtered.map((c) => {
              const s = STATUS[c.status as keyof typeof STATUS] ?? STATUS['Menunggu'];
              const StatusIcon = s.icon;
              return (
                <div
                  key={c.id}
                  className="px-6 py-5 hover:bg-muted/30 transition-colors cursor-pointer group"
                  onClick={() => navigate('/complaint/tracking')}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                          {c.title}
                        </h4>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${s.cls}`}>
                          <StatusIcon className="w-3 h-3" />
                          {c.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2.5 line-clamp-1">{c.description}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-medium ${CATEGORY_CLS[c.category] ?? 'bg-muted text-muted-foreground'}`}>
                          <Tag className="w-3 h-3" />{c.category}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />{c.date}
                        </span>
                        <span className="text-muted-foreground/60 font-mono">#{c.id}</span>
                        <span className={`px-2 py-0.5 rounded-md font-medium ${PRIORITY_CLS[c.priority]}`}>
                          {c.priority}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/chat/${c.id}`); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 active:scale-95 transition-all text-xs font-semibold"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat
                      </button>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Buat Laporan Baru', desc: 'Sampaikan pengaduan Anda',   icon: Plus,          path: '/complaint/new',     iconCls: 'text-primary bg-accent' },
          { label: 'Tracking Laporan',  desc: 'Pantau status pengaduan',    icon: TrendingUp,    path: '/complaint/tracking', iconCls: 'text-violet-600 bg-violet-50' },
          { label: 'Chat dengan Admin', desc: 'Diskusi lebih lanjut',       icon: MessageSquare, path: '/chat/C001',          iconCls: 'text-emerald-600 bg-emerald-50' },
        ].map(({ label, desc, icon: Icon, path, iconCls }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all text-left group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconCls}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
          </button>
        ))}
      </div>
    </Layout>
  );
}
