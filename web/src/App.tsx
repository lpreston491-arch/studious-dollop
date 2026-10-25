import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddEditHabit from './pages/AddEditHabit';
import Premium from './pages/Premium';
import Onboarding from './pages/Onboarding';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const hasOnboarded = localStorage.getItem('has_onboarded');
  
  if (!token) return <Navigate to="/login" />;
  if (!hasOnboarded) return <Navigate to="/onboarding" />;
  
  return <>{children}</>;
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/habits/new"
          element={
            <PrivateRoute>
              <AddEditHabit />
            </PrivateRoute>
          }
        />
        <Route
          path="/habits/:id/edit"
          element={
            <PrivateRoute>
              <AddEditHabit />
            </PrivateRoute>
          }
        />
        <Route
          path="/premium"
          element={
            <PrivateRoute>
              <Premium />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
