import React from "react";
import {
  HiOutlineIdentification,
  HiOutlineDocumentText,
  HiArchive,
  HiCurrencyDollar,
} from "react-icons/hi";
export const SidebarData = [
  {
    title: "انتخاب واحد",
    path: "/",
    icon: <HiOutlineDocumentText />,
    cName: "mt-5 nav-text ml-3 px-14",
  },
  {
    title: "مشاهده دروس ارایه شده",
    path: "/reports",
    icon: <HiOutlineIdentification />,
    cName: "nav-text ",
  },
  {
    title: "پرداخت شهریه",
    path: "/Amount",
    icon: <HiCurrencyDollar />,
    cName: "nav-text px-14",
  },
  {
    title: "مشاهده کارنامه",
    path: "/Products",
    icon: <HiArchive />,
    cName: "nav-text px-14  ",
  },
  {
    title: "خروج",
    path: "/login",
    icon: <HiArchive />,
    cName: "nav-text ml-12 px-[60px]",
  },
];
