import { Check, Clock, Flag, Trash2 } from "lucide-react";
import SubjectTag from "./SubjectTag";
import { useData } from "../context/DataContext";
import { prettyDate } from "../lib/dates";

export default function TaskRow({ task, showDate }) {
  const { toggleTask, removeTask } = useData();

  const handleDelete = () => {
    if (window.confirm(`Delete "${task.title}"?`)) removeTask(task._id);
  };

  return (
    <li className="flex items-center gap-3 px-4 py-3 sm:px-5">
      <button
        onClick={() => toggleTask(task)}
        aria-label="Toggle task"
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
          task.completed ? "border-brand bg-brand text-white" : "border-slate-300"
        }`}
      >
        {task.completed && <Check size={13} />}
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
        <p className={`min-w-0 flex-1 truncate text-sm ${task.completed ? "text-slate-400 line-through" : ""}`}>
          {task.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          {task.priority === "high" && !task.completed && (
            <span className="flex items-center gap-1 text-orange-500"><Flag size={12} /> Priority</span>
          )}
          <SubjectTag subject={task.subject} />
          <span className="flex items-center gap-1"><Clock size={12} /> {task.minutes} min</span>
          {showDate && <span>{prettyDate(task.dueDate)}</span>}
        </div>
      </div>

      <button onClick={handleDelete} aria-label="Delete task" className="text-slate-300 hover:text-red-500">
        <Trash2 size={15} />
      </button>
    </li>
  );
}