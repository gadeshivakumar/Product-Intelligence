import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div
      className="
    flex
    flex-col
    lg:flex-row
    min-h-screen
  "
    >
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div
          className="
    p-4
    md:p-6
    xl:p-8
  "
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
