import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Placeholder title="My tasks" />} />
          <Route path="/subjects" element={<Placeholder title="Subjects" />} />
          <Route path="/planner" element={<Placeholder title="Study planner" />} />
          <Route path="/notes" element={<Placeholder title="My notes" />} />
          <Route path="/insights" element={<Placeholder title="Insights" />} />
        </Route>
      </Route>
    </Routes>
  );
}
