import jMoment from "moment-jalaali";
import React from "react";

import { HiUserGroup, HiUsers } from "react-icons/hi";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function Home() {
  return (
    <div className="!bg-indigo-600 h-[60rem] w-full flex  items-center justify-center gap-20">
      <button
        onClick={() => window.open("masterlogin", "_self")}
        className="w-40 h-40 bg-[#fffd88] rounded-md mb-40 "
      >
        <HiUserGroup className="w-40 h-40 mb-4  " />
        <span className="text-3xl mt-5">ورودی اساتید</span>
      </button>
      <button
        onClick={() => window.open("login", "_self")}
        className="w-40 h-40 bg-[#59eb68] rounded-md mb-40"
      >
        <HiUsers className="w-40 mb-4 h-40" />
        <span className="text-3xl ">ورودی دانشجو</span>
      </button>
    </div>
  );
}
export default Home;
