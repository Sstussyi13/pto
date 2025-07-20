import { Fragment, useRef, useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import FancySelect from "./FancySelect";
import OutlinedCheckbox from "./OutlinedCheckbox";
import CalculatorResultBlock from "./CalculatorResultBlock";
import AnimatedNumber from "./AnimatedNumber"; 

const MIN_ESTIMATE_VALUE = 50000;
const MAX_ESTIMATE_VALUE = 10000000000; 
const MIN_AREA = 10;
const MAX_AREA = 50000;

export default function CalculatorFormFields({
  objectType, setObjectType,
  objectArea, setObjectArea,
  estimateValue, setEstimateValue,
  openedSelect, setOpenedSelect,
  chosenSections, setChosenSections,
  chosenSubsections, setChosenSubsections,
  SECTIONS, OBJECT_TYPES,
  onClickSend,
}) {
  const scrollContainerRef = useRef(null);
  const [estimateError, setEstimateError] = useState(null);
  const [areaError, setAreaError] = useState(null);

  function formatNum(val) {
    if (!val) return "";
    return val
      .toString()
      .replace(/\s/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function handleEstimateChange(e) {
    let val = e.target.value.replace(/\s/g, "");
    if (val.length > 1 && val.startsWith("0")) return;

    if (/^\d*$/.test(val)) {
      const numVal = Number(val);
      if (numVal === 0) {
        setEstimateError(null);
      } else if (numVal < MIN_ESTIMATE_VALUE) {
        setEstimateError(`Минимальная сметная стоимость — ${MIN_ESTIMATE_VALUE.toLocaleString('ru-RU')} ₽`);
      } else if (numVal > MAX_ESTIMATE_VALUE) {
        setEstimateError(`Сумма не может быть больше ${MAX_ESTIMATE_VALUE.toLocaleString('ru-RU')} ₽`);
      } else {
        setEstimateError(null);
      }
      setEstimateValue(formatNum(val));
    }
  }

  function handleAreaChange(e) {
    let val = e.target.value.replace(/\s/g, "");
    if (val.length > 1 && val.startsWith("0")) return;

    if (/^\d*$/.test(val)) {
      const numVal = Number(val);
      if (numVal === 0) {
        setAreaError(null);
      } else if (numVal < MIN_AREA) {
        setAreaError(`Минимальная площадь — ${MIN_AREA} м²`);
      } else if (numVal > MAX_AREA) {
        setAreaError(`Максимальная площадь — ${MAX_AREA} м²`);
      } else {
        setAreaError(null);
      }
      setObjectArea(formatNum(val));
    }
  }


  const handleSectionToggle = (key) => {
    setChosenSections(prev => {
      if (prev.includes(key)) {
        setChosenSubsections(prevSubs => {
          const newSubs = { ...prevSubs };
          delete newSubs[key];
          return newSubs;
        });
        return prev.filter(k => k !== key);
      } else {
        const section = SECTIONS.find(s => s.key === key);
        if (section?.children?.length) {
          setChosenSubsections(prevSubs => ({
            ...prevSubs,
            [key]: [section.children[0].key],
          }));
        }
        return [...prev, key];
      }
    });
  };


  const handleSubsectionToggle = (parentKey, subKey) => {
    setChosenSubsections(prev => ({
      ...prev,
      [parentKey]: prev[parentKey]?.includes(subKey)
        ? prev[parentKey].filter(k => k !== subKey)
        : [...(prev[parentKey] || []), subKey],
    }));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    function onWheel(e) {
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight === el.scrollHeight;
      if (
        (e.deltaY < 0 && atTop) ||
        (e.deltaY > 0 && atBottom)
      ) {
        return;
      }
      e.stopPropagation();
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const numericEstimate = Number(estimateValue.replace(/\s/g, '')) || 0;
  const numericArea = Number(objectArea.replace(/\s/g, '')) || 0;

  const isEstimateValid = numericEstimate >= MIN_ESTIMATE_VALUE && numericEstimate <= MAX_ESTIMATE_VALUE;
  const isAreaValid = numericArea >= MIN_AREA && numericArea <= MAX_AREA;

  const isValidInputs = isEstimateValid && isAreaValid;

  const chosenSectionObjects = SECTIONS.filter(section => chosenSections.includes(section.key));


  let totalSum = 0;
  for (const sec of SECTIONS) {
    if (chosenSections.includes(sec.key)) {
      if (sec.children) {
        const selectedSubs = chosenSubsections[sec.key] || [];
        totalSum += selectedSubs.length * (numericEstimate * 0.03);
      } else {
        totalSum += numericEstimate * 0.03;
      }
    }
  }
  totalSum = Math.round(totalSum);

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <label className="font-semibold block mb-2 text-neutral-900">Тип объекта</label>
            <FancySelect
              options={OBJECT_TYPES}
              value={objectType}
              onChange={setObjectType}
              placeholder="Выберите тип объекта"
              open={openedSelect === "object_type"}
              setOpen={setOpenedSelect}
            />
          </div>
          <div>
            <label className="font-semibold block mb-2 text-neutral-900">Площадь объекта, м²</label>
            <input
              type="text"
              inputMode="numeric"
              value={objectArea}
              onChange={handleAreaChange}
              placeholder="Например, 3 500"
              maxLength={8}
              className={clsx(
                "w-full border p-3 rounded-md text-base focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 border-gray-300",
                areaError ? "border-red-500" : ""
              )}
            />
            {areaError && <p className="text-red-600 mt-1 text-sm">{areaError}</p>}
          </div>
          <div>
            <label className="font-semibold block mb-2 text-neutral-900">Сметная стоимость, ₽</label>
            <input
              type="text"
              inputMode="numeric"
              value={estimateValue}
              onChange={handleEstimateChange}
              placeholder="Например, 22 000 000"
              maxLength={15}
              className={clsx(
                "w-full border p-3 rounded-md text-base focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 border-gray-300",
                estimateError ? "border-red-500" : ""
              )}
            />
            {estimateError && <p className="text-red-600 mt-1 text-sm">{estimateError}</p>}
          </div>
        </div>
        <div className="flex-1">
          <label className="font-semibold block mb-2 text-neutral-900">Разделы проектирования</label>
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            className="pr-2 overflow-auto min-h-40 max-h-96 space-y-2"
            style={{ scrollBehavior: "auto" }}
          >
            {SECTIONS.map((section) => (
              <Fragment key={section.key}>
                <OutlinedCheckbox
                  checked={chosenSections.includes(section.key)}
                  onChange={() => handleSectionToggle(section.key)}
                  label={
                    <span className="flex w-full items-center justify-between">
                      <span>{section.label}</span>
                      {section.children && (
                        <ChevronDown
                          size={18}
                          className={clsx(
                            "ml-2 transition-transform duration-500",
                            chosenSections.includes(section.key)
                              ? "rotate-180 text-blue-600"
                              : "text-gray-400"
                          )}
                        />
                      )}
                    </span>
                  }
                />
                {section.children && chosenSections.includes(section.key) && (
                  <div className="pl-6 space-y-1">
                    {section.children.map((sub) => (
                      <OutlinedCheckbox
                        key={sub.key}
                        checked={chosenSubsections[section.key]?.includes(sub.key) || false}
                        onChange={() => handleSubsectionToggle(section.key, sub.key)}
                        label={sub.label}
                        className="bg-neutral-50"
                      />
                    ))}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <CalculatorResultBlock
        allSections={chosenSectionObjects}
        contractSum={numericEstimate}
        animatedSum={totalSum}
        onClickSend={onClickSend}
        isValid={isValidInputs}
      />
    </>
  );
}
