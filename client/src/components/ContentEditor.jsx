import { useEffect, useState } from "react";
import axios from "axios";

export default function ContentEditor({ sectionKey }) {
  const [rawValue, setRawValue] = useState("");
  const [parsedValue, setParsedValue] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const endpoint = `/api/content/${sectionKey}`;

  useEffect(() => {
    if (!sectionKey) return;

    axios.get(endpoint)
      .then((res) => {
        const value = res.data?.value;
        if (value !== undefined) {
          setParsedValue(value);
          setRawValue(JSON.stringify(value, null, 2));
        } else {
          setParsedValue(null);
          setRawValue("");
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setParsedValue(null);
        setRawValue("");
      });
  }, [sectionKey]);

  const handleChange = (e) => {
    const val = e.target.value;
    setRawValue(val);
    setMessage("");

    try {
      const parsed = JSON.parse(val);
      setParsedValue(parsed);
    } catch {
      setParsedValue(null);
    }
  };

  const saveContent = async () => {
    if (!parsedValue) {
      setMessage("Ошибка: недопустимый JSON.");
      return;
    }

    setSaving(true);
    try {
      await axios.put(endpoint, { value: parsedValue });
      setMessage("✅ Сохранено");
    } catch (err) {
      console.error("Ошибка сохранения:", err);
      setMessage("❌ Ошибка при сохранении.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <textarea
        className="w-full border p-4 rounded mb-2 h-60 font-mono text-sm bg-white disabled:bg-gray-100"
        value={rawValue}
        onChange={handleChange}
        disabled={saving}
      />
      {message && (
        <p className={`mb-4 text-sm ${message.includes("Сохранено") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
      <button
        onClick={saveContent}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        disabled={saving}
      >
        {saving ? "Сохраняю..." : "Сохранить"}
      </button>
    </div>
  );
}
