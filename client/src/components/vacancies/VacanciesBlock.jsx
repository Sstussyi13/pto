import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import axios from "axios";
import VacancyModal from "./VacancyModal";

export default function VacanciesBlock() {
  const [vacancies, setVacancies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVacancies() {
      try {
        const res = await axios.get("/api/content/vacancies");
        const data = res.data;
        let list = [];
        if (data) {
          if (typeof data.value === "string") {
            try {
              const parsed = JSON.parse(data.value);
              list = Array.isArray(parsed) ? parsed : [];
            } catch {
              list = [];
            }
          } else if (Array.isArray(data.value)) {
            list = data.value;
          } else if (Array.isArray(data)) {
            list = data;
          } else {
            list = [];
          }
        }
        setVacancies(list);
      } catch (e) {
        setError("Ошибка загрузки вакансий");
      } finally {
        setLoading(false);
      }
    }
    fetchVacancies();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Загрузка вакансий...</div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-600">{error}</div>
    );

  return (
    <section className="mt-24 max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="180">
      <h2 className="text-2xl sm:text-3xl font-bold mb-7 text-[#193a6a] flex items-center gap-3">
        Актуальные вакансии
      </h2>
      <div className="grid gap-7 md:grid-cols-2">
        {vacancies.length ? (
          vacancies.map((vac, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-200"
            >
              <div>
                <div className="flex items-start sm:items-center gap-2 mb-2">
                  <span
                    className="
                      font-bold text-gray-900 tracking-tight
                      flex-1 min-w-0 break-words truncate sm:text-base text-sm
                    "
                    style={{
                      lineHeight: '1.25rem',
                      wordBreak: 'break-word',
                    }}
                  >
                    {vac.title}
                  </span>
                  <span
                    className="
                      hidden sm:inline-block
                      text-2xl font-[650] text-[#193a6a] leading-none
                      whitespace-nowrap tracking-tight font-mono flex-shrink-0 text-right
                      max-w-[140px]
                    "
                    style={{
                      background: "linear-gradient(90deg, #193a6a, #3d5af1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontVariantNumeric: "tabular-nums"
                    }}
                  >
                    {vac.salary}
                  </span>
                </div>
                <span
                  className="
                    sm:hidden block
                    text-2xl font-[650] text-[#193a6a] leading-none
                    whitespace-nowrap tracking-tight font-mono mt-0.5 mb-2
                  "
                  style={{
                    background: "linear-gradient(90deg, #193a6a, #3d5af1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontVariantNumeric: "tabular-nums"
                  }}
                >
                  {vac.salary}
                </span>

                <div className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Опыт: {vac.experience}
                </div>
                <div className="mb-3 text-gray-800 text-sm sm:text-base leading-relaxed">
                  {vac.description}
                </div>
                <ul className="text-gray-600 text-xs sm:text-sm pl-5 mb-3 list-disc space-y-1">
                  {(vac.requirements || []).map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
              <button
                className="
                  mt-5 flex items-center justify-center
                  bg-[#193a6a] text-white px-7 py-3 rounded-full
                  font-semibold text-base shadow-lg
                  hover:bg-[#10244a] hover:scale-105 active:scale-95
                  transition-all duration-200 text-center
                  focus:outline-none focus:ring-2 focus:ring-[#193a6a] focus:ring-offset-2
                  select-none
                  relative
                "
                style={{
                  letterSpacing: "0.01em",
                  minHeight: "44px",
                  minWidth: "150px",
                }}
                onClick={() => setSelected(idx)}
              >
                <Mail className="w-5 h-5 mr-2 -mt-1" />
                Откликнуться
              </button>
            </div>
          ))
        ) : (
          <p>Вакансии не найдены.</p>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-10 text-center">
        Не нашли подходящую вакансию? Просто напишите нам на&nbsp;
        <a
          href="mailto:inf0.pto.ppr@yandex.com"
          className="text-[#193a6a] hover:text-[#10244a] font-medium transition"
          style={{ textDecoration: "none" }}
        >
          inf0.pto.ppr@yandex.com
        </a>
      </div>
      <VacancyModal
        open={selected !== null}
        vacancy={vacancies[selected]}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
