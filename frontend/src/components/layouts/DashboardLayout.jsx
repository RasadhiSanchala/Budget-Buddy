import React from "react";
import SideMenu from "./SideMenu";

function DashboardLayout({ activeMenu }) {
  return (
    <div className="w-full h-full bg-white">
      <SideMenu activeMenu={activeMenu} />
    </div>
  );
}

export default DashboardLayout;
