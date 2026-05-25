import { useNavigate } from "react-router-dom";

function ProductTable({ products }) {
  const getScoreColor = (score) => {
    if (score >= 80) {
      return "bg-green-100 text-green-700";
    }

    if (score >= 50) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  const navigate = useNavigate();

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
        <div className="overflow-x-auto">
      <table className="w-full">
        <thead
          className="
            bg-[#F5F7F4]
            border-b
            border-gray-100
          "
        >
          <tr>
            <th
              className="
                text-left
                px-6
                py-5
                text-sm
                font-semibold
                text-gray-600
              "
            >
              Product
            </th>

            <th
              className="
                text-left
                px-6
                py-5
                text-sm
                font-semibold
                text-gray-600
              "
            >
              Category
            </th>

            <th
              className="
                text-left
                px-6
                py-5
                text-sm
                font-semibold
                text-gray-600
              "
            >
              Price
            </th>

            <th
              className="
                text-left
                px-6
                py-5
                text-sm
                font-semibold
                text-gray-600
              "
            >
              Quality
            </th>

            <th
              className="
                text-left
                px-6
                py-5
                text-sm
                font-semibold
                text-gray-600
              "
            >
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="
                  border-b
                  border-gray-50
                  hover:bg-gray-50
                  transition
                  cursor-pointer
                "
              onClick={() => navigate(`/products/${product.skuId}`)}
            >
              <td className="px-6 py-5">
                <div>
                  <h3
                    className="
                        font-semibold
                        text-gray-900
                      "
                  >
                    {product.productTitle}
                  </h3>

                  <p
                    className="
                        text-sm
                        text-gray-500
                        mt-1
                      "
                  >
                    SKU: {product.skuId}
                  </p>
                </div>
              </td>

              <td
                className="
                    px-6
                    py-5
                    text-gray-600
                  "
              >
                {product.category}
              </td>

              <td
                className="
                    px-6
                    py-5
                    font-semibold
                  "
              >
                ₹{product.price}
              </td>

              <td className="px-6 py-5">
                <span
                  className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                      ${getScoreColor(product.listingQualityScore || 0)}
                    `}
                >
                  {product.listingQualityScore || 0}%
                </span>
              </td>

              <td className="px-6 py-5">
                <span
                  className="
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-medium
                      bg-[#E8F6E1]
                      text-[#39542C]
                    "
                >
                  {product.validationStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ProductTable;
