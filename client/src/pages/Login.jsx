import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Layers } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    setError("");
    setBusy(true);
    try {
      if (mode === "login") await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const input = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand";

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white"><Layers size={18} /></div>
          <span className="text-xl font-light">studyflow</span>
        </div>
        <h1 className="text-lg font-medium">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="mb-5 text-sm text-slate-400">A little focus today, a step closer to your goals.</p>

        <div className="space-y-3">
          {mode === "register" && <input className={input} placeholder="Full name" value={form.name} onChange={set("name")} />}
          <input className={input} type="email" placeholder="Email" value={form.email} onChange={set("email")} />
          <input
            className={input} type="password" placeholder="Password (min 6 characters)"
            value={form.password} onChange={set("password")}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button onClick={submit} disabled={busy}
          className="mt-5 w-full rounded-xl bg-brand py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
          {busy ? "Please wait..." : mode === "login" ? "Log in" : "Sign up"}
        </button>

        <p className="mt-4 text-center text-sm text-slate-500">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button className="font-medium text-brand" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
