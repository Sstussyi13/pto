export default function PriceTable({ prices }) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-2">
        <table
          className="
            min-w-[640px] w-full border-separate border-spacing-0
            rounded-2xl shadow-md bg-white
            text-sm sm:text-base
            "
          style={{ borderCollapse: "separate" }}
        >
          <caption className="text-left text-gray-500 p-4 font-semibold text-base">
            Актуальные цены на услуги
          </caption>
          <thead>
            <tr>
              <th className="bg-blue-50 text-[#193a6a] font-bold px-6 py-3 rounded-tl-2xl border-b border-gray-200 text-left">
                Услуга
              </th>
              <th className="bg-blue-50 text-[#193a6a] font-bold px-6 py-3 border-b border-gray-200 text-left">
                Срок выполнения
              </th>
              <th className="bg-blue-50 text-[#193a6a] font-bold px-6 py-3 rounded-tr-2xl border-b border-gray-200 text-left">
                Стоимость
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(prices) && prices.length > 0 ? (
              prices.map((item, index) => (
                <tr
                  key={item.id || item.name || index}
                  className={`
                    ${index % 2 === 1 ? "bg-blue-50/50" : "bg-white"}
                    hover:bg-blue-100/60
                    transition
                  `}
                >
                  <td className="px-6 py-4 border-b border-gray-100 font-medium break-words">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-100 whitespace-nowrap">
                    {item.duration}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-100 whitespace-nowrap font-semibold text-[#193a6a]">
                    {item.price}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  Цены не указаны
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
        * Цены ориентировочные и могут меняться в зависимости от задания.
      </p>
    </div>
  );
}
