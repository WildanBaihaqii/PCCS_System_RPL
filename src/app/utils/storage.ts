export interface Complaint {
  id: string;
  title: string;
  category: string;
  description: string;
  priority: string;
  status: string;
  date: string;
  reporter: string;
  reporterId: string;
}

const KEY = 'pccs_complaints_v1';

export function loadComplaints(): Complaint[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Complaint[];
  } catch (e) {
    console.error('loadComplaints', e);
    return [];
  }
}

export function saveComplaints(list: Complaint[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    console.error('saveComplaints', e);
  }
}

export function addComplaint(c: Omit<Complaint, 'id' | 'date' | 'status'>) {
  const list = loadComplaints();
  const id = 'C' + String(Math.floor(1000 + Math.random() * 9000));
  const date = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
  const newC: Complaint = { ...c, id, date, status: 'Menunggu' };
  const next = [newC, ...list];
  saveComplaints(next);
  return newC;
}

export function updateComplaintStatus(id: string, status: string) {
  const list = loadComplaints();
  const next = list.map(c => c.id === id ? { ...c, status } : c);
  saveComplaints(next);
  return next;
}

export function findComplaint(id: string) {
  return loadComplaints().find(c => c.id === id) || null;
}

// Messages
const MSG_KEY = 'pccs_messages_v1';

export function loadMessages(complaintId: string) {
  try {
    const raw = localStorage.getItem(MSG_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw) as Record<string, any[]>;
    return all[complaintId] || [];
  } catch (e) {
    console.error('loadMessages', e);
    return [];
  }
}

export function saveMessage(complaintId: string, msg: any) {
  try {
    const raw = localStorage.getItem(MSG_KEY);
    const all = raw ? JSON.parse(raw) as Record<string, any[]> : {};
    if (!all[complaintId]) all[complaintId] = [];
    all[complaintId].push(msg);
    localStorage.setItem(MSG_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('saveMessage', e);
  }
}
