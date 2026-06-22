import { Notification } from '../utils/storage';

export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export function addNotification(message: string, type: NotificationType = 'info') {
  const key = 'pccs_notifications';
  try {
    const existing = localStorage.getItem(key) || '[]';
    const list = JSON.parse(existing) as Array<{ id: string; message: string; type: NotificationType; timestamp: number; read: boolean }>;
    const item = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: Date.now(),
      read: false,
    };
    list.unshift(item);
    // Keep only last 20 notifications
    if (list.length > 20) list.pop();
    localStorage.setItem(key, JSON.stringify(list));
  } catch (e) {
    console.error('addNotification', e);
  }
}

export function getNotifications(unreadOnly = false) {
  const key = 'pccs_notifications';
  try {
    const existing = localStorage.getItem(key) || '[]';
    const list = JSON.parse(existing) as Array<{ id: string; message: string; type: NotificationType; timestamp: number; read: boolean }>;
    return unreadOnly ? list.filter(n => !n.read) : list;
  } catch (e) {
    console.error('getNotifications', e);
    return [];
  }
}

export function markNotificationRead(id: string) {
  const key = 'pccs_notifications';
  try {
    const existing = localStorage.getItem(key) || '[]';
    const list = JSON.parse(existing) as Array<{ id: string; message: string; type: NotificationType; timestamp: number; read: boolean }>;
    const updated = list.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.error('markNotificationRead', e);
  }
}

export function markAllNotificationsRead() {
  const key = 'pccs_notifications';
  try {
    const existing = localStorage.getItem(key) || '[]';
    const list = JSON.parse(existing) as Array<{ id: string; message: string; type: NotificationType; timestamp: number; read: boolean }>;
    const updated = list.map(n => ({ ...n, read: true }));
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.error('markAllNotificationsRead', e);
  }
}
