import { useEffect, useState } from "react";
import axios from "axios";


export default function CalculatorRefsEditor() {
  const [objectTypes, setObjectTypes] = useState([]);
  const [sections, setSections] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    axios.get("/api/content/all").then((res) => {
      let objectTypesArr = [];
      let sectionsArr = [];
      res.data.forEach((item) => {
        if (item.key === "object_types") {
          try { objectTypesArr = JSON.parse(item.value); } catch { objectTypesArr = []; }
        }
        if (item.key === "sections") {
          try { sectionsArr = JSON.parse(item.value); } catch { sectionsArr = []; }
        }
      });
      setObjectTypes(objectTypesArr || []);
      setSections(sectionsArr || []);
    });
  }, []);

  const handleObjectTypeChange = (i, value) => {
    const updated = [...objectTypes];
    updated[i] = value;
    setObjectTypes(updated);
  };
  const addObjectType = () => setObjectTypes([...objectTypes, ""]);
  const removeObjectType = (i) => setObjectTypes(objectTypes.filter((_, idx) => idx !== i));


  const handleSectionChange = (i, field, value) => {
    const updated = [...sections];
    updated[i][field] = value;
    setSections(updated);
  };
  const addSection = () => setSections([...sections, { key: "", label: "", children: [] }]);
  const removeSection = (i) => setSections(sections.filter((_, idx) => idx !== i));


  const handleSubChange = (sectionIdx, subIdx, field, value) => {
    const updated = [...sections];
    if (!updated[sectionIdx].children) updated[sectionIdx].children = [];
    updated[sectionIdx].children[subIdx][field] = value;
    setSections(updated);
  };
  const addSubsection = (sectionIdx) => {
    const updated = [...sections];
    if (!updated[sectionIdx].children) updated[sectionIdx].children = [];
    updated[sectionIdx].children.push({ key: "", label: "" });
    setSections(updated);
  };
  const removeSubsection = (sectionIdx, subIdx) => {
    const updated = [...sections];
    updated[sectionIdx].children.splice(subIdx, 1);
    setSections(updated);
  };


  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      await axios.put("/api/content/object_types", { value: JSON.stringify(objectTypes) });
      await axios.put("/api/content/sections", { value: JSON.stringify(sections) });
      setMessage("✅ Справочники успешно сохранены!");
    } catch (err) {
      setMessage("❌ Ошибка при сохранении.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10 p-6 bg-white rounded-xl shadow-xl border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900">Редактирование калькулятора</h2>


      <div>
        <h3 className="text-lg font-medium mb-2">Типы объектов</h3>
        <div className="space-y-2">
          {objectTypes.map((type, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="border border-gray-300 p-2 rounded-md w-full text-sm"
                value={type}
                onChange={e => handleObjectTypeChange(i, e.target.value)}
                placeholder="Тип объекта"
              />
              <button onClick={() => removeObjectType(i)} type="button" className="text-red-500 text-sm">Удалить</button>
            </div>
          ))}
        </div>
        <button onClick={addObjectType} type="button" className="mt-2 text-blue-600 text-sm hover:underline">
          + Добавить тип объекта
        </button>
      </div>


      <div>
        <h3 className="text-lg font-medium mb-2">Разделы проектирования</h3>
        {sections.map((section, i) => (
          <div key={i} className="border rounded-lg p-4 mb-4 bg-gray-50">
            <div className="flex gap-2 mb-2">
              <input
                className="border border-gray-300 p-2 rounded-md text-sm w-32"
                value={section.key}
                onChange={e => handleSectionChange(i, "key", e.target.value)}
                placeholder="key (например, kr)"
              />
              <input
                className="border border-gray-300 p-2 rounded-md text-sm flex-1"
                value={section.label}
                onChange={e => handleSectionChange(i, "label", e.target.value)}
                placeholder="Название раздела"
              />
              <button onClick={() => removeSection(i)} type="button" className="text-red-500 text-sm">Удалить</button>
            </div>

            <div className="ml-8">
              <div className="font-semibold text-xs text-gray-600 mb-1">Подразделы:</div>
              {(section.children || []).map((sub, j) => (
                <div key={j} className="flex gap-2 mb-1">
                  <input
                    className="border border-gray-300 p-2 rounded-md text-sm w-32"
                    value={sub.key}
                    onChange={e => handleSubChange(i, j, "key", e.target.value)}
                    placeholder="key (например, el)"
                  />
                  <input
                    className="border border-gray-300 p-2 rounded-md text-sm flex-1"
                    value={sub.label}
                    onChange={e => handleSubChange(i, j, "label", e.target.value)}
                    placeholder="Название подраздела"
                  />
                  <button onClick={() => removeSubsection(i, j)} type="button" className="text-red-500 text-xs">Удалить</button>
                </div>
              ))}
              <button onClick={() => addSubsection(i)} type="button" className="text-blue-600 text-xs mt-2 hover:underline">
                + Добавить подраздел
              </button>
            </div>
          </div>
        ))}
        <button onClick={addSection} type="button" className="text-blue-600 text-sm hover:underline">
          + Добавить раздел
        </button>
      </div>

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
