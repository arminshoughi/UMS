import React, { useState } from "react";
import { IconContext } from "react-icons";
import ctl from "@netlify/classnames-template-literals";
import { useTranslation } from "react-i18next";

import {
  HiOutlineLockClosed,
  HiChartBar,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch,
  HiUser,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { SidebarData } from "./SidbarData";
import { useLocation } from "react-router-dom";
import Login from "./Login";

function Navbar() {
  const [search, setSearch] = useState("");

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { t } = useTranslation();
  const location = useLocation();

  console.log(location.pathname, "nargess");

  const searchboxContainerCN = ctl(`
  flex items-center justify-start transition duration-200
  bg-white border px-2 shadow rounded-md w-56 ml-3 ml-3
  focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-1
`);
  return location.pathname !== "/login" ? (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <HiOutlineMenu onClick={showSidebar} />
          </Link>
          <button className=" transition duration-200 py-1.5 px-3 text-sm rounded-sm flex   border-4 border-solid     ml-[80rem] ">
            <div className="text-gray-300 mr-10">پروفایل</div>
            <HiUser className="w-6 h-6" />
          </button>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="w-[100%] ">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <HiOutlineX onClick={showSidebar} />
              </Link>
            </li>
            <div className={searchboxContainerCN}>
              <HiOutlineSearch className="w-5 h-5 !text-black mr-2" />
              <input
                search={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 py-2 focus:outline-none w-1"
                placeholder={t("find")}
              />
            </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <div className="flex ">
                      <div className="mr-5">{item.title}</div>
                      <div className="">{item.icon}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  ) : (
    <Login />
  );
}

export default Navbar;
