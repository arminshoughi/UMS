import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../components/modal";
import { toFarsiNumber, toJalaali } from "../constants/unit";
import { useGetCourse } from "../hook/getCource";

function CourseChoose() {
  const [refresh, setRefresh] = useState();
  const [rowId, setRowId] = useState();

  const { data } = useGetCourse(refresh);
  const access = localStorage.getItem("flag");

  const handleSubmitRemove = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/student/student/remove_course/",
        {
          id: rowId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2NTYxNjQ4LCJqdGkiOiIzNzkzNWM1MmQ4Mzg0NjQ2OTdlNmE0NWYwNGEwYzI4NyIsInVzZXJfaWQiOjN9.EJuZ4h5fwzNcl5A0swmhqUprfTvzHT1Ctv_BnJYLokg`,

            "X-CSRFToken":
              "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
          },
        }
      )
      .then((result) => {
        alert("درس با موفقیت حذف شد");
        setRefresh(!refresh);
      })
      .catch((error) => {
        alert("درس انتخاب شده به دلایل نامشخص حذف نشد دوباره تکرار کنید");
      });
  };
  const location = useLocation();
  const [state, setState] = useState({
    modal: false,
    update: false,
    name: "",
    modalInputName: "",
  });

  const modalClose = () => {
    setState({
      modalInputName: "",
      modal: false,
    });
  };

  return access === "true" ? (
    <>
      <table class="table !text-right  mt-3">
        <thead className="bg-slate-500">
          <tr>
            {location.pathname !== "/master" ? (
              <th class="col !text-right !w-28" scope="col"></th>
            ) : (
              ""
            )}

            <th class="col  !text-right ">{"قیمت"}</th>
            <th class="col !text-right !w-[10rem] ">{"امتحان پایان ترم"}</th>
            <th class="col !text-right !w-[9rem]">{"امتحان میانترم"}</th>
            <th class="col !text-right !w-[8rem] ">{"ساعت کلاس"}</th>
            <th class="col !text-right !w-[7.5rem] ">{"روز کلاس"}</th>
            <th class="col !text-right !w-[9.5rem] ">{"اتمام کلاس"}</th>
            <th class="col !text-right !w-[9rem] ">{"شروع کلاس"}</th>
            <th class="col !text-right !w-[6rem]">{"ترم"}</th>
            <th class="col !text-right !w-[6.5rem]">{"دوره"}</th>
            <th class="col !text-right  !w-[8rem]">{"تعداد واحد"}</th>
            <th class="col !text-right !w-[5rem] ">{"نام استاد"}</th>
            <th class="col  !text-right !pr-8 !w-[9rem]">{"نام کلاس"}</th>
          </tr>
        </thead>
      </table>
      <table id="myTable" class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr className="">
                <td class="  !text-right  !w-1 !pr-2 ">
                  <button
                    onClick={(e) => {
                      setRowId(row.id);
                      handleSubmitRemove(e);
                    }}
                    type="button"
                    class="btn !w-28 !bg-slate-400 border  text-slate-900"
                  >
                    <i class="">حذف واحد</i>
                  </button>
                </td>
                <td class="  !text-right  !w-20">
                  {toFarsiNumber(row.course.price.toLocaleString())}
                </td>
                <td class="  !text-right !w-24 !pr-5 ">
                  {toJalaali(row.course.final_exam_date)}
                </td>
                <td class="  !text-right !w-20 !pr-4">
                  {toJalaali(row.course.midterm_exam_date)}
                </td>
                <td class="  !text-right !w-24 !pr-7 ">
                  {row.course.schedules.map((i, k) => toFarsiNumber(i.time))}
                </td>
                <td class="  !text-right !w-14 !pr-8  ">
                  {row.course.schedules.map((i, k) =>
                    i.day === "SUNDAY"
                      ? "یکشنبه"
                      : "SATURDAY"
                      ? "شنبه"
                      : "MONDAY"
                      ? "دوشنبه"
                      : "TUESDAY"
                      ? "سه شنبه"
                      : "WEDNESDAY"
                      ? "چهار شنبه"
                      : "THURSDAY"
                      ? "پنج شنبه"
                      : "جمعه"
                  )}
                </td>
                <td class="  !text-right !w-20 !pr-5 ">
                  {toJalaali(row.course.semester.end_date)}
                </td>
                <td class="  !text-right !w-20">
                  {toJalaali(row.course.semester.start_date)}
                </td>
                <td class="  !text-right !w-14">{row.course.semester.name}</td>
                <td class="  !text-right !w-20 !pr-5">
                  {row.course.major.degree === "BACHELOR"
                    ? "لیسانس"
                    : "فوق لیسانس"}
                </td>
                <td class="  !text-right !w-16">
                  {toFarsiNumber(row.course.unit)}
                </td>
                <td class="  !text-right !w-16">
                  {row.course.master.first_name}
                </td>
                <td class="  !text-right !pr-8 !w-20">{row.course.name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <div>{window.open("login", "_self")}</div>
  );
}

export default CourseChoose;
