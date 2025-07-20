export default function StepItem({ step, delay }) {
  const Icon = step.icon;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className="flex items-start gap-4"
      role="listitem"
    >

      <div className="w-12 h-12 min-w-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shadow-sm">
        {Icon && <Icon className="w-5 h-5 text-gray-700" />}
      </div>


      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}
