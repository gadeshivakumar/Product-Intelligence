import {
  useEffect,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import {
  getProducts,
} from "../api/api";

import ProductTable from "../components/ProductTable";

function Products() {
  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    search,
    setSearch,
  ] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts =
    async () => {
      try {

        setLoading(true);

        const data =
          await getProducts(
            page,
            10,
            search
          );

        setProducts(
          data.products || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const handleSearch =
    async (e) => {

      e.preventDefault();

      fetchProducts();
    };

  return (
    <div>
      <div
        className="
          flex
        flex-col
        lg:flex-row
        lg:items-center
        gap-4
        justify-between
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
            Products
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Manage and monitor products
          </p>
        </div>
      </div>

      <div
        className="
          bg-white
          rounded-3xl
          p-5
          border
          border-gray-100
          shadow-sm
          mb-6
        "
      >
        <form
          onSubmit={
            handleSearch
          }
          className="
            flex
            gap-4
          "
        >
          <div
            className="
              flex-1
              relative
            "
          >
            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                bg-gray-50
                border
                border-gray-200
                rounded-2xl
                py-4
                pl-12
                pr-4
                outline-none
                focus:border-[#4CBB17]
              "
            />
          </div>

          <button
            type="submit"
            className="
              px-8
              rounded-2xl
              bg-[#4CBB17]
              hover:bg-[#48872B]
              text-white
              font-semibold
              transition
            "
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div
          className="
            flex
            justify-center
            items-center
            h-[50vh]
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
          <ProductTable
            products={
              products
            }
          />

          <div
            className="
              flex
              justify-end
              gap-3
              mt-6
            "
          >
            <button
              onClick={() =>
                setPage(
                  Math.max(
                    page - 1,
                    1
                  )
                )
              }
              className="
                px-5
                py-3
                rounded-xl
                bg-white
                border
                border-gray-200
                hover:bg-gray-50
              "
            >
              Previous
            </button>

            <button
              onClick={() =>
                setPage(
                  page + 1
                )
              }
              className="
                px-5
                py-3
                rounded-xl
                bg-[#4CBB17]
                text-white
                hover:bg-[#48872B]
              "
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;