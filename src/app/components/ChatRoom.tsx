import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Send, Paperclip, Info, CheckCheck } from 'lucide-react';

interface User { role: 'student' | 'admin'; name: string; id: string; }
interface Props { user: User; onLogout: () => void; }

interface Message {
  id: string;
  sender: 'student' | 'admin';
  name: string;
  text: string;
  time: string;
  read?: boolean;
}

import { loadMessages, saveMessage, findComplaint } from '../utils/storage';

function Avatar({ name, role }: { name: string; role: 'student' | 'admin' }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ background: role === 'admin' ? 'linear-gradient(135deg,#7c3aed,#6d28d9)' : 'var(--pccs-primary-gradient)' }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function ChatRoom({ user }: Props) {
  const navigate = useNavigate();
  const { complaintId } = useParams();
  const [msgs, setMsgs] = useState<Message[]>(() => []);
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  useEffect(() => {
    if (!complaintId) return;
    const stored = loadMessages(complaintId);
    if (stored && stored.length) setMsgs(stored as Message[]);
    else {
      // seed from complaint if exists
      const c = findComplaint(complaintId);
      if (c) setMsgs([{ id: Date.now().toString(), sender: 'student', name: c.reporter, time: new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}), text: `Mengikuti laporan: ${c.title}` }]);
    }
  }, [complaintId]);

  const send = () => {
    if (!text.trim()) return;
    const msg = {
      id: Date.now().toString(),
      sender: user.role === 'admin' ? 'admin' : 'student',
      name: user.name,
      text: text.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    } as Message;
    setMsgs(m => [...m, msg]);
    if (complaintId) saveMessage(complaintId, msg);
    setText('');
  };

  const isOwn = (msg: Message) =>
    (user.role === 'admin' && msg.sender === 'admin') ||
    (user.role !== 'admin' && msg.sender === 'student');

  const back = user.role === 'admin' ? '/admin' : '/dashboard';

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 lg:px-6 flex items-center justify-between h-15 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(back)}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4.5 h-4.5 text-muted-foreground" />
          </button>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground font-bold text-sm"
            style={{ background: 'var(--pccs-primary-gradient)' }}
          >
            C
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">Laporan #{complaintId}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-xs text-muted-foreground truncate max-w-[200px]">Kerusakan AC di Ruang Lab Komputer</p>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-muted rounded-xl transition-colors">
          <Info className="w-4.5 h-4.5 text-muted-foreground" />
        </button>
      </header>

      {/* Status bar */}
      <div className="flex-shrink-0 px-4 py-2 bg-accent border-b border-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Status:</span>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">Diproses</span>
        </div>
        <span className="text-xs text-muted-foreground">Fasilitas · Prioritas Tinggi</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 space-y-3">
        {/* Date divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground px-2">15 Mei 2026</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {msgs.map(msg => {
          const own = isOwn(msg);
          return (
            <div key={msg.id} className={`flex ${own ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {!own && <Avatar name={msg.name} role={msg.sender} />}

              <div className="max-w-[72%]">
                {!own && <p className="text-xs text-muted-foreground font-medium mb-1 ml-1">{msg.name}</p>}
                <div
                  className={`px-4 py-2.5 shadow-sm ${own
                    ? 'text-white rounded-2xl rounded-br-sm'
                    : 'bg-card text-foreground border border-border rounded-2xl rounded-bl-sm'
                  }`}
                  style={own ? { background: 'var(--pccs-primary-gradient)' } : {}}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-1 mt-1 ${own ? 'justify-end pr-1' : 'justify-start pl-1'}`}>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                  {own && msg.read && <CheckCheck className="w-3 h-3 text-primary/60" />}
                </div>
              </div>

              {own && <Avatar name={user.name} role={user.role} />}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border px-4 lg:px-6 py-3 flex-shrink-0">
        <div className="flex items-end gap-2">
          <button className="p-2.5 hover:bg-muted rounded-xl transition-colors flex-shrink-0">
            <Paperclip className="w-4.5 h-4.5 text-muted-foreground" />
          </button>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }}}
            placeholder="Ketik pesan..."
            rows={1}
            className="flex-1 px-4 py-2.5 border border-border rounded-2xl bg-muted/50 focus:bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none text-sm transition-all"
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={send}
            disabled={!text.trim()}
            className="p-2.5 rounded-xl text-primary-foreground flex-shrink-0 transition-all disabled:opacity-40 hover:opacity-90 active:scale-95"
            style={{ background: text.trim() ? 'var(--pccs-primary-gradient)' : '#cbd5e1' }}
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground/60 mt-1.5 ml-12">Enter untuk kirim · Shift+Enter baris baru</p>
      </div>
    </div>
  );
}
