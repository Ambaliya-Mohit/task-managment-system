import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import AppLayout from "./layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Issues from "./pages/Issues";
import Sprints from "./pages/Sprints";
import Epics from "./pages/Epics";
import Settings from "./pages/Setting";

import Login from "./pages/Login";
// import Register from "./pages/Register";

import Users from "./pages/Users";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}

          {/* Protected Routes */}
          <Route path="/users" element={<Users />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/sprints" element={<Sprints />} />
              <Route path="/epics" element={<Epics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Unknown route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;