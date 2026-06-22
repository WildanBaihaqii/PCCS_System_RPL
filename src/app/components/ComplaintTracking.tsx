import { useNavigate } from 'react-router';
import { CheckCircle, Clock, Package, FileCheck, AlertCircle, MessageSquare, HourglassIcon, Download } from 'lucide-react';
import Layout from './Layout';
import { loadComplaints, findComplaint } from '../utils/storage';
import { exportComplaintToPDF } from '../utils/export';
import { showSuccess } from './ToastNotification';

interface User { role: 'student' | 'admin'; name: string; id: string; }
interface Props { user: User; onLogout: () => void; }

type StepStatus = 'completed' | 'current' | 'pending';

const COMPLAINTS = [
  {
    id: 'C001', title: 'Kerusakan AC di Ruang Lab Komputer',
    category: 'Fasilitas', status: 'Diproses', date: '15 Mei 2026', priority: 'Tinggi',
    timeline: [
      { label: 'Laporan Diterima',       date: '15 Mei 2026 · 10:30', desc: 'Laporan diterima oleh sistem PCCS',                    status: 'completed' as StepStatus, icon: FileCheck    },
      { label: 'Verifikasi Admin',        date: '15 Mei 2026 · 14:20', desc: 'Diverifikasi oleh Admin Kampus – Andi Prasetyo',        status: 'current'   as StepStatus, icon: Clock        },
      { label: 'Penugasan Unit Terkait', date: '',                    desc: 'Laporan diteruskan ke unit terkait',                    status: 'pending'   as StepStatus, icon: Package      },
      { label: 'Proses Penyelesaian',    date: '',                    desc: 'Unit terkait melakukan penanganan masalah',              status: 'pending'   as StepStatus, icon: AlertCircle  },
      { label: 'Laporan Selesai',        date: '',                    desc: 'Masalah diselesaikan dan laporan ditutup',              status: 'pending'   as StepStatus, icon: CheckCircle  },
    ],
  },
  {
    id: 'C002', title: 'Jadwal Kuliah Bentrok',
    category: 'Akademik', status: 'Selesai', date: '10 Mei 2026', priority: 'Sedang',
    timeline: [
      { label: 'Laporan Diterima',       date: '10 Mei 2026 · 08:00', desc: 'Laporan diterima sistem',                              status: 'completed' as StepStatus, icon: FileCheck    },
      { label: 'Verifikasi Admin',        date: '10 Mei 2026 · 09:15', desc: 'Diverifikasi dan diterima',                            status: 'completed' as StepStatus, icon: Clock        },
      { label: 'Penugasan Unit Terkait', date: '10 Mei 2026 · 10:00', desc: 'Diteruskan ke bagian akademik',                        status: 'completed' as StepStatus, icon: Package      },
      { label: 'Proses Penyelesaian',    date: '11 Mei 2026 · 14:00', desc: 'Jadwal disesuaikan oleh bagian akademik',              status: 'completed' as StepStatus, icon: AlertCircle  },
      { label: 'Laporan Selesai',        date: '12 Mei 2026 · 09:00', desc: 'Masalah berhasil diselesaikan',                        status: 'completed' as StepStatus, icon: CheckCircle  },
    ],
  },
];

const STATUS_CLS: Record<string, string> = {
  'Menunggu': 'text-amber-700 bg-amber-50 border-amber-200',
  'Diproses':  'text-blue-700 bg-blue-50 border-blue-200',
  'Selesai':   'text-green-700 bg-green-50 border-green-200',
  'Ditolak':   'text-red-700 bg-red-50 border-red-200',
};

const PRIORITY_CLS: Record<string, string> = {
  'Tinggi': 'text-red-600 bg-red-50',
  'Sedang': 'text-orange-600 bg-orange-50',
  'Rendah': 'text-slate-500 bg-slate-100',
};

export default function ComplaintTracking({ user, onLogout }: Props) {
  const navigate = useNavigate();

  const list = loadComplaints();

  return (
    <Layout user={user} onLogout={onLogout} title="Tracking Laporan" subtitle="Pantau status pengaduan Anda">
      <div className="max-w-3xl mx-auto space-y-5">
        {list.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">Belum ada laporan.</p>
          </div>
        )}

        {list.map(c => {
          const pct = c.status === 'Selesai' ? 100 : c.status === 'Diproses' ? 50 : 10;
          return (
            <div key={c.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-border/60">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md">#{c.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_CLS[c.status]}`}>
                        {c.status}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${PRIORITY_CLS[c.priority]}`}>
                        {c.priority}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{c.category} · {c.date}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => navigate(`/chat/${c.id}`)}
                      className="flex items-center gap-1.5 px-4 py-2 text-primary-foreground text-xs font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all"
                      style={{ background: 'var(--pccs-primary-gradient)' }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Chat
                    </button>
                    <button
                      onClick={() => {
                        exportComplaintToPDF(c);
                        showSuccess('Laporan siap untuk diprint/simpan sebagai PDF');
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl hover:bg-emerald-100 active:scale-95 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Progress penanganan</span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: c.status === 'Selesai' ? '#22c55e' : 'var(--pccs-primary-gradient)' }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Deskripsi</h4>
                <p className="text-sm text-foreground mb-4">{c.description}</p>
                <div className="text-xs text-muted-foreground">Pelapor: {c.reporter} · ID: {c.reporterId}</div>
              </div>
            </div>
          );
        })}

        <div className="bg-accent border border-primary/15 rounded-2xl p-5 flex items-start gap-3">
          <HourglassIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Estimasi Penyelesaian</h4>
            <p className="text-sm text-muted-foreground">
              Laporan aktif sedang diproses. Estimasi 2–3 hari kerja.
              Gunakan fitur <strong className="text-foreground">chat</strong> untuk berkomunikasi langsung dengan admin.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
