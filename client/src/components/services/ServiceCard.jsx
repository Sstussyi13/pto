export default function ServiceCard({ title, description, icon: Icon, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      title={title}
      className="group cursor-pointer bg-white border border-gray-200 rounded-xl p-6 shadow-sm 
        hover:shadow-md transform transition-all duration-300 hover:scale-[1.017] focus:outline-none focus:ring-2 focus:ring-blue-200"
    >
      <div className="flex items-start gap-4 mb-4">

        <div
          className="
            w-12 h-12 min-w-12 rounded-full bg-gray-100 border border-gray-200
            flex items-center justify-center shadow-sm
            transition-all duration-300
            group-hover:bg-blue-50 group-hover:shadow-blue-100 group-hover:shadow-md
          "
        >
          <Icon className="w-6 h-6 text-gray-700 group-hover:text-blue-700 transition-colors duration-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-2">{description}</p>
      <span className="inline-block text-xs text-neutral-600 font-medium group-hover:underline">
        Подробнее
      </span>
    </div>
  );
}
