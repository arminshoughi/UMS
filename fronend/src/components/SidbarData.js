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
    cName: "mt-5  nav-text ml-20",
  },
  {
    title: "مشاهده دروس ارایه شده",
    path: "/reports",
    icon: <HiOutlineIdentification />,
    cName: "nav-text ml-3",
  },
  {
    title: "پرداخت شهریه",
    path: "/Products",
    icon: <HiCurrencyDollar />,
    cName: "nav-text ml-16",
  },
  {
    title: "مشاهده کارنامه",
    path: "/Products",
    icon: <HiArchive />,
    cName: "nav-text ml-16",
  },
];
