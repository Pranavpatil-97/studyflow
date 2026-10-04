import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";
import Placeholder from "./pages/Placeholder";

// Visitors see the landing page at "/", everything else needs a login.
function Gate() {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) return <div className="grid h-screen place-items-center text-slate-400">Loading...</div>;
  if (!user) return pathname === "/" ? <Landing /> : <Navigate to="/login" replace />;
  return <Layout />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Gate />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/new" element={<AddTask />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:id" element={<SubjectDetail />} />
        <Route path="/planner" element={<Placeholder title="Study planner" />} />
        <Route path="/notes" element={<Placeholder title="My notes" />} />
        <Route path="/insights" element={<Placeholder title="Insights" />} />
      </Route>
    </Routes>
  );
}