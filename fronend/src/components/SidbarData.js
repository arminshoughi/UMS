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
    path: "/CourseStudent",
    icon: <HiOutlineDocumentText />,
    cName: "mt-5 nav-text ml-3 pl-[4.3rem]",
  },
  {
    title: "مشاهده دروس انتخاب شده ",
    path: "/CourseChooseStudent",
    icon: <HiOutlineDocumentText />,
    cName: "m nav-text pr-14 ",
  },
  {
    title: "مشاهده دروس ارایه شده",
    path: "/AllCoursesStudent",
    icon: <HiOutlineIdentification />,
    cName: "nav-text pl-[0.7rem] ",
  },
  {
    title: "پرداخت شهریه",
    path: "/AmountStudent",
    icon: <HiCurrencyDollar />,
    cName: "nav-text pl-[4rem]",
  },
  {
    title: "مشاهده کارنامه",
    path: "/ProductsStudent",
    icon: <HiArchive />,
    cName: "nav-text pl-[4rem]  ",
  },
];
export const SidebarDataMaster = [
  {
    title: "اضافه کردن درس",
    path: "/master",
    icon: <HiOutlineDocumentText />,
    cName: "mt-5 nav-text ml-3 pl-[4.3rem]",
  },
  {
    title: "نمره دهی",
    path: "/masterCourse",
    icon: <HiOutlineDocumentText />,
    cName: " nav-text ml-3 pl-[7.5rem] ",
  },
];
