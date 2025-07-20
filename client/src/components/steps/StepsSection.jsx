import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

export default function StepsSection() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    async function fetchSteps() {
      try {
        const res = await fetch("/api/content/steps");
        const raw = await res.json();
        const parsed =
          typeof raw.value === "string" ? JSON.parse(raw.value) : raw.value;
        if (Array.isArray(parsed)) setSteps(parsed);
      } catch (e) {
        setSteps([]);
      }
    }
    fetchSteps();
  }, []);

  if (!steps.length) return null;

  const TITLE_HEIGHT = "52px";

  return (
    <section className="py-16 px-5 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto grid gap-9 md:grid-cols-3 sm:grid-cols-2">
        {steps.map((step, idx) => {
          const Icon = LucideIcons[step.icon] || LucideIcons.FileText;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.07 * idx,
                type: "spring",
                stiffness: 110,
                damping: 22,
              }}
              className="
                relative group flex flex-col
                min-h-[220px] px-7 pt-10 pb-7
                rounded-2xl border border-gray-100
                bg-white shadow
                hover:shadow-lg hover:border-blue-200
                transition-all duration-300
                overflow-visible
                cursor-default
                items-stretch
              "
              style={{
                boxShadow: "0 2px 12px 0 rgba(17,31,62,0.05)",
              }}
            >
              <span
                className="
                  absolute -top-4 right-7 text-xs font-bold text-blue-500 select-none tracking-widest uppercase bg-blue-50 rounded-full px-3 py-1 shadow-sm
                  z-20
                "
              >
                Этап {idx + 1}
              </span>
              <span
                className="
                  absolute -left-6 top-7 sm:left-4 flex items-center justify-center
                  w-11 h-11 rounded-full bg-blue-50 border border-blue-100
                  shadow-sm z-10 group-hover:bg-blue-100 transition-all
                "
                style={{ boxShadow: "0 2px 10px 0 rgba(17,31,62,0.09)" }}
              >
                <Icon className="w-6 h-6 text-blue-600 group-hover:text-blue-900 transition-colors" />
              </span>
              <div className="pl-0 sm:pl-16 flex flex-col h-full">
                <span
                  className="block font-semibold text-gray-900 text-base sm:text-lg mb-2 leading-snug"
                  style={{
                    minHeight: TITLE_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {step.title}
                </span>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
