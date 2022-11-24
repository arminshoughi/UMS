import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCourses } from "../hook/course";
import { useGetCourse } from "../hook/getCource";
import { useSemesters } from "../hook/semester";

function MasterCourse() {
  const { data } = useCourses();
  const { data: nomre } = useGetCourse();

  const { data: semesters } = useSemesters();

  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });

  const [values, setValus] = useState({
    major: "",
    className: "",
    masterName: "",
    unitCount: "",
    details: "",
    period: "",
    term: "",
    classStart: "",
    classEnd: "",
    classToday: "",
    classClock: "",
    minTerm: "",
    endTerm: "",
    price: "",
  });

  console.log("val", values);
  const location = useLocation();
  const access = localStorage.getItem("flag");

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ name: state.modalInputName });
    modalClose();
    axios
      .post(
        "http://127.0.0.1:8000/api/share/courses/",
        {
          major_id: Number(values.major),

          semester_id: Number(values.term),
          name: values.className,
          details: values.details,
          unit: values.unitCount,
          master_id: Number(values.masterName),

          schedules: [
            {
              day: values.classToday,
              time: values.classClock,
            },
          ],
          midterm_exam_date: values.minTerm,
          final_exam_date: values.endTerm,
          price: values.price,
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
        alert(result.status.toString());
      })
      .catch((error) => {
        alert(error);
      });
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
    semesters.map((i) => i.start_date),
    "semester.start_date"
  );
  return access === "true" ? (
    <>
      <table class="table !text-right  table-striped table-dark mt-3">
        <thead>
          <tr>
            <td>
              <button onClick={(e) => {}} type="button" class=" !w-28">
                <i class=""></i>
              </button>
            </td>
            <td>
              <button onClick={(e) => {}} type="button" class="!w-28 ">
                <i class=""></i>
              </button>
            </td>
            <th class="col !text-right !pl-10">{"نمره پایان ترم"}</th>
            <th class="col !text-right !pl-10 ">{"نمره میانترم"}</th>
            <th class="col !text-right !pl-10">{"امتحان پایان ترم"}</th>
            <th class="col !text-right !pr-12">{"امتحان میانترم"}</th>
            <th class="col !text-right !pr-14">{"ساعت کلاس"}</th>
            <th class="col !text-right !pr-24">{"روز کلاس"}</th>
            <th class="col !text-right !pr-20 ">{"اتمام کلاس"}</th>
            <th class="col !text-right ">{"شروع کلاس"}</th>
            <th class="col !text-right !pr-8 ">{"نام دانشجو"}</th>
            <th class="col  !text-right !pr-8 ">{"نام کلاس"}</th>
          </tr>
        </thead>
      </table>
      <table id="myTable" class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr>
                <td>
                  <div className="!text-right  !w-60 gap-3  flex">
                    <button
                      onClick={(e) => {}}
                      type="button"
                      class="btn !w-28 btn-primary"
                    >
                      <i class="">نمره پایانترم</i>
                    </button>
                    <button
                      onClick={(e) => {}}
                      type="button"
                      class="btn !w-28  btn-primary"
                    >
                      <i class="">نمره میانترم</i>
                    </button>
                  </div>
                </td>

                <td class="  !text-right   !pl-10 ">20</td>
                <td class="  !text-right  !pl-10 ">20</td>

                <td class="  !text-right !pl-10">{row.final_exam_date}</td>
                <td class="  !text-right !pl-10 ">{row.midterm_exam_date}</td>
                <td class="  !text-right !pl-10">
                  {row.schedules.map((i, k) => i.time)}
                </td>
                <td class="  !text-right !pl-10">
                  {row.schedules.map((i, k) => i.day)}
                </td>
                <td class="  !text-right !pl-10">{row.semester.end_date}</td>
                <td class="  !text-right !pl-8">{row.semester.start_date}</td>
                <td class="  !text-right ">{row.master.first_name}</td>
                <td class="  !text-right !pr-8 ">{row.name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <div>لطفا لاگ ین کنید اول</div>
  );
}

export default MasterCourse;
