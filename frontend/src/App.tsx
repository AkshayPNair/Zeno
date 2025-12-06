import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './Providers/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Redirect root to /auth by default */}
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;