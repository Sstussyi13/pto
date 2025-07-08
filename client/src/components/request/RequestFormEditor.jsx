import { useEffect, useState } from "react";
import axios from "axios";

export default function RequestFormEditor() {
  const [data, setData] = useState({
    service_types: [],
    object_types: [],
    id_sections: [],
    control_periods: [],
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fields = [
    { key: "service_types", label: "Типы услуг" },
    { key: "object_types", label: "Типы объектов" },
    { key: "id_sections", label: "Разделы ИД" },
    { key: "control_periods", label: "Периоды контроля" },
  ];

  useEffect(() => {
    axios.get("/api/content/all").then((res) => {
      const values = {};
      res.data.forEach((item) => {
        try {
          values[item.key] = JSON.parse(item.value);
        } catch {
          values[item.key] = [];
        }
      });
      setData((prev) => ({ ...prev, ...values }));
    });
  }, []);

  const handleChange = (key, i, value) => {
    const updated = [...data[key]];
    updated[i] = value;
    setData((prev) => ({ ...prev, [key]: updated }));
  };

  const handleAdd = (key) => {
    setData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const handleRemove = (key, index) => {
    const updated = [...data[key]];
    updated.splice(index, 1);
    setData((prev) => ({ ...prev, [key]: updated }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      for (const field of fields) {
        await axios.put(`/api/content/${field.key}`, {
          value: JSON.stringify(data[field.key]),
        });
      }
      setMessage("✅ Изменения успешно сохранены.");
    } catch (error) {
      setMessage("❌ Ошибка при сохранении данных.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-xl border border-gray-200 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900">Редактирование справочников заявки</h2>

      {fields.map(({ key, label }) => (
        <div key={key}>
          <h3 className="text-lg font-medium text-gray-800 mb-2">{label}</h3>

          <div className="space-y-2">
            {data[key]?.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(key, i, e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(key, i)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleAdd(key)}
            className="text-blue-600 text-sm mt-2 hover:underline"
          >
            + Добавить значение
          </button>
        </div>
      ))}

      <div className="pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Сохранение..." : "Сохранить изменения"}
        </button>
        {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
