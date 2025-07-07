import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { Wrench, FileText, ClipboardList } from "lucide-react";

const ICONS = {
  Wrench,
  FileText,
  ClipboardList,
};

export default function ServiceList({ setModalContent }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/content/services");
        const data = await res.json();

        const parsed = JSON.parse(data?.value);
        if (Array.isArray(parsed)) {
          setServices(parsed);
        } else {
          console.warn("Ожидался массив услуг");
        }
      } catch (err) {
        console.error("Ошибка при загрузке услуг:", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {services.map((item, idx) => {
        const Icon = ICONS[item.icon] || Wrench;
        return (
          <ServiceCard
            key={idx}
            title={item.title}
            description={item.description}
            icon={Icon}
            onClick={() => setModalContent(item)}
          />
        );
      })}
    </div>
  );
}
