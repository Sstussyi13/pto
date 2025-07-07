import { useEffect, useState } from "react";
import axios from "axios";
import StepItem from "./StepItem";

import {
  PhoneCall,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Send,
} from "lucide-react";

const ICONS = {
  PhoneCall,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Send,
};

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

        const formatted = parsed.map((step) => ({
          ...step,
          icon: ICONS[step.icon] || FileText, // подстраховка
        }));

        setSteps(formatted);
      } catch (err) {
        console.error("Ошибка при загрузке steps:", err);
      }
    };

    fetchSteps();
  }, []);

  if (!steps.length) return null;

  return (
    <section className="space-y-8">
      {steps.map((step, index) => (
        <StepItem key={index} step={step} delay={index * 100} />
      ))}
    </section>
  );
}
