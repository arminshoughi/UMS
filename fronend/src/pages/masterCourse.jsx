import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../components/modal";
import { toFarsiNumber, toJalaali } from "../constants/unit";
import { useCourses } from "../hook/course";
import { useGetCourse } from "../hook/getCource";
import { useSemesters } from "../hook/semester";

function MasterCourse() {
  const { data } = useCourses();
  const { data: nomre } = useGetCourse();

  const { data: semesters } = useSemesters();

  const [state, setState] = useState({
    final: false,
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
  const finalOpen = () => {
    setState({ final: true });
  };
  const [name, setName] = useState();
  console.log(name, "asd");
  const modalClose = () => {
    setState({
      modalInputName: "",
      modal: false,
    });
  };

  return access === "true" ? (
    <>
      <Modal show={state.modal} handleClose={(e) => modalClose(e)}>
        <div class=" text-center text-indigo-900 border border-indigo-800 mt-3 mx-3 h-10 ">
          نمره میانترم
        </div>
        <div className=" ml-5 mt-2 mr-5 float-right gap-10 ">
          <label>
            استاد عزیز جهت وارد کردن نمره میانترم این خره نمره را با دو رقم
            اعشار وارد کنید
          </label>
        </div>
        <div className="flex ml-40 mt-5">
          <input
            min="0"
            max="20"
            step=".01"
            type="number"
            name="minTerm"
            className="form-control  !w-44 "
          />
          <label className="ml-5 mt-1">:نمره میانترم</label>
        </div>
        <div className="form-group flex mt-10 !mx-2">
          <button
            className="btn btn-success  mt-3"
            onClick={(e) => handleSubmit(e)}
            type="button"
          >
            ذخیره
          </button>
          <button
            className="btn btn-danger ml-2 mt-3 "
            onClick={(e) => modalClose(e)}
          >
            انصراف
          </button>
        </div>
      </Modal>
      <Modal show={state.final} handleClose={(e) => modalClose(e)}>
        <div class=" text-center text-indigo-900 border border-indigo-800 mt-3 mx-3 h-10 ">
          نمره پایانترم
        </div>
        <div className=" ml-5 mt-2 mr-5 float-right gap-10 ">
          <label>
            استاد عزیز جهت وارد کردن نمره پایانترم این خره نمره را با دو رقم
            اعشار وارد کنید
          </label>
        </div>
        <div className="flex ml-40 mt-5">
          <input
            min="0"
            max="20"
            step=".01"
            type="number"
            name="minTerm"
            className="form-control  !w-44 "
          />
          <label className="ml-5 mt-1">:نمره پایان ترم</label>
        </div>
        <div className="form-group flex mt-10 !mx-2">
          <button
            className="btn btn-success  mt-3"
            onClick={(e) => handleSubmit(e)}
            type="button"
          >
            ذخیره
          </button>
          <button
            className="btn btn-danger ml-2 mt-3 "
            onClick={(e) => modalClose(e)}
          >
            انصراف
          </button>
        </div>
      </Modal>
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
            <th class="col !text-right ">{"نمره پایان ترم"}</th>
            <th class="col !text-right !w-[5rem] ">{"نمره میانترم"}</th>
            <th class="col !text-right !w-[10rem] ">{"امتحان پایان ترم"}</th>
            <th class="col !text-right !w-[10rem] ">{"امتحان میانترم"}</th>
            <th class="col !text-right !w-[10.6rem]">{"ساعت کلاس"}</th>
            <th class="col !text-right !w-[8rem]">{"روز کلاس"}</th>
            <th class="col !text-right  !w-[9rem]">{"اتمام کلاس"}</th>
            <th class="col !text-right !w-[10rem]">{"شروع کلاس"}</th>
            <th class="col !text-right  !w-[6rem]">{"نام دانشجو"}</th>
            <th class="col  !text-right !pr-8 !w-[9rem]">{"نام کلاس"}</th>
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
                      onClick={(e) => {
                        finalOpen(e);
                        setName(row);
                      }}
                      type="button"
                      class="btn !w-28 btn-primary"
                    >
                      <i class="">نمره پایانترم</i>
                    </button>
                    <button
                      onClick={(e) => {
                        modalOpen(e);
                        setName(row);
                      }}
                      type="button"
                      class="btn !w-28  btn-primary"
                    >
                      <i class="">نمره میانترم</i>
                    </button>
                  </div>
                </td>

                <td class="  !text-right   !pl-10 ">{toFarsiNumber(20)}</td>
                <td class="  !text-right  !pl-10 ">{toFarsiNumber(20)}</td>

                <td class="  !text-right !pl-10">
                  {toJalaali(row.final_exam_date)}
                </td>
                <td class="  !text-right !pl-10 ">
                  {toJalaali(row.midterm_exam_date)}
                </td>
                <td class="  !text-right !pl-10">
                  {row.schedules.map((i, k) => toFarsiNumber(i.time))}
                </td>
                <td class="  !text-right !pl-10">
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
                <td class="  !text-right !pl-10">
                  {toJalaali(row.semester.end_date)}
                </td>
                <td class="  !text-right !pl-8">
                  {toJalaali(row.semester.start_date)}
                </td>
                <td class="  !text-right ">{row.master.first_name}</td>
                <td class="  !text-right !pr-8 ">{row.name}</td>
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

export default MasterCourse;
