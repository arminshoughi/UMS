import { Alert } from "bootstrap";
import React from "react";
import { HiArchive } from "react-icons/hi";
import { useCurrentUser } from "../hook/currentUser";

function WelcomeMaster() {
  const { data: currentUser } = useCurrentUser();
  const access = localStorage.getItem("flag");

  return currentUser.typ === "MASTER" ? (
    access === "true" ? (
      <>
        <div className="flex !text-center bg-gray-300 \ text-2xl border-indigo-600 border-2  mt-10 mb-10 h-20   w-[50%] mr-[25%] float-right">
          <div className="!text-left mt-4  mr-6 ml-[30%]">خوش آمدید</div>
          <div className="!text-left mt-4 ">{currentUser.first_name} </div>
          <div className=" !text-left  mt-4 ml-6">{currentUser.last_name}</div>
          <div className="!text-left ml-10 mt-4 ">استاد عزیز </div>
        </div>
        <table class="table  !text-right !mr-96   mt-10">
          <thead className="!mr-10  bg-slate-500">
            <tr className="border-2  border-gray-600">
              <th class="col text-lg   !text-right !w-20 ">{" اطلاعیه"}</th>
            </tr>
          </thead>
        </table>
        <table
          id="myTable"
          class="table !text-right   table-striped table-dark "
        >
          <tbody>
            <>
              <tr>
                <td class="  !text-right   !w-20">
                  "استاد گرامی می توانند کارت موقت دانشجویی (سه ماهه) را از مسیر
                  "منوی ثبت نام دروس دانشجو"-زیر منوی "مشاهده ی آخرین وضعیت
                  تحصیلی (ترم جاری)"- بخش "صدور کارت دانشجویی موقت" دریافت
                  نمایند. ضمنا دانشجویان طبق اعلام واحد دانشگاهی در فرصت مناسب
                  می توانند با مراجعه به حوزه مرتبط در واحد دانشگاهی اقدام به
                  اخذ کارت دانشجویی مدت دار نمایند. با تشکر"
                </td>
              </tr>
            </>
          </tbody>
        </table>
      </>
    ) : (
      <div>{window.open("login", "_self")}</div>
    )
  ) : (
    <>
      <div className="flex !text-center  border-2  mt-10 mb-10 h-20   w-full float-right">
        <div className="!text-left mt-4  mr-6 ml-[43%]">
          دانشجوی عزیز از صفحه لاگین دانشجو وارد شوید این بخش برای شما فعال
          نمیباشد
        </div>
        <div className="!text-left mt-4 ">{currentUser.first_name} </div>
        <div className=" !text-left mr-24 mt-4 ml-6">
          {currentUser.last_name}
        </div>
      </div>
      <div
        className="!ml-[61%]"
        onClick={() => {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");

          window.open("/login", "_self");
        }}
      >
        <div className="flex  nav-text ml-3 pl-[5.4rem] text-2xl text-red-900 ">
          <div className="mr-5 cursor-grab">{"خروج"}</div>
          <div className="">{<HiArchive />}</div>
        </div>
      </div>
    </>
  );
}

export default WelcomeMaster;
