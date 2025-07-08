import { useState, useEffect } from "react";
import {
  PhoneCall,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Send,
  Ruler,
  BookOpen,
  Calculator,
  TrafficCone,
  Construction,
  FileSearch,
} from "lucide-react";

const ICONS = {
  PhoneCall,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Send,
  Ruler,
  BookOpen,
  Calculator,
  TrafficCone,
  Construction,
  FileSearch,
};

const ICON_NAMES = Object.keys(ICONS);

export default function StepEditor({ steps, onSave }) {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (Array.isArray(steps)) {
      setItems(steps);
    } else {
      setItems([]);
    }
  }, [steps]);

  const handleChange = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    setItems(updated);
  };

  const addStep = () => {
    setItems([
      ...items,
      { title: "", description: "", icon: "FileText" },
    ]);
  };

  const removeStep = (i) => {
    const updated = [...items];
    updated.splice(i, 1);
    setItems(updated);
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      await onSave(items);
      setMessage("Сохранено!");
    } catch (err) {
      console.error(err);
      setMessage("Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((step, i) => {
        const IconPreview = ICONS[step.icon] || FileText;
        return (
          <div key={i} className="p-4 border rounded bg-white space-y-2">
            <input
              className="w-full border p-2 rounded"
              value={step.title}
              onChange={(e) => handleChange(i, "title", e.target.value)}
              placeholder="Заголовок"
            />
            <textarea
              className="w-full border p-2 rounded"
              value={step.description}
              onChange={(e) => handleChange(i, "description", e.target.value)}
              placeholder="Описание"
            />
            <select
              className="w-full border p-2 rounded"
              value={step.icon}
              onChange={(e) => handleChange(i, "icon", e.target.value)}
            >
              {ICON_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              Превью иконки: <IconPreview className="w-5 h-5" />
            </div>
            <button
              className="text-red-600 mt-2"
              onClick={() => removeStep(i)}
            >
              Удалить этап
            </button>
          </div>
        );
      })}

      <div className="flex gap-2">
        <button
          onClick={addStep}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          + Добавить этап
        </button>
        <button
          onClick={save}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Сохраняю..." : "Сохранить"}
        </button>
      </div>

      {message && (
        <p className={`text-sm ${message.includes("Сохранено") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
