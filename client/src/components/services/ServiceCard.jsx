export default function ServiceCard({ title, description, icon: Icon, onClick }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      title={title}
      className="group cursor-pointer bg-white border border-gray-200 rounded-xl p-6 shadow-sm 
                 hover:shadow-md transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="flex items-start gap-4 mb-4">
        {Icon && (
          <div className="bg-gray-100 rounded-lg p-2 w-10 h-10 flex items-center justify-center transition group-hover:bg-blue-50">
            <Icon className="w-5 h-5 text-black group-hover:text-blue-600 transition-colors duration-200" />
          </div>
        )}
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h3>
        )}
      </div>

      {description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
      )}

      <span className="inline-block text-sm text-blue-600 font-medium group-hover:underline">
        Подробнее 
      </span>
    </div>
  );
}
