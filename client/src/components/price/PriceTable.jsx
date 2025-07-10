export default function PriceTable({ prices }) {
  return (
    <div className="w-full">
      {/* Добавлен контейнер для горизонтального скролла */}
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full table-fixed border border-gray-200 text-sm text-left">
          <caption className="text-left text-gray-500 p-3 font-medium">
            Актуальные цены на услуги
          </caption>

          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="border px-4 py-3 w-1/2">Услуга</th>
              <th className="border px-4 py-3 w-1/4">Срок выполнения</th>
              <th className="border px-4 py-3 w-1/4">Стоимость</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {Array.isArray(prices) && prices.length > 0 ? (
              prices.map((item, index) => (
                <tr
                  key={item.id || item.name || index}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="border px-4 py-3 font-medium break-words">
                    {item.name}
                  </td>
                  <td className="border px-4 py-3">{item.duration}</td>
                  <td className="border px-4 py-3">{item.price}</td>
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
      </div>

      <p className="text-sm text-gray-500 mt-4">
        * Цены ориентировочные и могут меняться в зависимости от задания.
      </p>
    </div>
  );
}
