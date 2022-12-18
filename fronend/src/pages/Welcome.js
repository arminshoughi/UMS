import { Alert } from "bootstrap";
import React from "react";
import { HiArchive } from "react-icons/hi";
import { useCurrentUser } from "../hook/currentUser";

function Welcome() {
  const { data: currentUser } = useCurrentUser();
  const access = localStorage.getItem("flag");

  return currentUser.typ === "STUDENT" ? (
    access === "true" ? (
      <>
        <div className="flex !text-center  border-2  mt-10 mb-10 h-20   w-full float-right">
          <div className="!text-left mt-4  mr-6 ml-[43%]">خوش آمدید</div>
          <div className="!text-left mt-4 ">{currentUser.first_name} </div>
          <div className=" !text-left mr-24 mt-4 ml-6">
            {currentUser.last_name}
          </div>
        </div>
        <table class="table  !text-right   mt-10">
          <thead className=" bg-slate-500">
            <tr className="">
              <th class="col  !text-right !w-20 ">{" اطلاعیه"}</th>
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
                  "دانشجویان گرامی می توانند کارت موقت دانشجویی (سه ماهه) را از
                  مسیر "منوی ثبت نام دروس دانشجو"-زیر منوی "مشاهده ی آخرین وضعیت
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
          ("استاد عزیز از صفحه لاگین استاد وارد شوید این بخش برای شما فعال
          نمیباشد")
        </div>{" "}
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

          window.open(
            currentUser.typ === "STUDENT" ? "/login" : "/masterlogin",
            "_self"
          );
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

export default Welcome;
