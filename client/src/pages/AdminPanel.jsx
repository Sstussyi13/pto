import { useEffect, useState } from "react";
import axios from "axios";

import CardsEditor from "../components/CardsEditor";
import ServiceEditor from "../components/services/ServiceEditor";
import StepEditor from "../components/steps/StepEditor";
import RequestFormEditor from "../components/request/RequestFormEditor";
import PriceEditor from "../components/price/PriceEditor";
import VacanciesEditor from "../components/vacancies/VacanciesEditor"; 

const SECTIONS = [
  { key: "cards", label: "Карточки" },
  { key: "request_form", label: "Форма заявки" },
  { key: "services", label: "Услуги" },
  { key: "steps", label: "Этапы" },
  { key: "price_table", label: "Цены" },
  { key: "vacancies", label: "Вакансии" }, 
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("cards");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadContent = async () => {
    try {
      const res = await axios.get("/api/content/all");
      const entries = {};
      res.data.forEach((item) => {
        if (typeof item.value === "string") {
          try {
            entries[item.key] = JSON.parse(item.value);
          } catch {
            entries[item.key] = item.value;
          }
        } else {
          entries[item.key] = item.value;
        }
      });
      setData(entries);
    } catch (err) {
      console.error("Ошибка загрузки контента:", err);
      setError("Не удалось загрузить данные");
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (key, value) => {
    try {
      await axios.put(`/api/content/${key}`, { value: JSON.stringify(value) });
      setData((prev) => ({ ...prev, [key]: value }));
    } catch (err) {
      console.error(`Ошибка сохранения ${key}:`, err);
      alert(`Ошибка сохранения ${key}`);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>

      <div className="flex space-x-2 border-b mb-4">
        {SECTIONS.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveTab(section.key)}
            className={`px-4 py-2 border-b-2 ${
              activeTab === section.key
                ? "border-blue-500 font-semibold"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {activeTab === "cards" && <CardsEditor />}
      {activeTab === "services" && <ServiceEditor />}
      {activeTab === "request_form" && <RequestFormEditor />}
      {activeTab === "steps" && (
        <StepEditor steps={data["steps"] || []} onSave={(value) => saveContent("steps", value)} />
      )}
      {activeTab === "price_table" && (
        <PriceEditor prices={data["price_table"] || []} onSave={(value) => saveContent("price_table", value)} />
      )}
      {activeTab === "vacancies" && (
        <VacanciesEditor vacancies={data["vacancies"] || []} onSave={(value) => saveContent("vacancies", value)} />
      )}
    </div>
  );
}
