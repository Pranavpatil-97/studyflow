import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSubjects = useCallback(async () => {
    setSubjects((await api.get("/subjects")).data);
  }, []);
  const loadTasks = useCallback(async () => {
    setTasks((await api.get("/tasks")).data);
  }, []);

  useEffect(() => {
    if (!user) {
      setSubjects([]);
      setTasks([]);
      return;
    }
    setLoading(true);
    Promise.all([loadSubjects(), loadTasks()])
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, loadSubjects, loadTasks]);

  const addSubject = async (payload) => {
    await api.post("/subjects", payload);
    await loadSubjects();
  };
  const removeSubject = async (id) => {
    await api.delete(`/subjects/${id}`);
    await Promise.all([loadSubjects(), loadTasks()]);
  };

  const addTask = async (payload) => {
    await api.post("/tasks", payload);
    await loadTasks();
  };
  const toggleTask = async (task) => {
    const completed = !task.completed;
    setTasks((ts) =>
      ts.map((t) =>
        t._id === task._id
          ? { ...t, completed, completedAt: completed ? new Date().toISOString() : null }
          : t
      )
    );
    try {
      await api.patch(`/tasks/${task._id}`, { completed });
    } catch {
      loadTasks(); // roll back to server state
    }
  };
  const removeTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((ts) => ts.filter((t) => t._id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        subjects, tasks, loading,
        loadSubjects, addSubject, removeSubject,
        addTask, toggleTask, removeTask,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}