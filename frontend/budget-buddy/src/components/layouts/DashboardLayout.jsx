import React, { useContext } from "react";
import { UserContext } from "../../context/userContext"; 

import SideMenu from "./SideMenu";


function DashboardLayout({ children, activeMenu }) {
  const { user } = useContext(UserContext);

  return (
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-80 hidden md:block">
          <SideMenu activeMenu={activeMenu} />
        

        <div className="grow p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;


