import {
  LayoutDashboard,
  Package,
  Upload,
  Bell,
  Briefcase,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },

  {
    name: "Products",
    path: "/products",
    icon: Package,
  },

  {
    name: "Uploads",
    path: "/uploads",
    icon: Upload,
  },

  {
    name: "Alerts",
    path: "/alerts",
    icon: Bell,
  },

  {
    name: "Jobs",
    path: "/jobs",
    icon: Briefcase,
  },

  {
    name: "Pricing",
    path: "/pricing",
    icon: BarChart3,
  },
];

function Sidebar() {
  return (
    <div
      className="
        w-full
        lg:w-[250px]
        min-h-screen
        bg-[#293325]
        text-white
        p-5
        flex
        flex-col
      "
    >
      <div className="mb-10">
        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
          "
        >
          ProductIQ
        </h1>

        <p
          className="
            text-sm
            text-gray-300
            mt-1
          "
        >
          Intelligence Dashboard
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-200

                ${isActive ? "bg-[#4CBB17]" : "hover:bg-[#39542C]"}
              `
              }
            >
              <Icon size={19} />

              <span
                className="
                  text-sm
                  font-medium
                "
              >
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto">
        <div
          className="
            bg-[#39542C]
            rounded-2xl
            p-5
          "
        >
          <p
            className="
              text-sm
              text-gray-300
            "
          >
            Overall Product Health
          </p>

          <h2
            className="
              text-3xl
              font-bold
              mt-2
            "
          >
            78%
          </h2>

          <div
            className="
              mt-4
              h-2
              bg-[#4b5b43]
              rounded-full
            "
          >
            <div
              className="
                h-full
                w-[78%]
                bg-[#4CBB17]
                rounded-full
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
