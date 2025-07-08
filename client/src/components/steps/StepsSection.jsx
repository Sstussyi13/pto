import { useEffect, useState } from "react";
import axios from "axios";
import * as LucideIcons from "lucide-react";


export default function StepsSection() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await axios.get("/api/content/steps");
        const raw = res.data?.value;
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

        if (!Array.isArray(parsed)) {
          console.warn("steps: ожидается массив, получено:", parsed);
          return;
        }

        setSteps(parsed);
      } catch (err) {
        console.error("Ошибка при загрузке steps:", err);
      }
    };

    fetchSteps();
  }, []);

  if (!steps.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => {
        const Icon = LucideIcons[step.icon] || LucideIcons.FileText;
        return (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition group h-full flex flex-col"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-700" />
              </div>
            </div>

            <h3 className="text-base font-semibold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
