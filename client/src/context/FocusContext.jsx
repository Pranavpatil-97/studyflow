import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
import { fmtClock } from "../lib/focusStats";

export const DURATIONS = { focus: 25, short: 5, long: 15 }; // minutes
export const LABELS = { focus: "Focus", short: "Short break", long: "Long break" };

const FocusContext = createContext(null);
export const useFocus = () => useContext(FocusContext);

export function FocusProvider({ children }) {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [mode, setMode] = useState("focus");
  const [running, setRunning] = useState(false);
  const [endsAt, setEndsAt] = useState(0);
  const [pausedMs, setPausedMs] = useState(DURATIONS.focus * 60000);
  const [now, setNow] = useState(Date.now());
  const [taskId, setTaskId] = useState("");
  const [rounds, setRounds] = useState(0);
  const audio = useRef(null);
  const baseTitle = useRef(document.title);

  const remaining = running ? Math.max(0, endsAt - now) : pausedMs;
  const total = DURATIONS[mode] * 60000;

  const loadSessions = useCallback(async () => {
    setSessions((await api.get("/focus")).data);
  }, []);

  useEffect(() => {
    if (!user) {
      setSessions([]);
      setRunning(false);
      return;
    }
    loadSessions().catch(() => {});
  }, [user, loadSessions]);

  // Tick while running (timestamps keep it accurate even in background tabs)
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [running]);

  const beep = () => {
    try {
      const ctx = audio.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    } catch { /* sound is optional */ }
  };

  const finish = useCallback(async () => {
    setRunning(false);
    beep();
    if (mode === "focus") {
      const count = rounds + 1;
      const next = count % 4 === 0 ? "long" : "short";
      setRounds(count);
      setMode(next);
      setPausedMs(DURATIONS[next] * 60000);
      try {
        await api.post("/focus", { minutes: DURATIONS.focus, task: taskId || undefined });
        await loadSessions();
      } catch { /* session just won't be counted */ }
    } else {
      setMode("focus");
      setPausedMs(DURATIONS.focus * 60000);
    }
  }, [mode, rounds, taskId, loadSessions]);

  useEffect(() => {
    if (running && now >= endsAt) finish();
  }, [running, now, endsAt, finish]);

  // Show the countdown in the browser tab
  useEffect(() => {
    document.title = running ? `${fmtClock(remaining)} · ${LABELS[mode]}` : baseTitle.current;
  }, [running, remaining, mode]);
  useEffect(() => () => { document.title = baseTitle.current; }, []);

  const start = () => {
    if (!audio.current) {
      try { audio.current = new (window.AudioContext || window.webkitAudioContext)(); } catch { /* no audio */ }
    }
    audio.current?.resume?.();
    const t = Date.now();
    setNow(t);
    setEndsAt(t + pausedMs);
    setRunning(true);
  };
  const pause = () => {
    setPausedMs(Math.max(0, endsAt - Date.now()));
    setRunning(false);
  };
  const reset = () => {
    setRunning(false);
    setPausedMs(DURATIONS[mode] * 60000);
  };
  const switchMode = (m) => {
    setRunning(false);
    setMode(m);
    setPausedMs(DURATIONS[m] * 60000);
  };

  return (
    <FocusContext.Provider
      value={{ sessions, mode, running, remaining, total, taskId, setTaskId, start, pause, reset, switchMode }}
    >
      {children}
    </FocusContext.Provider>
  );
}