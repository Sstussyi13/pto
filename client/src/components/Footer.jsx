export default function Footer() {
  return (
    <footer className="bg-zinc-100 border-t border-gray-200 py-10 px-4 sm:px-6 text-center text-sm text-gray-600">
      <div className="max-w-4xl mx-auto space-y-3">
        <p className="text-gray-800 font-semibold">
          © {new Date().getFullYear()} ПТО / ППР — проектирование по всей России
        </p>
        <p>
          Комплексная подготовка ППР, ПОС и технической документации для объектов любой сложности.
        </p>
        <p>
          С нами работают застройщики, генподрядчики и инженерные службы: точно в срок, с гарантией и соблюдением всех норм.
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Сайт не является публичной офертой. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
