import { useEffect, useState } from "react";
import axios from "axios";

export default function CardsEditor() {
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const endpoint = "/api/content/cards";

  useEffect(() => {
    axios.get(endpoint)
      .then(res => {
        if (Array.isArray(res.data?.value)) {
          setCards(res.data.value);
        } else {
          setCards([]);
        }
      })
      .catch(err => {
        console.error("Ошибка загрузки карточек:", err);
        setCards([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  };

  const addCard = () => {
    setCards([...cards, { label: "", link: "", image: "" }]);
  };

  const removeCard = (index) => {
    const updated = [...cards];
    updated.splice(index, 1);
    setCards(updated);
  };

  const saveCards = async () => {
    setSaving(true);
    setMessage("");
    try {
      await axios.put(endpoint, { value: cards });
      setMessage("Сохранено!");
    } catch (err) {
      console.error("Ошибка сохранения:", err);
      setMessage("Ошибка при сохранении.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="space-y-4">
      {cards.map((card, i) => (
        <div key={i} className="border p-4 rounded bg-white space-y-2">
          <input
            type="text"
            placeholder="Заголовок (label)"
            className="w-full border px-3 py-2 rounded"
            value={card.label}
            onChange={(e) => handleChange(i, "label", e.target.value)}
          />
          <input
            type="text"
            placeholder="Ссылка (link)"
            className="w-full border px-3 py-2 rounded"
            value={card.link}
            onChange={(e) => handleChange(i, "link", e.target.value)}
          />
          <input
            type="text"
            placeholder="URL картинки (image)"
            className="w-full border px-3 py-2 rounded"
            value={card.image}
            onChange={(e) => handleChange(i, "image", e.target.value)}
          />
          <button
            onClick={() => removeCard(i)}
            className="text-red-500 hover:underline"
          >
            Удалить
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <button
          onClick={addCard}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          + Добавить карточку
        </button>
        <button
          onClick={saveCards}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Сохраняю..." : "Сохранить"}
        </button>
      </div>

      {message && (
        <p className={`text-sm ${message.includes("Сохранено") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
