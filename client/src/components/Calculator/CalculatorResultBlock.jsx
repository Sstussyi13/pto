import { useRef, useEffect, useMemo } from "react";
import AnimatedNumber from "./AnimatedNumber";

export default function CalculatorResultBlock({
  allSections, 
  contractSum,
  animatedSum,
  onClickSend,
  isValid = true,
}) {
  const costPerSection = useMemo(
    () => Math.round(contractSum * 0.03),
    [contractSum]
  );
  const totalSum = useMemo(
    () => costPerSection * allSections.length,
    [costPerSection, allSections]
  );

  const listRef = useRef(null);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    function onWheel(e) {
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight === el.scrollHeight;
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        return;
      }
      e.stopPropagation();
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-2">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-300 flex flex-col items-center overflow-hidden">
        <h3 className="text-xl font-semibold mb-5 text-gray-900 text-center tracking-tight">
          Предварительный расчет стоимости
        </h3>

        <div
          className="
            flex items-baseline gap-1 mb-6 select-none w-full justify-center
            break-words
          "
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {isValid ? (
            <AnimatedNumber
              value={animatedSum ?? totalSum}
              className="
                font-extrabold 
                text-[2.2rem] xs:text-[2.8rem] sm:text-[3.5rem]
                leading-none text-gray-900 
                block text-center w-full 
                break-words
              "
              format={n => n.toLocaleString("ru-RU")}
              style={{
                wordBreak: "break-all",
                lineHeight: 1.05,
                maxWidth: "100%",
              }}
            />
          ) : (
            <span
              className="font-extrabold text-[3.5rem] leading-none text-gray-900"
              style={{
                display: "inline-block",
                width: "1.2ch",
                textAlign: "center",
                userSelect: "none",
              }}
            >
              –
            </span>
          )}
          <span className="text-xl xs:text-2xl font-semibold text-gray-600 pb-1 pl-2">
            ₽
          </span>
        </div>

        {isValid && (
          <div className="w-full mb-4">
            <div className="text-gray-700 text-xs xs:text-sm mb-1 font-semibold text-center">
              Выбранные разделы и стоимость каждого:
            </div>
            <ul
              ref={listRef}
              className="
                text-gray-700 text-xs xs:text-sm w-full max-h-40 overflow-auto 
                list-none px-0 custom-scroll
              "
              style={{ scrollBehavior: "auto" }}
            >
              {allSections.map(({ key, label }) => (
                <li
                  key={key}
                  className="flex justify-between py-0.5 border-b border-gray-100"
                >
                  <span>{label}</span>
                  <span className="font-semibold">
                    {costPerSection.toLocaleString("ru-RU")} ₽
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isValid && (
          <div className="text-red-600 mb-6 text-center">
            Расчет невозможен: проверьте корректность площади и стоимости
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 text-gray-700 rounded-lg px-5 py-3 w-full text-center text-xs xs:text-sm mb-6">
          Это ориентировочная стоимость на основе выбранных параметров.
          Точная сумма будет рассчитана после обсуждения деталей проекта.
        </div>

        <button
          type="button"
          onClick={() => {
            if (isValid && onClickSend) {
              onClickSend();
            }
          }}
          className="
            w-full py-3 rounded-lg bg-[#193a6a] text-white font-semibold border border-[#193a6a]
            transition hover:bg-[#10244a] shadow-md text-base
          "
        >
          Оставить заявку
        </button>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .text-[3.5rem] { font-size: 2.2rem !important }
        }
        .custom-scroll::-webkit-scrollbar { width: 7px; background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scroll:hover::-webkit-scrollbar-thumb { background: #cbd5e1; }
      `}</style>
    </div>
  );
}
