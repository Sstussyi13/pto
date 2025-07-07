export default function PriceTable({ prices }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[600px] border border-gray-200 text-sm text-left">
        <caption className="text-left text-gray-500 p-3 font-medium">
          Актуальные цены на услуги
        </caption>
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border px-4 py-3">Услуга</th>
            <th className="border px-4 py-3">Срок выполнения</th>
            <th className="border px-4 py-3">Стоимость</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {Array.isArray(prices) && prices.length > 0 ? (
            prices.map((item, index) => (
              <tr key={item.id || item.name || index} className="hover:bg-gray-50 transition">
                <td className="border px-4 py-3 whitespace-nowrap font-medium">{item.name}</td>
                <td className="border px-4 py-3 whitespace-nowrap">{item.duration}</td>
                <td className="border px-4 py-3 whitespace-nowrap">{item.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border px-4 py-3 text-center text-gray-500">
                Цены не указаны
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p className="text-sm text-gray-500 mt-3">
        * Цены ориентировочные и могут меняться в зависимости от специфики задания. Уточняйте у менеджера.
      </p>
    </div>
  );
}
