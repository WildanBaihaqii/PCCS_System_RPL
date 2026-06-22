import { Complaint } from './storage';

export function exportComplaintToPDF(complaint: Complaint) {
  const doc = document.createElement('div');
  doc.style.fontFamily = 'Arial, sans-serif';
  doc.style.padding = '20px';
  doc.style.color = '#333';

  const html = `
    <div style="max-width: 800px; margin: 0 auto;">
      <h1 style="text-align: center; color: #0ea5e9; margin-bottom: 30px;">
        LAPORAN PENGADUAN
      </h1>
      
      <div style="border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #0ea5e9;">Informasi Laporan</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; font-weight: bold; width: 30%;">Nomor Laporan:</td>
            <td style="padding: 8px 0;">${complaint.id}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; font-weight: bold;">Judul:</td>
            <td style="padding: 8px 0;">${complaint.title}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; font-weight: bold;">Kategori:</td>
            <td style="padding: 8px 0;">${complaint.category}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; font-weight: bold;">Prioritas:</td>
            <td style="padding: 8px 0;">${complaint.priority}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; font-weight: bold;">Status:</td>
            <td style="padding: 8px 0;">${complaint.status}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; font-weight: bold;">Tanggal:</td>
            <td style="padding: 8px 0;">${complaint.date}</td>
          </tr>
        </table>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #0ea5e9;">Informasi Pelapor</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px 0; font-weight: bold; width: 30%;">Nama:</td>
            <td style="padding: 8px 0;">${complaint.reporter}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">NIM/NIP:</td>
            <td style="padding: 8px 0;">${complaint.reporterId}</td>
          </tr>
        </table>
      </div>

      <div style="border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #0ea5e9;">Deskripsi Laporan</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${complaint.description}</p>
      </div>

      <div style="border-top: 2px solid #0ea5e9; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
        <p>Dokumen ini digenerate otomatis oleh PCCS System</p>
        <p>Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
      </div>
    </div>
  `;

  doc.innerHTML = html;

  const printWindow = window.open('', '', 'height=600,width=800');
  if (!printWindow) return;
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${complaint.id} - ${complaint.title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        ${doc.innerHTML}
        <div class="no-print" style="text-align: center; margin-top: 20px;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #0ea5e9; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Cetak / Simpan PDF
          </button>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
}
