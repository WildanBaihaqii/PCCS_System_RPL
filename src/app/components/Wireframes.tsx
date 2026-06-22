import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

const wireframes = [
  {
    id: 'login',
    title: 'Activity Diagram: Login',
    description: 'Proses autentikasi user dengan role-based access',
    steps: [
      'User membuka aplikasi PCCS',
      'Sistem menampilkan halaman login',
      'User memilih role (Mahasiswa/Dosen atau Admin)',
      'User memasukkan kredensial (NIM/NIP/Username & Password)',
      'User submit form login',
      'Sistem validasi kredensial',
      'Jika valid: Redirect ke dashboard sesuai role',
      'Jika tidak valid: Tampilkan pesan error'
    ]
  },
  {
    id: 'create-complaint',
    title: 'Activity Diagram: Membuat Laporan Pengaduan',
    description: 'Proses pembuatan laporan pengaduan baru oleh mahasiswa/dosen',
    steps: [
      'User login sebagai Mahasiswa/Dosen',
      'User klik tombol "Buat Laporan" / FAB +',
      'Sistem tampilkan form pengaduan',
      'User isi judul pengaduan',
      'User pilih kategori (Akademik/Fasilitas/Lingkungan)',
      'User isi deskripsi detail',
      'User upload lampiran (opsional)',
      'User submit form',
      'Sistem validasi data',
      'Sistem simpan laporan dengan status "Menunggu"',
      'Sistem kirim notifikasi ke admin',
      'Sistem tampilkan pesan sukses',
      'Redirect ke dashboard'
    ]
  },
  {
    id: 'track-complaint',
    title: 'Activity Diagram: Memantau Status Laporan',
    description: 'Proses tracking progress penanganan laporan',
    steps: [
      'User pilih laporan yang ingin dipantau',
      'User klik "Detail" atau "Tracking"',
      'Sistem load data laporan dari database',
      'Sistem tampilkan timeline penanganan',
      'Sistem highlight status saat ini',
      'User melihat detail setiap tahap:',
      '  - Laporan Diterima (timestamp)',
      '  - Verifikasi Admin (admin name, timestamp)',
      '  - Penugasan Unit Terkait',
      '  - Proses Penyelesaian',
      '  - Laporan Selesai',
      'User bisa klik "Chat" untuk komunikasi'
    ]
  },
  {
    id: 'chat-room',
    title: 'Activity Diagram: Room Chat Real-time',
    description: 'Komunikasi langsung antara pelapor dan admin via WebSocket',
    steps: [
      'User klik tombol "Chat" pada laporan',
      'Sistem buka halaman chat room',
      'Sistem establish WebSocket connection',
      'Sistem load history chat dari database',
      'Sistem tampilkan pesan-pesan sebelumnya',
      'User mengetik pesan di input box',
      'User tekan Enter atau klik tombol Send',
      'Sistem kirim pesan via WebSocket',
      'Sistem simpan pesan ke database',
      'Sistem broadcast pesan ke semua participant',
      'Pesan tampil real-time tanpa refresh',
      'Sistem tampilkan timestamp & sender info'
    ]
  },
  {
    id: 'dashboard-stats',
    title: 'Activity Diagram: Dashboard & Statistik',
    description: 'Visualisasi data untuk evaluasi dan pengambilan keputusan',
    steps: [
      'Admin login ke sistem',
      'Admin klik menu "Statistik"',
      'Sistem query data laporan dari database',
      'Sistem hitung agregasi:',
      '  - Total laporan per bulan',
      '  - Breakdown per kategori',
      '  - Breakdown per status',
      '  - Top 5 masalah paling sering',
      '  - Tingkat penyelesaian',
      '  - Rata-rata waktu penyelesaian',
      'Sistem render chart & grafik',
      'Admin analisis data visual',
      'Admin bisa export ke PDF/Excel (opsional)'
    ]
  },
  {
    id: 'admin-manage',
    title: 'Activity Diagram: Mendistribusikan Laporan (Admin)',
    description: 'Proses verifikasi dan distribusi laporan oleh admin',
    steps: [
      'Admin login ke sistem',
      'Sistem tampilkan dashboard admin',
      'Sistem tampilkan list semua laporan',
      'Admin pilih laporan dengan status "Menunggu"',
      'Admin baca detail laporan',
      'Admin verifikasi kelengkapan data',
      'Admin update status menjadi "Diproses"',
      'Admin assign ke unit terkait (opsional)',
      'Sistem simpan perubahan status',
      'Sistem kirim notifikasi ke pelapor',
      'Sistem update timeline tracking',
      'Admin bisa chat dengan pelapor untuk klarifikasi'
    ]
  },
  {
    id: 'logout',
    title: 'Activity Diagram: Logout',
    description: 'Proses keluar dari sistem',
    steps: [
      'User klik menu profile/avatar',
      'User klik opsi "Keluar" / "Logout"',
      'Sistem hapus session data',
      'Sistem hapus token autentikasi',
      'Sistem clear localStorage',
      'Sistem redirect ke halaman login',
      'Sistem tampilkan pesan "Berhasil logout"'
    ]
  }
];

export default function Wireframes() {
  const navigate = useNavigate();
  const [selectedWireframe, setSelectedWireframe] = useState(wireframes[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">PCCS Wireframes</h1>
                <p className="text-sm text-slate-500">Activity Diagrams & User Flows</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-24">
              <h2 className="font-semibold text-slate-900 mb-4">Activity Diagrams</h2>
              <div className="space-y-2">
                {wireframes.map((wf) => (
                  <button
                    key={wf.id}
                    onClick={() => setSelectedWireframe(wf)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedWireframe.id === wf.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                    }`}
                  >
                    <div className="font-medium text-sm">{wf.title.replace('Activity Diagram: ', '')}</div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">{wf.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {selectedWireframe.title}
                </h2>
                <p className="text-slate-600">{selectedWireframe.description}</p>
              </div>

              {/* Flow Steps */}
              <div className="space-y-4">
                {selectedWireframe.steps.map((step, index) => {
                  const isSubStep = step.startsWith('  ');
                  const stepText = step.trim();

                  return (
                    <div key={index} className="flex items-start gap-4">
                      {!isSubStep ? (
                        <>
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                            {index + 1 - selectedWireframe.steps.slice(0, index).filter(s => s.startsWith('  ')).length}
                          </div>
                          <div className="flex-1">
                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                              <p className="text-slate-700 font-medium">{stepText}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                          <div className="flex-1">
                            <div className="bg-white rounded-lg p-3 border border-slate-200 border-dashed">
                              <p className="text-slate-600 text-sm">{stepText}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Visual Flow Representation */}
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-slate-900 mb-4">Visual Flow</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2 bg-white rounded-lg border-2 border-green-500 shadow-sm">
                    <div className="text-xs text-green-600 font-semibold">START</div>
                  </div>

                  {selectedWireframe.steps.filter(s => !s.startsWith('  ')).map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                      <div className="px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <div className="text-xs text-slate-600 max-w-[120px] truncate">
                          {step.trim()}
                        </div>
                      </div>
                    </div>
                  ))}

                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  <div className="px-4 py-2 bg-white rounded-lg border-2 border-red-500 shadow-sm">
                    <div className="text-xs text-red-600 font-semibold">END</div>
                  </div>
                </div>
              </div>

              {/* Try Live Demo Button */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Lihat Demo Interaktif</h3>
                    <p className="text-sm text-blue-100">
                      Coba langsung fitur {selectedWireframe.title.replace('Activity Diagram: ', '')}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Buka Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
