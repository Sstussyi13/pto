import clsx from "clsx";

export default function OutlinedCheckbox({ checked, onChange, label, className }) {
  return (
    <label
      className={clsx(
        "flex items-center gap-3 px-3 py-2 rounded-xl border transition-colors cursor-pointer select-none shadow-sm",
        checked
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300 hover:border-blue-300 bg-white",
        className
      )}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange();
        }
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        tabIndex={-1}
      />
      <span className={clsx(
        "inline-flex w-5 h-5 border-2 rounded-md justify-center items-center transition-colors shrink-0",
        checked
          ? "border-blue-600 bg-blue-600"
          : "border-gray-300 bg-white"
      )}>
        {checked && (
          <svg width="15" height="15" className="text-white" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        )}
      </span>
      <span className="font-medium text-neutral-900">{label}</span>
    </label>
  );
}
