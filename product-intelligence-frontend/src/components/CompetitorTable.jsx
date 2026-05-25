function CompetitorTable({
  competitors,
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        shadow-sm
        overflow-hidden
      "
    >
      <table className="w-full">
        <thead
          className="
            bg-[#F5F7F4]
          "
        >
          <tr>
            <th
              className="
                text-left
                px-6
                py-4
              "
            >
              Platform
            </th>

            <th
              className="
                text-left
                px-6
                py-4
              "
            >
              Price
            </th>

            <th
              className="
                text-left
                px-6
                py-4
              "
            >
              URL
            </th>
          </tr>
        </thead>

        <tbody>
          {competitors.map(
            (
              item
            ) => (
              <tr
                key={item.id}
                className="
                  border-t
                  border-gray-100
                "
              >
                <td className="px-6 py-4">
                  {
                    item.platform
                  }
                </td>

                <td className="px-6 py-4">
                  ₹
                  {
                    item.price
                  }
                </td>

                <td className="px-6 py-4">
                  <a
                    href={
                      item.productUrl
                    }
                    target="_blank"
                    className="
                      text-[#4CBB17]
                    "
                  >
                    View
                  </a>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CompetitorTable;