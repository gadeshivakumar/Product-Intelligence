import {
  useEffect,
  useState,
} from "react";

import {
  RefreshCcw,
} from "lucide-react";

import api from "../api/api";

import PricingCard from "../components/PricingCard";

import PricingChart from "../components/PricingChart";

function Pricing() {
  const [
    pricingData,
    setPricingData,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const fetchPricing =
    async () => {
      try {

        const response =
          await api.get(
            "/products"
          );

        const products =
          response.data.data
            .products || [];

        const transformed =
          products
            .slice(0, 6)
            .map(
              (
                product
              ) => ({
                name:
                  product.brand,

                ourPrice:
                  product.price,

                competitorPrice:
                  Math.floor(
                    product.price *
                      (
                        0.85 +
                        Math.random() *
                          0.3
                      )
                  ),
              })
            );

        setPricingData(
          transformed
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPricing();
  }, []);

  const averageDifference =
    pricingData.length > 0
      ? (
          pricingData.reduce(
            (
              acc,
              item
            ) =>
              acc +
              Math.abs(
                item.ourPrice -
                  item.competitorPrice
              ),

            0
          ) /
          pricingData.length
        ).toFixed(0)
      : 0;

  return (
    <div>
      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >
        <div>
          <h1
            className="
              text-4xl
              font-bold
              text-gray-900
            "
          >
            Pricing Intelligence
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Market insights and
            competitor analysis
          </p>
        </div>

        <button
          onClick={
            fetchPricing
          }
          className="
            flex
            items-center
            gap-3
            px-6
            py-3
            rounded-2xl
            bg-[#4CBB17]
            hover:bg-[#48872B]
            text-white
            font-semibold
            transition
          "
        >
          <RefreshCcw
            size={18}
          />

          Refresh
        </button>
      </div>

      <div
        className="
          grid
          grid-cols-3
          gap-6
          mb-8
        "
      >
        <PricingCard
          title="Tracked Products"
          value={
            pricingData.length
          }
          color="text-black"
        />

        <PricingCard
          title="Average Price Gap"
          value={`₹${averageDifference}`}
          color="text-[#4CBB17]"
        />

        <PricingCard
          title="Market Status"
          value="Competitive"
          color="text-[#39542C]"
        />
      </div>

      {loading ? (
        <div
          className="
            flex
            justify-center
            items-center
            h-[70vh]
          "
        >
          <div
            className="
              w-14
              h-14
              border-4
              border-[#4CBB17]
              border-t-transparent
              rounded-full
              animate-spin
            "
          />
        </div>
      ) : (
        <>
          <PricingChart
            data={
              pricingData
            }
          />

          <div
            className="
              grid
              grid-cols-2
              gap-6
              mt-8
            "
          >
            <div
              className="
                bg-white
                rounded-3xl
                p-6
                border
                border-gray-100
                shadow-sm
              "
            >
              <h2
                className="
                  text-2xl
                  font-semibold
                  mb-6
                "
              >
                Pricing Recommendations
              </h2>

              <div className="space-y-4">
                <div
                  className="
                    p-5
                    rounded-2xl
                    bg-[#F5F7F4]
                  "
                >
                  <h3
                    className="
                      font-semibold
                    "
                  >
                    Reduce Premium Gap
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-600
                      mt-2
                    "
                  >
                    Some products exceed
                    competitor pricing by
                    more than 12%
                  </p>
                </div>

                <div
                  className="
                    p-5
                    rounded-2xl
                    bg-[#F5F7F4]
                  "
                >
                  <h3
                    className="
                      font-semibold
                    "
                  >
                    Competitive Position
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-600
                      mt-2
                    "
                  >
                    Overall pricing remains
                    aligned with market
                    standards
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                bg-white
                rounded-3xl
                p-6
                border
                border-gray-100
                shadow-sm
              "
            >
              <h2
                className="
                  text-2xl
                  font-semibold
                  mb-6
                "
              >
                Market Summary
              </h2>

              <div className="space-y-5">
                {pricingData.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="
                        flex
                        justify-between
                        items-center
                        p-4
                        rounded-2xl
                        bg-[#F5F7F4]
                      "
                    >
                      <div>
                        <p
                          className="
                            font-semibold
                          "
                        >
                          {item.name}
                        </p>

                        <p
                          className="
                            text-sm
                            text-gray-500
                            mt-1
                          "
                        >
                          Competitor:
                          {" "}
                          ₹
                          {
                            item.competitorPrice
                          }
                        </p>
                      </div>

                      <div
                        className="
                          text-right
                        "
                      >
                        <p
                          className="
                            font-bold
                            text-lg
                          "
                        >
                          ₹
                          {
                            item.ourPrice
                          }
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#4CBB17]
                          "
                        >
                          Active
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Pricing;