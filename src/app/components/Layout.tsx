import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart3,
  LogOut,
  Menu,
  GraduationCap,
  Bell,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface User {
  role: 'student' | 'admin';
  name: string;
  id: string;
}

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const studentNav = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/complaint/new', label: 'Buat Laporan', icon: FileText },
  { path: '/complaint/tracking', label: 'Tracking Laporan', icon: TrendingUp },
  { path: '/chat/C001', label: 'Chat', icon: MessageSquare },
];

const adminNav = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/complaint/tracking', label: 'Manajemen Laporan', icon: FileText },
  { path: '/statistics', label: 'Statistik', icon: BarChart3 },
];

export default function Layout({ user, onLogout, children, title, subtitle }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const nav = user.role === 'admin' ? adminNav : studentNav;
  const isActive = (p: string) => location.pathname === p;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Overlay mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'var(--pccs-sidebar-gradient)' }}
      >
        {/* Logo */}
        <div className="px-6 py-5 flex items-center gap-3 border-b border-white/10">
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">PCCS</p>
            <p className="text-blue-300 text-xs mt-0.5">Politeknik Cilacap</p>
          </div>
        </div>

        {/* User card */}
        <div className="mx-4 mt-5 p-3 rounded-xl bg-white/10 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate leading-tight">{user.name}</p>
            <p className="text-blue-300 text-xs truncate">
              {user.role === 'admin' ? 'Administrator' : user.id}
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="px-4 mt-6 flex-1 space-y-1">
          <p className="text-blue-400 text-xs uppercase font-semibold tracking-wider mb-3 px-2">
            Menu Utama
          </p>
          {nav.map(({ path, label, icon: Icon }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => { navigate(path); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-white text-blue-700 shadow-md'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                <span className="flex-1 text-left">{label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 pb-5">
          <div className="border-t border-white/10 pt-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-red-300 hover:bg-red-500/15 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
          <p className="text-blue-400/50 text-xs text-center mt-3">PCCS v2.0 © 2026</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 lg:px-6 h-15 flex items-center justify-between flex-shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
            <div>
              {title && <h2 className="font-semibold text-foreground text-sm">{title}</h2>}
              {subtitle && <p className="text-xs text-muted-foreground leading-none mt-0.5">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 hover:bg-muted rounded-xl transition-colors">
              <Bell className="w-4.5 h-4.5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
            </button>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'var(--pccs-primary-gradient)' }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
