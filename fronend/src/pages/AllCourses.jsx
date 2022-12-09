import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  toFarsiNumber,
  toGregorianDate,
  toGregorianDate1,
  toJalaali,
} from "../constants/unit";
import { useCourses } from "../hook/course";
import { useCurrentUser } from "../hook/currentUser";
import { useSemesters } from "../hook/semester";

function AllCourses() {
  const { data } = useCourses();

  const { data: semesters } = useSemesters();

  const { data: currentUser } = useCurrentUser();

  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });
  const access = localStorage.getItem("flag");
  const accesss = localStorage.getItem("access");

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

  const location = useLocation();

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
          midterm_exam_date: toGregorianDate(values.minTerm),
          final_exam_date: toGregorianDate(values.endTerm),
          price: values.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${accesss}`,

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

  return access === "true" ? (
    <>
      <table class="table !text-right   mt-3">
        <thead className="bg-slate-500">
          <tr>
            <th class="col  !text-right  ">{"قیمت"}</th>
            <th class="col !text-right !w-[10rem]">{"امتحان پایان ترم"}</th>
            <th class="col !text-right !w-[10.8rem]">{"امتحان میانترم"}</th>
            <th class="col !text-right !w-[8rem]">{"ساعت کلاس"}</th>
            <th class="col !text-right !w-[9rem]">{"روز کلاس"}</th>
            <th class="col !text-right  !w-[11rem]">{"اتمام کلاس"}</th>
            <th class="col !text-right !w-[10rem]">{"شروع کلاس"}</th>
            <th class="col !text-right !w-[6.5rem]">{"ترم"}</th>
            <th class="col !text-right !w-[7rem]">{"دوره"}</th>
            <th class="col !text-right !w-[9rem] ">{"تعداد واحد"}</th>
            <th class="col !text-right !w-[5.5rem] ">{"نام استاد"}</th>
            <th class="col  !text-right !pr-8 !w-[10rem] ">{"نام کلاس"}</th>
          </tr>
        </thead>
      </table>
      <table id="myTable" class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr>
                {location.pathname !== "/master" ? "" : ""}

                <td class="  !text-right   !w-20  ">
                  {toFarsiNumber(row.price.toLocaleString())}
                </td>
                <td class="  !text-right !w-24 !pr-5 ">
                  {toJalaali(row.final_exam_date)}
                </td>
                <td class="  !text-right !w-20 !pr-4 ">
                  {toJalaali(row.midterm_exam_date)}
                </td>
                <td class="  !text-right !w-20 ">
                  {row.schedules.map((i, k) => toFarsiNumber(i.time))}
                </td>
                <td class="  !text-right !w-24  !pr-8 ">
                  {row.schedules.map((i, k) =>
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
                  {toJalaali(row.semester.end_date)}
                </td>
                <td class="  !text-right !w-20 ">
                  {toJalaali(row.semester.start_date)}
                </td>
                <td class="  !text-right  !w-14 ">{row.semester.name}</td>
                <td class="  !text-right !pr-5 !w-20 ">
                  {row.major.degree === "BACHELOR" ? "لیسانس" : "فوق لیسانس"}
                </td>
                <td class="  !text-right  !w-16 ">{toFarsiNumber(row.unit)}</td>
                <td class="  !text-right !w-16 ">{row.master.first_name}</td>
                <td class="  !text-right !pr-8 !w-20 ">{row.name}</td>
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

export default AllCourses;
