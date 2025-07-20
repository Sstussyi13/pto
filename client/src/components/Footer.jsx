export default function Footer() {
  return (
    <footer className="bg-[#f6f8fa] border-t border-blue-100 py-6 px-4 sm:px-6 text-center text-sm">
      <div className="max-w-4xl mx-auto space-y-2">
        <p className="text-[#193a6a] font-bold tracking-wide text-base mb-0">
          © {new Date().getFullYear()} ПТО / ППР — проектирование по всей России
        </p>
        <div className="space-y-1">
          <p className="text-gray-700 leading-snug">
            Комплексная подготовка ППР, ПОС и&nbsp;технической документации для объектов любой сложности.
          </p>
          <p className="text-gray-500 leading-snug">
            С нами работают&nbsp;застройщики, генподрядчики и инженерные службы: точно в срок, с гарантией и соблюдением всех норм.
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Сайт не является публичной офертой. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
