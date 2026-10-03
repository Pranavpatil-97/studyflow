import { colorOf } from "../lib/colors";

export default function SubjectTag({ subject }) {
  if (!subject) return null;
  return (
    <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${colorOf(subject.color).chip}`}>
      {subject.name}
    </span>
  );
}