import axios from "axios";
import React from "react";
import { useState } from "react";
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
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NjQxMzExLCJqdGkiOiJkYzVlMWFmODYzMzc0Y2EzYjYzZWI2ZDVkZmRlZmRkYiIsInVzZXJfaWQiOjN9.VxqDZUlDGF1JrIuQ71XSi4PcoJ4wdQDcUIO3DXX_Oh0`,

            "X-CSRFToken":
              "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
          },
        },

        {
          id: 5,
        }
      )
      .then((result) => {
        alert(result.status.toString());
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <table class="table !text-right  table-striped table-dark mt-3">
        <thead>
          <tr>
            <th class="col !text-right !w-28" scope="col"></th>

            <th class="col  !text-right  !w-20">{" قیمت"}</th>
            <th class="col !text-right !w-20 ">{"    امتحان پایان ترم"}</th>
            <th class="col !text-right !w-24">{"    امتحان میانترم"}</th>
            <th class="col !text-right !w-20">{"   ساعت کلاس"}</th>
            <th class="col !text-right !w-20">{"   روز کلاس"}</th>
            <th class="col !text-right !w-16 ">{"   اتمام کلاس"}</th>
            <th class="col !text-right !w-16">{"   شروع کلاس"}</th>
            <th class="col !text-right !w-14">{"   ترم"}</th>
            <th class="col !text-right !w-16">{"   دوره"}</th>
            <th class="col !text-right  !w-20">{"  تعداد واحد"}</th>
            <th class="col !text-right  !w-14">{" نام استاد"}</th>
            <th class="col  !text-right !pr-8 !w-16">{" نام کلاس"}</th>
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
                    onClick={(e) => handleSubmit1(e)}
                    type="button"
                    class="btn !w-28 btn-primary"
                  >
                    <i class="">حذف واحد</i>
                  </button>
                </td>
                <td class="  !text-right  !w-20">{row.course.price}</td>
                <td class="  !text-right !w-20 ">
                  {row.course.final_exam_date}
                </td>
                <td class="  !text-right !w-24">
                  {row.course.midterm_exam_date}
                </td>
                <td class="  !text-right !w-20">
                  {row.course.schedules.map((i, k) => i.time)}
                </td>
                <td class="  !text-right !w-20  ">
                  {row.course.schedules.map((i, k) => i.day)}
                </td>
                <td class="  !text-right !w-16 ">
                  {row.course.semester.end_date}
                </td>
                <td class="  !text-right !w-16">
                  {row.course.semester.start_date}
                </td>
                <td class="  !text-right !w-10">{row.course.semester.name}</td>
                <td class="  !text-right !w-1">{row.course.major.degree}</td>
                <td class="  !text-right !w-20">{row.course.unit}</td>
                <td class="  !text-right !w-14">
                  {row.course.master.first_name}
                </td>
                <td class="  !text-right !pr-8 !w-16">{row.course.name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CourseChoose;
