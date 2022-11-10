import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../components/modal";
import { useCourses } from "../hook/course";
import { useCurrentUser } from "../hook/currentUser";
import { useMajors } from "../hook/major";
import { useMasters } from "../hook/masters";
import { useSemesters } from "../hook/semester";

function Courses() {
  const [refresh, setRefresh] = useState();
  const { data } = useCourses(refresh);
  const { data: masters } = useMasters();
  const { data: majors } = useMajors();
  const { data: semesters } = useSemesters();

  const { data: currentUser } = useCurrentUser();
  console.log(currentUser, "currentUser");

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
    term: "",
    classStart: "",
    classEnd: "",
    classToday: "",
    classClock: "",
    minTerm: "",
    endTerm: "",
    price: "",
  });
  const handleSubmit1 = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/student/student/take_course/",
        {
          student_semester_id: 1,
          course_id: id,
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
  const [id, setsetId] = useState();

  console.log("val", id);
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
          master_id: 2,

          documents: [],
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
        setRefresh(!refresh);
        alert("درس اتخاب شد");
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

  return (
    <>
      {location.pathname === "/master" ? (
        <button
          type="button"
          
          class="btn !w-40 !h-12   !bg-slate-300  float-right m-2"
          onClick={(e) => {
            modalOpen(e);
          }}
        >
          <i class="">اضافه کردن درس</i>
        </button>
      ) : (
        ""
      )}
      <Modal show={state.modal} handleClose={(e) => modalClose(e)}>
        <div class=" text-center text-indigo-900 border border-indigo-800 mt-3 mx-3 h-10 ">
          اضافه کردن درس
        </div>
        <div className=" ml-5 mr-5 grid grid-cols-3 gap-10 ">
          <div>
            <label>رشته</label>
            <select
              defaultValue={currentUser.collage}
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
              onChange={(e) => setValus({ ...values, major: e.target.value })}
            >
              <option>انتخاب</option>
              {majors?.map((i, b) => (
                <option value={i.id}>{i?.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>نام کلاس</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control  "
              onChange={(e) =>
                setValus({ ...values, className: e.target.value })
              }
            />
          </div>
          <div>
            <label>نام استاد</label>
            <select
              // defaultValue={currentUser.collage}
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
              onChange={(e) => {
                setValus({ ...values, masterName: 1 });
              }}
            >
              <option>انتخاب</option>
              {masters?.map((i, b) => (
                <option value={1}>{i?.first_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>جزئیات</label>

            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, details: e.target.value })}
            />
          </div>
          <div>
            <label>تعداد واحد</label>
            <input
              type="number"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) =>
                setValus({ ...values, unitCount: e.target.value })
              }
            />
          </div>

          <div>
            <label>ترم</label>
            <select
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
              onChange={(e) => setValus({ ...values, term: e.target.value })}
            >
              {semesters?.map((i, b) => (
                <option value={i.id}>{i?.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>شروع کلاس</label>
            <input
              type="date"
              value={semesters.start_date}
              name="modalInputName"
              className="form-control "
              onChange={(e) =>
                setValus({ ...values, classStart: e.target.value })
              }
            />
          </div>
          <div>
            <label>اتمام کلاس</label>
            <input
              type="date"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) =>
                setValus({ ...values, classEnd: e.target.value })
              }
            />
          </div>
          <div>
            <label>روز کلاس</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) =>
                setValus({ ...values, classToday: e.target.value })
              }
            />
          </div>
          <div>
            <label>ساعت کلاس</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) =>
                setValus({ ...values, classClock: e.target.value })
              }
            />
          </div>
          <div>
            <label>امتحان میانترم</label>
            <input
              type="date"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, minTerm: e.target.value })}
            />
          </div>
          <div>
            <label>امتحان پایانترم</label>
            <input
              type="date"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, endTerm: e.target.value })}
            />
          </div>
          <div>
            <label>قیمت</label>
            <input
              type="number"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, price: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group !mx-2">
          <button
            className="btn btn-success  mt-3"
            onClick={(e) => handleSubmit(e)}
            type="button"
          >
            Save
          </button>
          <button
            href="javascript:"
            className="btn btn-danger ml-2 mt-3 "
            onClick={(e) => modalClose(e)}
          >
            close
          </button>
        </div>
      </Modal>
      <table class="table !text-right   mt-3">
        <thead className="bg-slate-500">
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
              <tr>
                {location.pathname !== "/master" ? (
                  <td class="  !text-right  !w-1 !pr-2">
                    <button
                      onClick={(e) => {
                        handleSubmit1(e);
                        setsetId(row.id);
                      }}
                      type="button"
                      class="btn !w-28 !bg-slate-400 border  text-slate-900"
                    >
                      <i class="">انتخاب واحد</i>
                    </button>
                  </td>
                ) : (
                  ""
                )}

                <td class="  !text-right   !w-20">{row.price}</td>
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
