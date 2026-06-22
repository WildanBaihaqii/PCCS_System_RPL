# PCCS_System_RPL

[![CI](https://github.com/WildanBaihaqii/PCCS_System_RPL/actions/workflows/ci.yml/badge.svg)](https://github.com/WildanBaihaqii/PCCS_System_RPL/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

>Sistem Pengaduan Digital sederhana untuk Politeknik Negeri Cilacap — UI React + Tailwind + Vite.

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

## Fitur tambahan yang saya tambahkan

- Penyimpanan laporan dan pesan pada `localStorage` agar state bertahan antar reload.
- Dashboard admin memuat dan menyimpan perubahan status laporan.
- Chat per-laporan (persisted) dan halaman tracking menampilkan data nyata.

## Kontribusi

1. Fork repo.
2. Buat branch fitur: `git checkout -b feat/my-feature`.
3. Commit perubahan dan push: `git push origin feat/my-feature`.
4. Buka Pull Request.

## Menjalankan langkah cepat setelah clone

```bash
git clone https://github.com/WildanBaihaqii/PCCS_System_RPL.git
cd PCCS_System_RPL
npm install
npm run dev
```

## Lisensi

Proyek ini disediakan apa adanya. Tambahkan file `LICENSE` sesuai kebutuhan.

---

Jika mau, saya bisa menambahkan badge, panduan deploy (GitHub Pages / Netlify), atau contoh skrip CI untuk build otomatis.

  # UI Design and Mockups

  This is a code bundle for UI Design and Mockups. The original project is available at https://www.figma.com/design/v1UBTS1aEKOiugYhAhFPLI/UI-Design-and-Mockups.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  