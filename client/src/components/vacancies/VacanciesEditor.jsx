import { useState, useEffect } from "react";

export default function VacanciesEditor({ vacancies = [], onSave }) {
  const safeVacancies = Array.isArray(vacancies) ? vacancies : [];

  const [list, setList] = useState(safeVacancies);

  useEffect(() => {
    setList(Array.isArray(vacancies) ? vacancies : []);
  }, [vacancies]);

  const addVacancy = () => {
    setList((prev) => [
      ...prev,
      {
        title: "",
        salary: "",
        experience: "",
        description: "",
        requirements: [],
        more: [],
      },
    ]);
  };

  const updateVacancy = (index, field, value) => {
    setList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const updateArrayField = (index, field, array) => {
    setList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: array };
      return copy;
    });
  };

  const removeVacancy = (index) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const addArrayItem = (index, field) => {
    const arr = list[index]?.[field] || [];
    updateArrayField(index, field, [...arr, ""]);
  };

  const updateArrayItem = (index, field, i, val) => {
    const arr = list[index]?.[field] || [];
    arr[i] = val;
    updateArrayField(index, field, [...arr]);
  };

  const removeArrayItem = (index, field, i) => {
    const arr = list[index]?.[field] || [];
    updateArrayField(index, field, arr.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={addVacancy}
      >
        Добавить вакансию
      </button>

      {list.length === 0 && <p className="text-gray-500 mt-4">Нет вакансий</p>}

      {list.map((vac, idx) => (
        <div key={idx} className="border p-4 rounded space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Вакансия #{idx + 1}</h3>
            <button
              className="text-red-600 hover:underline"
              onClick={() => removeVacancy(idx)}
              title="Удалить вакансию"
            >
              Удалить
            </button>
          </div>

          <input
            type="text"
            placeholder="Название вакансии"
            value={vac?.title || ""}
            onChange={(e) => updateVacancy(idx, "title", e.target.value)}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Зарплата"
            value={vac?.salary || ""}
            onChange={(e) => updateVacancy(idx, "salary", e.target.value)}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Опыт (например, 'от 2 лет')"
            value={vac?.experience || ""}
            onChange={(e) => updateVacancy(idx, "experience", e.target.value)}
            className="w-full border rounded p-2"
          />
          <textarea
            placeholder="Описание"
            value={vac?.description || ""}
            onChange={(e) => updateVacancy(idx, "description", e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />

          <div>
            <label className="font-semibold mb-1 block">Требования</label>
            {(vac.requirements || []).map((req, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => updateArrayItem(idx, "requirements", i, e.target.value)}
                  className="flex-grow border rounded p-2"
                />
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => removeArrayItem(idx, "requirements", i)}
                  title="Удалить"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className="text-blue-600 hover:underline text-sm"
              onClick={() => addArrayItem(idx, "requirements")}
            >
              + Добавить требование
            </button>
          </div>

          <div>
            <label className="font-semibold mb-1 block">Условия</label>
            {(vac.more || []).map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateArrayItem(idx, "more", i, e.target.value)}
                  className="flex-grow border rounded p-2"
                />
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => removeArrayItem(idx, "more", i)}
                  title="Удалить"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className="text-blue-600 hover:underline text-sm"
              onClick={() => addArrayItem(idx, "more")}
            >
              + Добавить условие
            </button>
          </div>

          <hr className="my-4" />
        </div>
      ))}

      <div className="text-right">
        <button
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={() => onSave(list)}
        >
          Сохранить вакансии
        </button>
      </div>
    </div>
  );
}
