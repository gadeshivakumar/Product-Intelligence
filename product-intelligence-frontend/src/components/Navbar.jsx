import { Search, Bell } from "lucide-react";

function Navbar() {
  return (
    <div
      className="
        h-[80px]
        bg-white
        border-b
        border-gray-100
        px-8
        flex
        items-center
        justify-between
      "
    >
      <div
        className="
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
          className="
            w-[180px]
md:w-[320px]
            bg-gray-50
            border
            border-gray-200
            rounded-xl
            py-3
            pl-11
            pr-4
            outline-none
            focus:border-[#4CBB17]
            text-sm
          "
        />
      </div>

      <div
        className="
          flex
          items-center
          gap-5
        "
      >
        <button
          className="
            relative
            p-3
            rounded-xl
            hover:bg-gray-100
          "
        >
          <Bell size={20} />

          <div
            className="
              absolute
              top-2
              right-2
              w-2
              h-2
              bg-red-500
              rounded-full
            "
          />
        </button>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              w-11
              h-11
              rounded-full
              bg-[#4CBB17]
              text-white
              flex
              items-center
              justify-center
              font-semibold
            "
          >
            S
          </div>

          <div>
            <p
              className="
                text-sm
                font-semibold
              "
            >
              Shiva
            </p>

            <p
              className="
                text-xs
                text-gray-500
              "
            >
              Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
