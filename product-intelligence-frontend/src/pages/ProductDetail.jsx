import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../api/api";

import CompetitorTable from "../components/CompetitorTable";

function ProductDetail() {
  const { skuId } =
    useParams();

  const [
    product,
    setProduct,
  ] = useState(null);

  const [
    issues,
    setIssues,
  ] = useState([]);

  const [
    pricing,
    setPricing,
  ] = useState(null);

  const [
    competitors,
    setCompetitors,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    editMode,
    setEditMode,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({});

  const [
    competitorForm,
    setCompetitorForm,
  ] = useState({
    platform: "",
    price: "",
    productUrl: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {

      try {

        setLoading(true);

        /*
          Product
        */
        const productRes =
          await api.get(
            `/products/${skuId}`
          );

        setProduct(
          productRes.data.data
        );

        setFormData(
          productRes.data.data
        );

        /*
          Issues
        */
        try {

          const issuesRes =
            await api.get(
              `/products/${skuId}/issues`
            );

          setIssues(
            issuesRes.data.data || []
          );

        } catch {

          setIssues([]);
        }

        /*
          Pricing
        */
        try {

          const pricingRes =
            await api.get(
              `/products/${skuId}/price-comparison`
            );

          setPricing(
            pricingRes.data.data
          );

        } catch {

          setPricing(null);
        }

        /*
          Competitors
        */
        try {

          const competitorsRes =
            await api.get(
              `/products/${skuId}/competitor-prices`
            );

          setCompetitors(
            competitorsRes.data.data || []
          );

        } catch (error) {

            console.log(error);

            return res.status(400).json({
              success: false,

              error:
                error.message,
            });
          }
      } catch (error) {

        console.log(error);

        setProduct(null);

      } finally {

        setLoading(false);
      }
    };

  const saveChanges =
    async () => {

      try {

        await api.patch(
  `/products/${skuId}`,
  {
    productTitle:
      formData.productTitle,

    category:
      formData.category,

    brand:
      formData.brand,

    price:
      formData.price,
  }
);

        setProduct(
          formData
        );

        setEditMode(false);

        toast.success(
          "Product updated successfully"
        );

      } catch {

        toast.error(
          "Failed to update product"
        );
      }
    };

  const revalidateProduct =
    async () => {

      try {

        toast.loading(
          "Revalidating...",
          {
            id: "validate",
          }
        );

        await api.post(
          `/products/${skuId}/validate`
        );

        toast.success(
          "Validation complete",
          {
            id: "validate",
          }
        );

        fetchData();

      } catch {

        toast.error(
          "Validation failed",
          {
            id: "validate",
          }
        );
      }
    };

  const generateTitle =
    async () => {

      try {

        toast.loading(
          "Generating AI title...",
          {
            id: "title",
          }
        );

        const response =
          await api.post(
            `/products/${skuId}/enhance-title`
          );

        setProduct({
          ...product,

          enhancedTitle:
            response.data.data
              .enhancedTitle,
        });

        toast.success(
          "Enhanced title generated",
          {
            id: "title",
          }
        );

      } catch {

        toast.error(
          "Enhancement failed",
          {
            id: "title",
          }
        );
      }
    };

  const addCompetitor =
  async () => {

    try {

      await api.post(
        `/products/${skuId}/competitor-prices`,
        {
          platform:
            competitorForm.platform,

          competitorPrice:
            Number(
              competitorForm.price
            ),

          competitorUrl:
            competitorForm.productUrl || null,
        }
      );

      toast.success(
        "Competitor added"
      );

      setCompetitorForm({
        platform: "",
        price: "",
        productUrl: "",
      });

      fetchData();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to add competitor"
      );
    }
  };
    

  const refreshPrices =
    async () => {

      try {

        toast.loading(
          "Refreshing prices...",
          {
            id: "refresh",
          }
        );

        await api.post(
          "/competitor-prices/refresh"
        );

        toast.success(
          "Prices refreshed",
          {
            id: "refresh",
          }
        );

        fetchData();

      } catch {

        toast.error(
          "Refresh failed",
          {
            id: "refresh",
          }
        );
      }
    };

  if (loading) {
    return (
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
    );
  }

  if (!product) {
    return (
      <div
        className="
          bg-red-100
          text-red-600
          p-6
          rounded-2xl
        "
      >
        Failed to load product
      </div>
    );
  }

  const getSeverityColor =
    (severity) => {

      if (
        severity === "HIGH"
      ) {

        return "bg-red-100 text-red-700";
      }

      if (
        severity ===
        "MEDIUM"
      ) {

        return "bg-yellow-100 text-yellow-700";
      }

      return "bg-green-100 text-green-700";
    };

  return (
    <div>
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:justify-between
          gap-5
          mb-8
        "
      >
        <div className="flex-1">
          {editMode ? (
            <input
              value={
                formData.productTitle || ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,

                  productTitle:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                text-3xl
                font-bold
              "
            />
          ) : (
            <h1
              className="
                text-4xl
                font-bold
              "
            >
              {
                product.productTitle
              }
            </h1>
          )}

          <p
            className="
              text-gray-500
              mt-3
            "
          >
            SKU:
            {" "}
            {product.skuId}
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >
          <button
            onClick={() =>
              setEditMode(
                !editMode
              )
            }
            className="
              px-5
              py-3
              rounded-2xl
              bg-[#4CBB17]
              text-white
              font-semibold
            "
          >
            {
              editMode
                ? "Cancel"
                : "Edit Product"
            }
          </button>

          <button
            onClick={
              revalidateProduct
            }
            className="
              px-5
              py-3
              rounded-2xl
              bg-[#39542C]
              text-white
              font-semibold
            "
          >
            Revalidate
          </button>

          <button
            onClick={
              refreshPrices
            }
            className="
              px-5
              py-3
              rounded-2xl
              bg-black
              text-white
              font-semibold
            "
          >
            Refresh Prices
          </button>
        </div>
      </div>

      {editMode && (
        <button
          onClick={saveChanges}
          className="
            mb-8
            px-6
            py-3
            rounded-2xl
            bg-[#4CBB17]
            text-white
            font-semibold
          "
        >
          Save Changes
        </button>
      )}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-8
        "
      >
        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Category
          </p>

          {editMode ? (
            <input
              value={
                formData.category || ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,

                  category:
                    e.target.value,
                })
              }
              className="
                mt-4
                w-full
                border
                border-gray-200
                rounded-xl
                p-3
              "
            />
          ) : (
            <h2
              className="
                text-2xl
                font-bold
                mt-4
              "
            >
              {
                product.category ||
                "-"
              }
            </h2>
          )}
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Price
          </p>

          {editMode ? (
            <input
              value={
                formData.price || ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,

                  price:
                    e.target.value,
                })
              }
              className="
                mt-4
                w-full
                border
                border-gray-200
                rounded-xl
                p-3
              "
            />
          ) : (
            <h2
              className="
                text-2xl
                font-bold
                mt-4
              "
            >
              ₹
              {
                product.price ||
                "-"
              }
            </h2>
          )}
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Brand
          </p>

          {editMode ? (
            <input
              value={
                formData.brand || ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,

                  brand:
                    e.target.value,
                })
              }
              className="
                mt-4
                w-full
                border
                border-gray-200
                rounded-xl
                p-3
              "
            />
          ) : (
            <h2
              className="
                text-2xl
                font-bold
                mt-4
              "
            >
              {
                product.brand ||
                "-"
              }
            </h2>
          )}
        </div>
      </div>

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          mb-8
        "
      >
        <div
          className="
            bg-white
            rounded-3xl
            p-6
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
            Validation Issues
          </h2>

          <div className="space-y-4">
            {issues.length === 0 ? (
              <div
                className="
                  text-green-600
                  font-medium
                "
              >
                No issues found
              </div>
            ) : (
              issues.map(
                (issue) => (
                  <div
                    key={issue.id}
                    className="
                      border
                      border-gray-100
                      rounded-2xl
                      p-5
                    "
                  >
                    <div
                      className="
                        flex
                        justify-between
                        mb-3
                      "
                    >
                      <h3 className="font-semibold">
                        {
                          issue.issueType
                        }
                      </h3>

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${getSeverityColor(
                            issue.severity
                          )}
                        `}
                      >
                        {
                          issue.severity
                        }
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      {
                        issue.message
                      }
                    </p>

                    <p
                      className="
                        text-sm
                        text-[#4CBB17]
                        mt-3
                      "
                    >
                      {
                        issue.suggestedFix
                      }
                    </p>
                  </div>
                )
              )
            )}
          </div>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <div
            className="
              flex
              justify-between
              items-center
              mb-6
            "
          >
            <h2
              className="
                text-2xl
                font-semibold
              "
            >
              Enhanced Title
            </h2>

            <button
              onClick={
                generateTitle
              }
              className="
                px-5
                py-3
                rounded-2xl
                bg-[#4CBB17]
                text-white
                font-semibold
              "
            >
              Generate AI Title
            </button>
          </div>

          <div
            className="
              p-5
              rounded-2xl
              bg-[#F5F7F4]
              mb-5
            "
          >
            <p
              className="
                text-sm
                text-gray-500
                mb-2
              "
            >
              Original Title
            </p>

            <p className="font-semibold">
              {
                product.productTitle
              }
            </p>
          </div>

          <div
            className="
              p-6
              rounded-2xl
              bg-[#F5F7F4]
            "
          >
            <p
              className="
                text-lg
                font-medium
                text-gray-700
              "
            >
              {
                product.enhancedTitle ||
                "No enhanced title available"
              }
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div
          className="
            flex
            justify-between
            items-center
            mb-6
          "
        >
          <h2
            className="
              text-2xl
              font-semibold
            "
          >
            Pricing Intelligence
          </h2>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mb-8
          "
        >
          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
            "
          >
            <p className="text-sm text-gray-500">
              Our Price
            </p>

            <h3
              className="
                text-3xl
                font-bold
                mt-4
              "
            >
              ₹
              {
                pricing?.ourPrice ||
                "-"
              }
            </h3>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
            "
          >
            <p className="text-sm text-gray-500">
              Lowest Competitor
            </p>

            <h3
              className="
                text-3xl
                font-bold
                mt-4
              "
            >
              ₹
              {
                pricing?.lowestCompetitorPrice ||
                "-"
              }
            </h3>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-sm
            "
          >
            <p className="text-sm text-gray-500">
              Recommendation
            </p>

            <h3
              className="
                text-xl
                font-bold
                mt-4
                text-[#4CBB17]
              "
            >
              {
                pricing?.recommendedAction ||
                "No recommendation"
              }
            </h3>
          </div>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
            mb-6
          "
        >
          <h2
            className="
              text-xl
              font-semibold
              mb-5
            "
          >
            Add Competitor
          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
              mb-5
            "
          >
            <input
              placeholder="Platform"
              value={
                competitorForm.platform
              }
              onChange={(e) =>
                setCompetitorForm({
                  ...competitorForm,

                  platform:
                    e.target.value,
                })
              }
              className="
                border
                border-gray-200
                rounded-xl
                p-3
              "
            />

            <input
              placeholder="Price"
              value={
                competitorForm.price
              }
              onChange={(e) =>
                setCompetitorForm({
                  ...competitorForm,

                  price:
                    e.target.value,
                })
              }
              className="
                border
                border-gray-200
                rounded-xl
                p-3
              "
            />

            <input
              placeholder="Product URL"
              value={
                competitorForm.productUrl
              }
              onChange={(e) =>
                setCompetitorForm({
                  ...competitorForm,

                  productUrl:
                    e.target.value,
                })
              }
              className="
                border
                border-gray-200
                rounded-xl
                p-3
              "
            />
          </div>

          <button
            onClick={
              addCompetitor
            }
            className="
              px-6
              py-3
              rounded-2xl
              bg-[#4CBB17]
              text-white
              font-semibold
            "
          >
            Add Competitor
          </button>
        </div>

        <CompetitorTable
          competitors={
            competitors
          }
        />
      </div>
    </div>
  );
}

export default ProductDetail;