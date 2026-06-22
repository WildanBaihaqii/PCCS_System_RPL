import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  MessageSquare, BarChart3, FileText, Clock, CheckCircle, HourglassIcon,
  TrendingUp, TrendingDown, Search, Eye, Users, AlertTriangle, ChevronDown
} from 'lucide-react';
import Layout from './Layout';
import { loadComplaints, updateComplaintStatus } from '../utils/storage';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface User { role: 'student' | 'admin'; name: string; id: string; }
interface Props { user: User; onLogout: () => void; }

const INIT_COMPLAINTS = [
  { id: 'C001', title: 'Kerusakan AC di Ruang Lab Komputer', category: 'Fasilitas',         status: 'Diproses', date: '15 Mei 2026', reporter: 'Afdila Dwiyani',  nim: '250215001', priority: 'Tinggi' },
  { id: 'C002', title: 'Jadwal Kuliah Bentrok',              category: 'Akademik',           status: 'Selesai',  date: '10 Mei 2026', reporter: 'Nadya Shafa',     nim: '250115026', priority: 'Sedang' },
  { id: 'C003', title: 'Kebersihan Toilet Kurang Terjaga',   category: 'Lingkungan Kampus',  status: 'Menunggu', date: '18 Mei 2026', reporter: 'Sunu Setyo Jati', nim: '250215030', priority: 'Rendah' },
  { id: 'C004', title: 'Proyektor Rusak di Kelas B201',      category: 'Fasilitas',         status: 'Menunggu', date: '17 Mei 2026', reporter: 'Tatag Wildan',    nim: '250215031', priority: 'Tinggi' },
  { id: 'C005', title: 'Parkir Motor Penuh',                 category: 'Lingkungan Kampus',  status: 'Diproses', date: '16 Mei 2026', reporter: 'Ahmad Fauzi',     nim: '250115001', priority: 'Sedang' },
];

const CHART_DATA = [
  { name: 'Jan', value: 12 }, { name: 'Feb', value: 19 }, { name: 'Mar', value: 8 },
  { name: 'Apr', value: 25 }, { name: 'Mei', value: 31 }, { name: 'Jun', value: 18 },
];

const CHART_COLORS = ['#dbeafe','#dbeafe','#dbeafe','#dbeafe','#1d4ed8','#dbeafe'];

const STATUS_CLS: Record<string, string> = {
  'Menunggu': 'text-amber-700 bg-amber-50 border-amber-200',
  'Diproses':  'text-blue-700 bg-blue-50 border-blue-200',
  'Selesai':   'text-green-700 bg-green-50 border-green-200',
  'Ditolak':   'text-red-700 bg-red-50 border-red-200',
};

const PRIORITY_CLS: Record<string, string> = {
  'Tinggi': 'text-red-600 bg-red-50 border-red-200',
  'Sedang': 'text-orange-600 bg-orange-50 border-orange-200',
  'Rendah': 'text-slate-500 bg-slate-100 border-slate-200',
};

const CATEGORY_CLS: Record<string, string> = {
  'Fasilitas': 'text-violet-700 bg-violet-50',
  'Akademik':  'text-blue-700 bg-blue-50',
  'Lingkungan Kampus': 'text-emerald-700 bg-emerald-50',
};

export default function AdminDashboard({ user, onLogout }: Props) {
  const navigate = useNavigate();
  const [list, setList] = useState(() => {
    const stored = loadComplaints();
    return stored.length ? stored : INIT_COMPLAINTS;
  });
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const update = (id: string, status: string) => {
    const next = updateComplaintStatus(id, status);
    setList(next);
  };

  const stats = {
    total:    list.length,
    menunggu: list.filter(c => c.status === 'Menunggu').length,
    diproses: list.filter(c => c.status === 'Diproses').length,
    selesai:  list.filter(c => c.status === 'Selesai').length,
  };

  const filtered = list.filter(c => {
    const q = search.toLowerCase();
    return (!q || c.title.toLowerCase().includes(q) || c.reporter.toLowerCase().includes(q))
      && (!filterStatus || c.status === filterStatus);
  });

  return (
    <Layout user={user} onLogout={onLogout} title="Dashboard Admin" subtitle="Manajemen laporan pengaduan">
      {/* KPI stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Laporan', value: stats.total,    icon: FileText,      trend: '+12%', up: true,  border: 'border-slate-200', iconCls: 'text-slate-400 bg-slate-100', text: 'text-slate-700' },
          { label: 'Menunggu',      value: stats.menunggu, icon: HourglassIcon, trend: '+3',   up: false, border: 'border-amber-200', iconCls: 'text-amber-500 bg-amber-50',   text: 'text-amber-700' },
          { label: 'Diproses',      value: stats.diproses, icon: Clock,         trend: '-1',   up: true,  border: 'border-blue-200',  iconCls: 'text-blue-500 bg-blue-50',     text: 'text-blue-700'  },
          { label: 'Selesai',       value: stats.selesai,  icon: CheckCircle,   trend: '+8',   up: true,  border: 'border-green-200', iconCls: 'text-green-500 bg-green-50',   text: 'text-green-700' },
        ].map(({ label, value, icon: Icon, trend, up, border, iconCls, text }) => {
          const TrendIcon = up ? TrendingUp : TrendingDown;
          return (
            <div key={label} className={`bg-card border ${border} rounded-2xl p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconCls}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>
                  <TrendIcon className="w-3 h-3" />{trend}
                </span>
              </div>
              <p className={`text-2xl font-bold ${text}`}>{value}</p>
              <p className={`text-xs mt-0.5 ${text} opacity-70`}>{label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Bar chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-foreground text-sm">Laporan per Bulan</h3>
              <p className="text-xs text-muted-foreground">Januari – Juni 2026</p>
            </div>
            <button
              onClick={() => navigate('/statistics')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground rounded-lg text-xs font-semibold hover:opacity-80 transition-opacity"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Detail
            </button>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={CHART_DATA} barSize={28}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'inherit' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'inherit' }} />
              <Tooltip
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit', fontSize: '12px' }}
              />
              <Bar dataKey="value" name="Laporan" radius={[6, 6, 0, 0]}>
                {CHART_DATA.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground text-sm mb-4">Kategori Laporan</h3>
          <div className="space-y-4">
            {[
              { label: 'Fasilitas',         pct: 40, color: '#7c3aed' },
              { label: 'Akademik',          pct: 20, color: '#1d4ed8' },
              { label: 'Lingkungan Kampus', pct: 40, color: '#059669' },
            ].map(cat => (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <span className="text-foreground font-medium">{cat.label}</span>
                  <span className="text-muted-foreground font-semibold">{cat.pct}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${cat.pct}%`, background: cat.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />Total Pelapor
            </span>
            <span className="font-bold text-foreground">5</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm">Manajemen Laporan</h3>
            <p className="text-xs text-muted-foreground">{filtered.length} dari {list.length} laporan</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari..."
                className="pl-8 pr-3 py-2 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-muted/50 w-40"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 border border-border rounded-xl text-xs bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
              >
                <option value="">Semua Status</option>
                {['Menunggu','Diproses','Selesai','Ditolak'].map(s =>
                  <option key={s} value={s}>{s}</option>
                )}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                {['ID', 'Laporan', 'Pelapor', 'Tanggal', 'Prioritas', 'Status', 'Aksi'].map(h => (
                  <th key={h} className={`px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide ${h === 'Aksi' ? 'text-center' : 'text-left'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{c.id}</span>
                  </td>
                  <td className="px-5 py-4 max-w-xs">
                    <p className="text-sm font-semibold text-foreground truncate">{c.title}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-xs font-medium ${CATEGORY_CLS[c.category] ?? 'bg-muted text-muted-foreground'}`}>
                      {c.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-foreground">{c.reporter}</p>
                    <p className="text-xs text-muted-foreground font-mono">{c.nim}</p>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-xs text-muted-foreground">{c.date}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${PRIORITY_CLS[c.priority]}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="relative inline-block">
                      <select
                        value={c.status}
                        onChange={e => update(c.id, e.target.value)}
                        className={`appearance-none pl-2.5 pr-6 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer focus:outline-none ${STATUS_CLS[c.status]}`}
                      >
                        {['Menunggu','Diproses','Selesai','Ditolak'].map(s =>
                          <option key={s} value={s}>{s}</option>
                        )}
                      </select>
                      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => navigate(`/chat/${c.id}`)}
                        className="p-1.5 text-primary hover:bg-accent rounded-lg transition-colors"
                        title="Chat"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate('/complaint/tracking')}
                        className="p-1.5 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                        title="Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-14 text-center">
              <AlertTriangle className="w-9 h-9 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Tidak ada laporan ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
