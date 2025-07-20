import { useState, useEffect } from "react";
import axios from "axios";
import CalculatorFormFields from "./CalculatorFormFields";
import CalculatorModal from "./CalculatorModal";

export default function CalculatorForm() {
  const [SECTIONS, setSECTIONS] = useState([]);
  const [OBJECT_TYPES, setOBJECT_TYPES] = useState([]);
  const [objectType, setObjectType] = useState("");
  const [objectArea, setObjectArea] = useState("");
  const [estimateValue, setEstimateValue] = useState("");
  const [openedSelect, setOpenedSelect] = useState(null);
  const [chosenSections, setChosenSections] = useState([]);
  const [chosenSubsections, setChosenSubsections] = useState({});
  const [error, setError] = useState("");
  const [showRequest, setShowRequest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("calculatorData");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setObjectType(data.objectType || "");
        setObjectArea(data.objectArea || "");
        setEstimateValue(data.estimateValue || "");
        setChosenSections(Array.isArray(data.chosenSections) ? data.chosenSections : []);
        setChosenSubsections(typeof data.chosenSubsections === "object" ? data.chosenSubsections : {});
      } catch {}
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "calculatorData",
      JSON.stringify({
        objectType,
        objectArea,
        estimateValue,
        chosenSections,
        chosenSubsections,
      })
    );
  }, [objectType, objectArea, estimateValue, chosenSections, chosenSubsections]);

  useEffect(() => {
    function handleBeforeUnload() {
      sessionStorage.removeItem("calculatorData");
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [secRes, objRes] = await Promise.all([
          axios.get("/api/content/calculator_sections"),
          axios.get("/api/content/calculator_object_types"),
        ]);
        setSECTIONS(secRes.data.value || []);
        setOBJECT_TYPES(objRes.data.value || []);
      } catch (e) {
        setError("Ошибка загрузки данных калькулятора");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function getAllSelectedSections() {
    let result = [];
    for (const sec of SECTIONS) {
      if (chosenSections.includes(sec.key)) {
        if (sec.children) {
          const selectedSubs = chosenSubsections[sec.key];
          if (selectedSubs?.length) {
            result = result.concat(
              sec.children.filter(s => selectedSubs.includes(s.key)).map(s => s.label)
            );
          }
        } else {
          result.push(sec.label);
        }
      }
    }
    return result;
  }

  const contractSum = parseFloat(estimateValue.replace(/\s/g, "").replace(",", ".")) || 0;

 
  const countSelected = () => {
    let total = 0;
    for (const sec of SECTIONS) {
      if (chosenSections.includes(sec.key)) {
        if (sec.children) {
          const selectedSubs = chosenSubsections[sec.key] || [];
          total += selectedSubs.length * (contractSum * 0.03);
        } else {
          total += contractSum * 0.03;
        }
      }
    }
    return isNaN(total) ? 0 : Math.round(total);
  };

  const readyToShow = objectType && objectArea && estimateValue && !!getAllSelectedSections().length;

  useEffect(() => {
    setError("");
  }, [objectType, objectArea, estimateValue, chosenSections, chosenSubsections]);

  function handleSendRequest() {
    setShowRequest(true);
  }
  function handleRequestSuccess() {
    setShowRequest(false);
    sessionStorage.removeItem("calculatorData");
  }

  if (loading) return <div className="p-6 text-center text-gray-500">Загрузка калькулятора...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <>
      <form
        className="bg-white rounded-2xl shadow-xl border-0 max-w-3xl mx-auto my-6 p-6 flex flex-col gap-8"
        autoComplete="off"
        onSubmit={e => e.preventDefault()}
      >
        <CalculatorFormFields
          objectType={objectType}
          setObjectType={setObjectType}
          objectArea={objectArea}
          setObjectArea={setObjectArea}
          estimateValue={estimateValue}
          setEstimateValue={setEstimateValue}
          openedSelect={openedSelect}
          setOpenedSelect={setOpenedSelect}
          chosenSections={chosenSections}
          setChosenSections={setChosenSections}
          chosenSubsections={chosenSubsections}
          setChosenSubsections={setChosenSubsections}
          SECTIONS={SECTIONS}
          OBJECT_TYPES={OBJECT_TYPES}
          onClickSend={handleSendRequest}
        />
      </form>

      {readyToShow && showRequest && (
        <CalculatorModal
          onClose={() => setShowRequest(false)}
          initialData={{
            full_name: "",
            phone: "",
            email: "",
            message: "",
            objectType,
            objectArea,
            estimateValue,
            sections: getAllSelectedSections(),
            estimatedPrice: countSelected(),
          }}
          onSuccess={handleRequestSuccess}
        />
      )}
    </>
  );
}
