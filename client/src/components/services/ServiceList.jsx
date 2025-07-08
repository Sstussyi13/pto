import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import ServiceCard from "./ServiceCard";

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
        const Icon = Icons[item.icon] || Icons.Wrench;

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
