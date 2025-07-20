import { useEffect, useRef } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export default function FancySelect({ options, value, onChange, placeholder, open, setOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(null);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open, setOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(open ? null : "object_type")}
        className={clsx(
          "w-full flex items-center justify-between border px-4 py-3 rounded-xl text-base bg-white focus:outline-none transition",
          open ? "ring-2 ring-blue-600 border-blue-600 shadow-lg" : "hover:border-blue-400 border-gray-300"
        )}
      >
        <span className={value ? "text-neutral-900" : "text-neutral-400"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={22}
          className={clsx(
            "ml-2 transition-transform duration-500",
            open ? "rotate-180 text-blue-600" : "text-gray-500"
          )}
        />
      </button>
      {open && (
        <div
          className="absolute left-0 z-40 w-full bg-white shadow-xl border mt-2 rounded-xl animate-fade-in-up max-h-64 overflow-y-auto overscroll-contain custom-scroll"
          tabIndex={0}
          data-remove-scroll-bar="false"
          data-lenis-prevent
        >
          <ul>
            {options.map((option, i) => (
              <li
                key={i}
                onClick={() => {
                  onChange(option);
                  setOpen(null);
                }}
                className={clsx(
                  "p-3 px-5 cursor-pointer transition border-b last:border-b-0",
                  option === value
                    ? "bg-blue-50 font-semibold text-blue-900"
                    : "hover:bg-neutral-50"
                )}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
