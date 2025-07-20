import { useState, useEffect } from "react";
import axios from "axios";
import {
  Wrench, FileText, ClipboardList, ClipboardCheck, TrafficCone,
  Construction, Ruler, FileSearch, BookOpen, Calculator,
} from "lucide-react";

const ICONS = { Wrench, FileText, ClipboardList, ClipboardCheck, TrafficCone, Construction, Ruler, FileSearch, BookOpen, Calculator };
const ICON_NAMES = Object.keys(ICONS);

export default function ServiceEditor() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const endpoint = "/api/content/services";

  useEffect(() => {
    axios.get(endpoint)
      .then((res) => {
        try {
          const parsed = JSON.parse(res.data?.value);
          if (Array.isArray(parsed)) setServices(parsed);
          else setServices([]);
        } catch {
          setServices([]);
        }
      })
      .catch(() => setServices([]));
  }, []);

  const handleChange = (i, field, value) => {
    const updated = [...services];
    updated[i][field] = value;
    setServices(updated);
  };

  const handleArrayChange = (i, field, arr) => {
    const updated = [...services];
    updated[i][field] = arr;
    setServices(updated);
  };

  const addService = () => {
    setServices([
      ...services,
      {
        title: "", description: "", icon: "Wrench",
        full: "", features: [], included: [],
      },
    ]);
  };

  const removeService = (i) => {
    const updated = [...services];
    updated.splice(i, 1);
    setServices(updated);
  };


  const addArrayItem = (i, field) => {
    handleArrayChange(i, field, [ ...(services[i][field] || []), "" ]);
  };
  const updateArrayItem = (i, field, idx, value) => {
    const arr = [ ...(services[i][field] || []) ];
    arr[idx] = value;
    handleArrayChange(i, field, arr);
  };
  const removeArrayItem = (i, field, idx) => {
    const arr = (services[i][field] || []).filter((_, j) => j !== idx);
    handleArrayChange(i, field, arr);
  };


  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      await axios.put(endpoint, { value: JSON.stringify(services) });
      setMessage("Сохранено!");
    } catch (err) {
      setMessage("Ошибка при сохранении.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {services.map((service, i) => {
        const Icon = ICONS[service.icon] || null;
        return (
          <div key={i} className="p-4 border rounded bg-white space-y-2">
            <input
              className="w-full border p-2 rounded"
              value={service.title}
              onChange={e => handleChange(i, "title", e.target.value)}
              placeholder="Название"
            />
            <input
              className="w-full border p-2 rounded"
              value={service.description}
              onChange={e => handleChange(i, "description", e.target.value)}
              placeholder="Краткое описание"
            />
            <textarea
              className="w-full border p-2 rounded"
              value={service.full}
              onChange={e => handleChange(i, "full", e.target.value)}
              placeholder="Подробное описание (для модалки)"
              rows={3}
            />
            <select
              className="w-full border p-2 rounded"
              value={service.icon}
              onChange={e => handleChange(i, "icon", e.target.value)}
            >
              {ICON_NAMES.map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName}
                </option>
              ))}
            </select>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              Превью иконки: {Icon && <Icon className="inline-block w-5 h-5" />} ({service.icon})
            </div>


            <div>
              <div className="font-semibold text-gray-800 mb-1">Особенности:</div>
              {(service.features || []).map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={e => updateArrayItem(i, "features", idx, e.target.value)}
                    className="flex-grow border rounded p-2"
                  />
                  <button className="text-red-600" onClick={() => removeArrayItem(i, "features", idx)}>×</button>
                </div>
              ))}
              <button
                className="text-blue-600 hover:underline text-sm"
                onClick={() => addArrayItem(i, "features")}
              >
                + Добавить особенность
              </button>
            </div>

            <div>
              <div className="font-semibold text-gray-800 mb-1">В услугу входит:</div>
              {(service.included || []).map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={e => updateArrayItem(i, "included", idx, e.target.value)}
                    className="flex-grow border rounded p-2"
                  />
                  <button className="text-red-600" onClick={() => removeArrayItem(i, "included", idx)}>×</button>
                </div>
              ))}
              <button
                className="text-blue-600 hover:underline text-sm"
                onClick={() => addArrayItem(i, "included")}
              >
                + Добавить пункт
              </button>
            </div>

            <button className="text-red-600" onClick={() => removeService(i)}>
              Удалить услугу
            </button>
          </div>
        );
      })}

      <div className="flex gap-2">
        <button
          onClick={addService}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          + Добавить услугу
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
        <p
          className={`text-sm ${message.includes("Сохранено") ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
