import { Download, TrendingUp, TrendingDown, CheckCircle, Clock, HourglassIcon, FileText } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';
import Layout from './Layout';

interface User { role: 'student' | 'admin'; name: string; id: string; }
interface Props { user: User; onLogout: () => void; }

const MONTHLY = [
  { month: 'Jan', total: 12, selesai: 9  },
  { month: 'Feb', total: 19, selesai: 14 },
  { month: 'Mar', total: 15, selesai: 13 },
  { month: 'Apr', total: 22, selesai: 18 },
  { month: 'Mei', total: 28, selesai: 20 },
  { month: 'Jun', total: 18, selesai: 12 },
];

const CATEGORY = [
  { name: 'Fasilitas',   count: 45 },
  { name: 'Akademik',    count: 30 },
  { name: 'Lingkungan',  count: 25 },
];

const STATUS_DATA = [
  { name: 'Menunggu', value: 20 },
  { name: 'Diproses',  value: 35 },
  { name: 'Selesai',   value: 40 },
  { name: 'Ditolak',   value: 5  },
];

const PIE_COLORS  = ['#f59e0b', '#3b82f6', '#22c55e', '#ef4444'];
const BAR_COLORS  = ['#7c3aed', '#3b82f6', '#059669'];

const TOP_ISSUES = [
  { issue: 'Kerusakan AC',       count: 15, trend: '+3', up: true  },
  { issue: 'Proyektor Rusak',    count: 12, trend: '+5', up: true  },
  { issue: 'Kebersihan Toilet',  count: 10, trend: '-2', up: false },
  { issue: 'Jadwal Bentrok',     count: 8,  trend: '+1', up: true  },
  { issue: 'Parkir Penuh',       count: 7,  trend: '0',  up: null  },
];

const RANK_COLORS = ['#f59e0b', '#94a3b8', '#92400e'];

const TOOLTIP_STYLE = {
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  fontFamily: 'inherit',
  fontSize: '12px',
};

export default function Statistics({ user, onLogout }: Props) {
  return (
    <Layout user={user} onLogout={onLogout} title="Statistik & Analitik" subtitle="Data laporan pengaduan PCCS 2026">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Laporan 2026', value: '100',  sub: '+15% dari bulan lalu',     icon: FileText,      up: true,  border: 'border-slate-200', iconCls: 'text-slate-400 bg-slate-100', text: 'text-slate-700' },
          { label: 'Tingkat Penyelesaian', value: '80%', sub: '40 dari 50 laporan selesai', icon: CheckCircle, up: true,  border: 'border-green-200', iconCls: 'text-green-500 bg-green-50', text: 'text-green-700' },
          { label: 'Rata-rata Waktu',    value: '3.5',  sub: 'hari penyelesaian',           icon: Clock,      up: true,  border: 'border-blue-200',  iconCls: 'text-blue-500 bg-blue-50', text: 'text-blue-700' },
          { label: 'Bulan Ini',          value: '28',   sub: '+27% bulan sebelumnya',       icon: HourglassIcon, up: true, border: 'border-amber-200', iconCls: 'text-amber-500 bg-amber-50', text: 'text-amber-700' },
        ].map(({ label, value, sub, icon: Icon, up, border, iconCls, text }) => {
          const TrendIcon = up ? TrendingUp : TrendingDown;
          return (
            <div key={label} className={`bg-card border ${border} rounded-2xl p-5`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconCls}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <TrendIcon className={`w-4 h-4 ${up ? 'text-green-500' : 'text-red-500'}`} />
              </div>
              <p className={`text-2xl font-bold ${text}`}>{value}</p>
              <p className={`text-xs font-semibold mt-0.5 ${text} opacity-80`}>{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Line chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground text-sm">Tren Laporan Bulanan</h3>
          <p className="text-xs text-muted-foreground mb-5">Total laporan dan laporan selesai per bulan</p>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'inherit' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'inherit' }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontFamily: 'inherit' }} />
              <Line type="monotone" dataKey="total"   stroke="#2563eb" strokeWidth={2.5} name="Total"  dot={{ fill: '#2563eb', r: 4 }} />
              <Line type="monotone" dataKey="selesai" stroke="#22c55e" strokeWidth={2.5} name="Selesai" dot={{ fill: '#22c55e', r: 4 }} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground text-sm">Distribusi Status</h3>
          <p className="text-xs text-muted-foreground mb-4">Proporsi status laporan</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={STATUS_DATA} cx="50%" cy="50%" innerRadius={48} outerRadius={72}
                dataKey="value" paddingAngle={3}>
                {STATUS_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {STATUS_DATA.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-bold text-foreground">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Bar category */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground text-sm">Laporan per Kategori</h3>
          <p className="text-xs text-muted-foreground mb-5">Distribusi berdasarkan kategori pengaduan</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CATEGORY} barSize={40}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'inherit' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'inherit' }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" name="Jumlah" radius={[8, 8, 0, 0]}>
                {CATEGORY.map((_, i) => <Cell key={i} fill={BAR_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top issues */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold text-foreground text-sm">Top 5 Masalah Terbanyak</h3>
          <p className="text-xs text-muted-foreground mb-5">Berdasarkan jumlah laporan yang masuk</p>
          <div className="space-y-3.5">
            {TOP_ISSUES.map((item, i) => (
              <div key={item.issue} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: i < 3 ? RANK_COLORS[i] : 'var(--pccs-primary-gradient)' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground truncate">{item.issue}</span>
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      <span className={`text-xs font-semibold ${item.up === true ? 'text-green-600' : item.up === false ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {item.trend}
                      </span>
                      <span className="text-sm font-bold text-foreground w-6 text-right">{item.count}</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{
                      width: `${(item.count / 15) * 100}%`,
                      background: 'var(--pccs-primary-gradient)',
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export CTA */}
      <div
        className="rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4"
        style={{ background: 'var(--pccs-primary-gradient)' }}
      >
        <div>
          <h3 className="font-bold text-white text-sm mb-0.5">Export Laporan</h3>
          <p className="text-sm text-blue-200">Download data statistik untuk dokumentasi dan evaluasi kinerja</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-colors text-sm backdrop-blur-sm">
            <Download className="w-4 h-4" />PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
            <Download className="w-4 h-4" />Excel
          </button>
        </div>
      </div>
    </Layout>
  );
}
