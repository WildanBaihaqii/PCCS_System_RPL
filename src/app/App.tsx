import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import ComplaintForm from './components/ComplaintForm';
import ComplaintTracking from './components/ComplaintTracking';
import ChatRoom from './components/ChatRoom';
import Statistics from './components/Statistics';
import Wireframes from './components/Wireframes';
import { ToastContainer } from './components/ToastNotification';

export default function App() {
  const [user, setUser] = useState<{ role: 'student' | 'admin' | null; name: string; id: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('pccs_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: { role: 'student' | 'admin'; name: string; id: string }) => {
    setUser(userData);
    localStorage.setItem('pccs_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pccs_user');
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ?
              <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} /> :
              <LoginPage onLogin={handleLogin} />
          }
        />
        <Route path="/wireframes" element={<Wireframes />} />
        <Route
          path="/dashboard"
          element={
            user?.role === 'student' ?
              <StudentDashboard user={user} onLogout={handleLogout} /> :
              <Navigate to="/" />
          }
        />
        <Route
          path="/admin"
          element={
            user?.role === 'admin' ?
              <AdminDashboard user={user} onLogout={handleLogout} /> :
              <Navigate to="/" />
          }
        />
        <Route
          path="/complaint/new"
          element={
            user?.role === 'student' ?
              <ComplaintForm user={user} onLogout={handleLogout} /> :
              <Navigate to="/" />
          }
        />
        <Route
          path="/complaint/tracking"
          element={
            user ?
              <ComplaintTracking user={user} onLogout={handleLogout} /> :
              <Navigate to="/" />
          }
        />
        <Route
          path="/chat/:complaintId"
          element={
            user ?
              <ChatRoom user={user} onLogout={handleLogout} /> :
              <Navigate to="/" />
          }
        />
        <Route
          path="/statistics"
          element={
            user?.role === 'admin' ?
              <Statistics user={user} onLogout={handleLogout} /> :
              <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}
