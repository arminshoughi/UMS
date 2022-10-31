import React from "react";
import { useState } from "react";
import Modal from "../components/modal";
import { useCourseTable } from "../hook/course";

function Courses() {
  const { data } = useCourseTable();
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
  console.log(
    data.map((row) => row.schedules),
    "nar"
  );
  return (
    <>
      <table class="table !text-right  table-striped table-dark mt-3">
        <thead>
          <tr>
            <th class="col  !text-right !pl-44 !w-20">{" قیمت"}</th>
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
      <table class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr>
                <td class="  !text-right !pl-[10.5rem]  !w-20">{row.price}</td>
                <td class="  !text-right !w-24 !pr-5">{row.final_exam_date}</td>
                <td class="  !text-right !w-20 !pr-4">
                  {row.midterm_exam_date}
                </td>
                <td class="  !text-right !w-20">
                  {row.schedules.map((i, k) => i.time)}
                </td>
                <td class="  !text-right !w-24  !pr-8">
                  {row.schedules.map((i, k) => i.day)}
                </td>
                <td class="  !text-right !w-20 !pr-5">
                  {row.semester.end_date}
                </td>
                <td class="  !text-right !w-20">{row.semester.start_date}</td>
                <td class="  !text-right  !w-14">{row.semester.name}</td>
                <td class="  !text-right !pr-5 !w-20">{row.major.degree}</td>
                <td class="  !text-right  !w-16">{row.unit}</td>
                <td class="  !text-right !w-16">{row.master.first_name}</td>
                <td class="  !text-right !pr-8 !w-20">{row.name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Courses;
