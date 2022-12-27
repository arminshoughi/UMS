import React, { useState } from "react";
import { IconContext } from "react-icons";
import ctl from "@netlify/classnames-template-literals";
import { useTranslation } from "react-i18next";

import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch,
  HiUser,
  HiArchive,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { SidebarData, SidebarDataMaster } from "./SidbarData";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import { useCurrentUser } from "../hook/currentUser";
import Home from "../pages/Home";

function Navbar() {
  const [search, setSearch] = useState("");
  const { data: currentUser } = useCurrentUser();

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { t } = useTranslation();
  const location = useLocation();

  const searchboxContainerCN = ctl(`
  flex items-center 
  bg-white border px-2  shadow rounded-md w-52 
  focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-1
`);
  const access = localStorage.getItem("flag");

  return location.pathname === "/login" ? (
    <Login />
  ) : location.pathname === "/profile" ? (
    <Profile />
  ) : location.pathname === "/" ? (
    <Home />
  ) : location.pathname === "/masterlogin" ? (
    <Login />
  ) : access === "true" ? (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <HiOutlineMenu
              onClick={
                (currentUser.typ === "MASTER" &&
                  !location.pathname.includes("master")) ||
                (currentUser.typ === "STUDENT" &&
                  !location.pathname.includes("Student"))
                  ? ""
                  : showSidebar
              }
            />
          </Link>
          <button
            onClick={() => window.open("profile", "_self")}
            className=" transition duration-200 py-1.5 mr-10 px-4 text-sm rounded-sm flex   border-4 border-solid      "
          >
            <div className="text-gray-300 mr-10">پروفایل</div>
            <HiUser className="w-6 h-6" />
          </button>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="">
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
            {location.pathname.includes("master")
              ? SidebarDataMaster.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path} onClick={showSidebar}>
                        <div className="flex ">
                          <div className="mr-5">{item.title}</div>
                          <div className="">{item.icon}</div>
                        </div>
                      </Link>
                    </li>
                  );
                })
              : SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path} onClick={showSidebar}>
                        <div className="flex ">
                          <div className="mr-5">{item.title}</div>
                          <div className="">{item.icon}</div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
            <li>
              <div
                onClick={() => {
                  localStorage.removeItem("access");
                  localStorage.removeItem("refresh");

                  window.open(
                    currentUser.typ === "STUDENT" ? "/login" : "/masterlogin",
                    "_self"
                  );
                }}
              >
                <div className="flex cursor-grab  nav-text ml-3 pl-[5.4rem] text-2xl text-red-900 ">
                  <div className="mr-5 ">{"خروج"}</div>
                  <div className="">{<HiArchive />}</div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  ) : (
    ""
  );
}

export default Navbar;
