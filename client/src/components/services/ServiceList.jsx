import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ServiceList({ setModalContent }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/api/content/services").then(res => {
      let parsed = [];
      if (res.data) {
        if (typeof res.data.value === "string") {
          try { parsed = JSON.parse(res.data.value); } catch { parsed = []; }
        } else if (Array.isArray(res.data.value)) {
          parsed = res.data.value;
        } else if (Array.isArray(res.data)) {
          parsed = res.data;
        }
      }
      setServices(Array.isArray(parsed) ? parsed : []);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto w-full bg-white rounded-2xl shadow border border-gray-100 divide-y divide-gray-100">
      {services.map((item, idx) => {
        const Icon = Icons[item.icon] || Icons.Wrench;
        return (
          <motion.button
            key={idx}
            onClick={() => setModalContent(item)}
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.07 * idx, duration: 0.45, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className={`
              group w-full flex items-center gap-6 px-8 py-7 bg-transparent
              hover:bg-blue-50 transition-all duration-200 text-left focus:outline-none
            `}
            style={{ border: "none" }}
          >
            <span className="
              flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 border border-blue-100
              shadow group-hover:bg-blue-100 transition-all shrink-0
            ">
              <Icon className="w-7 h-7 text-blue-600 group-hover:text-blue-700 transition-colors" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-lg font-semibold text-gray-900 mb-1">{item.title}</div>
              {item.description && (
                <div className="text-base text-gray-600 truncate">{item.description}</div>
              )}
            </div>
            <span className="flex-shrink-0 ml-4 group-hover:translate-x-1 transition">
              <Icons.ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
