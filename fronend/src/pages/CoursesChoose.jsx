import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetCourseTable } from "../hook/getCource";

function CourseChoose() {
  const { data } = useGetCourseTable();
  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });
  const handleSubmit = (e) => {
    setState({ name: state.modalInputName });
    modalClose();
  };

  const modalOpen = () => {
    setState({ modal: true });
  };

  const modalClose = () => {
    setState({
      modalInputName: "",
      modal: false,
    });
  };
  const [id, setsetId] = useState();
  const handleSubmit1 = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/student/student/remove_course/",
        {
          id: id,
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
      })
      .catch((error) => {
        alert("درس انتخاب شده به دلایل نامشخص حذف نشد دوباره تکرار کنید");
      });
  };
  const location = useLocation();

  return (
    <>
      <table class="table !text-right  table-striped table-dark mt-3">
        <thead>
          <tr>
            {location.pathname !== "/master" ? (
              <th class="col !text-right !w-28" scope="col"></th>
            ) : (
              ""
            )}

            <th class="col  !text-right !w-20 ">{" قیمت"}</th>
            <th class="col !text-right !w-20">{"    امتحان پایان ترم"}</th>
            <th class="col !text-right !w-20">{"    امتحان میانترم"}</th>
            <th class="col !text-right !w-20">{"   ساعت کلاس"}</th>
            <th class="col !text-right !w-24">{"   روز کلاس"}</th>
            <th class="col !text-right !w-20 ">{"   اتمام کلاس"}</th>
            <th class="col !text-right !w-20">{"   شروع کلاس"}</th>
            <th class="col !text-right !w-14">{"   ترم"}</th>
            <th class="col !text-right !w-24">{"   دوره"}</th>
            <th class="col !text-right  !w-20">{"  تعداد واحد"}</th>
            <th class="col !text-right  !w-16">{" نام استاد"}</th>
            <th class="col  !text-right !pr-8 !w-20">{" نام کلاس"}</th>
          </tr>
        </thead>
      </table>
      <table id="myTable" class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr className="">
                <td class="  !text-right  !w-1 !pr-2">
                  <button
                    onClick={(e) => {
                      setsetId(row.id);
                      handleSubmit1(e);
                    }}
                    type="button"
                    class="btn !w-28 btn-primary"
                  >
                    <i class="">حذف واحد</i>
                  </button>
                </td>
                <td class="  !text-right  !w-20">{row.course.price}</td>
                <td class="  !text-right !w-24 !pr-5 ">
                  {row.course.final_exam_date}
                </td>
                <td class="  !text-right !w-20 !pr-4">
                  {row.course.midterm_exam_date}
                </td>
                <td class="  !text-right !w-24 !pr-7 ">
                  {row.course.schedules.map((i, k) => i.time)}
                </td>
                <td class="  !text-right !w-14 !pr-8  ">
                  {row.course.schedules.map((i, k) => i.day)}
                </td>
                <td class="  !text-right !w-20 !pr-5 ">
                  {row.course.semester.end_date}
                </td>
                <td class="  !text-right !w-20">
                  {row.course.semester.start_date}
                </td>
                <td class="  !text-right !w-14">{row.course.semester.name}</td>
                <td class="  !text-right !w-20 !pr-5">
                  {row.course.major.degree}
                </td>
                <td class="  !text-right !w-16">{row.course.unit}</td>
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
  );
}

export default CourseChoose;
