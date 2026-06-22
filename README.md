## PPCS (Politeknik Cilacap Complaint System) ###

[![CI](https://github.com/WildanBaihaqii/PCCS_System_RPL/actions/workflows/ci.yml/badge.svg)](https://github.com/WildanBaihaqii/PCCS_System_RPL/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

>Sistem Pengaduan Digital sederhana untuk Politeknik Negeri Cilacap — UI React + Tailwind + Vite.
## UI
<img width="1920" height="960" alt="image" src="https://github.com/user-attachments/assets/89ee98c1-ba6d-4795-a2ba-f15dfc7bc07a" />

## Prasyarat

- Node.js (>=18) dan `npm` tersedia pada PATH. Alternatif: `pnpm`/`yarn` juga dapat digunakan.

## Menjalankan secara lokal (development)

1. Pasang dependensi:

```bash
npm install
```

2. Jalankan server development (Vite):

```bash
npm run dev
```

Buka http://localhost:5173/ di browser.

## Membangun untuk produksi

```bash
npm run build
```

Output akan berada di `dist/`.

## Data & Persistence

Untuk kemudahan demo, data disimpan di `localStorage` pada browser:

- Komplaint: `pccs_complaints_v1`
- Pesan chat: `pccs_messages_v1`
- User demo: `pccs_user`

Jika ingin mengosongkan data demo, buka DevTools → Application → Local Storage → hapus kunci di atas.

## Fitur Utama

### Core Features
- ✅ **Multi-role Authentication** - Login sebagai Mahasiswa/Dosen atau Admin
- ✅ **Dashboard Mahasiswa** - Lihat laporan pribadi, statistik, dan akses cepat ke fitur utama
- ✅ **Dashboard Admin** - Kelola semua laporan, ubah status, lihat analytics
- ✅ **Form Pengaduan Multi-step** - Langkah-langkah terstruktur: informasi dasar → detail → konfirmasi
- ✅ **Chat per-Laporan** - Komunikasi real-time antara mahasiswa dan admin per laporan
- ✅ **Tracking Laporan** - Pantau progress penanganan laporan dengan timeline visual
- ✅ **Statistik & Analytics** - Dashboard dengan chart trend, distribusi kategori, top issues

### Advanced Features (Baru ditambahkan)
- 🔔 **Toast Notifications** - Feedback instan untuk setiap aksi (success, error, warning, info)
- 📄 **Export Laporan ke PDF** - Generate dan print laporan dalam format PDF
- ✔️ **Form Validation** - Validasi ketat untuk judul (min 10 char), deskripsi (min 20 char)
- 💾 **LocalStorage Persistence** - Data laporan dan chat tersimpan antar reload
- 📊 **Notification System** - History notifikasi dengan read/unread state
- 👤 **User Profile & Avatar** - Avatar dinamis berdasarkan nama user
- 🎨 **Responsive Design** - Mobile, tablet, desktop UI yang optimal

## Data & Persistence

Untuk kemudahan demo, semua data disimpan di `localStorage` pada browser:

- Laporan pengaduan: `pccs_complaints_v1`
- Pesan chat: `pccs_messages_v1`
- Notifikasi: `pccs_notifications`
- User session: `pccs_user`

**Catatan**: Gunakan inkognito mode untuk multiple user testing, atau hapus `pccs_user` dari DevTools untuk logout.

### Mengosongkan Data Demo
Buka DevTools (F12) → Application → Local Storage → hapus semua kunci PCCS untuk reset.

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 + Shadcn UI components
- **Routing**: React Router 7
- **State Management**: React Hooks + LocalStorage
- **Charts**: Recharts
- **Notifications**: Sonner (Toast)
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Animations**: Motion

## Kontribusi

1. Fork repo.
2. Buat branch fitur: `git checkout -b feat/my-feature`.
3. Commit perubahan dan push: `git push origin feat/my-feature`.
4. Buka Pull Request dengan deskripsi fitur yang jelas.

### Development Workflow
```bash
# Clone dan setup
git clone https://github.com/WildanBaihaqii/PCCS_System_RPL.git
cd PCCS_System_RPL
npm install

# Development
npm run dev      # Start dev server
npm run build    # Build untuk production

# Testing
# Buat user test: masuk dengan role student/admin
# Username/password: apa saja (demo mode)
```

## Roadmap Fitur Mendatang

- [ ] Backend API integration (Express.js / Node.js)
- [ ] Real database (PostgreSQL/MongoDB)
- [ ] Email notifications
- [ ] File upload & attachment
- [ ] Advanced search & filters
- [ ] User management admin panel
- [ ] Activity audit logs
- [ ] Mobile app (React Native)
- [ ] Dark mode toggle
- [ ] Multi-language support (EN/ID)

## Lisensi

MIT License - Silakan gunakan untuk keperluan pribadi atau komersial.

## Kontak & Support

Jika ada pertanyaan atau ingin kontribusi, bisa melalui:
- GitHub Issues
- Pull Requests
- Email ke project maintainer
  
