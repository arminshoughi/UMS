import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../components/modal";

import {
  TIME,
  toFarsiNumber,
  toGregorianDate,
  toGregorianDate1,
  toJalaali,
  WEAK,
} from "../constants/unit";
import { useCourses } from "../hook/course";
import { HiX } from "react-icons/hi";
import { useCurrentUser } from "../hook/currentUser";
import { useMajors } from "../hook/major";
import { useMasters } from "../hook/masters";
import { useSemesters } from "../hook/semester";

function Courses() {
  const access = localStorage.getItem("flag");
  const accesss = localStorage.getItem("access");

  const [refresh, setRefresh] = useState();
  const { data } = useCourses(refresh);
  const { data: masters } = useMasters();

  const { data: majors } = useMajors();
  const { data: semesters } = useSemesters();
  const { data: currentUser } = useCurrentUser();
  console.log(currentUser, "useCurrentUser");
  const [rowId, setRowId] = useState();
  const handleSubmitRemove = (e) => {
    e.preventDefault();

    axios
      .delete(
        `http://127.0.0.1:8000/api/share/courses/${rowId}/`,

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
        alert("درس با موفقیت حذف شد");
        setRefresh(!refresh);
      })
      .catch((error) => {
        alert("درس انتخاب شده به دلایل نامشخص حذف نشد دوباره تکرار کنید");
      });
  };

  const [state, setState] = useState({
    modal: false,
    update: false,
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
    price: 0,
  });
  const [courses, setData] = useState([]);
  console.log(values.unitCount, "asdasd");
  const getData = () => {
    axios
      .get("http://127.0.0.1:8000/api/share/courses/18/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5NzUxNjE3LCJqdGkiOiJkMjNiNzNjOTZiNDM0YmI3OWNjYzIwOWRjY2FlNGJmYiIsInVzZXJfaWQiOjJ9.D21CLenM3F-hsJSIzavUKENNj9kn4u-KF7wgwkodbZM`,

          "X-CSRFToken":
            "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
        },
      })
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (err) {
        if (err.response) {
          console.error("Res Error: ", err.response.status);
        } else if (err.request) {
          console.error("Req Error");
        } else {
          console.error("Error: ", err.message);
        }
      });
  };
  console.log(courses, "sadasdasd");
  const handleSubmit1 = (e) => {
    e.preventDefault();

    axios
      .post(
        "/127.0.0.1:8000/api/student/student/take_course/",
        {
          student_semester_id: 1,
          course_id: id,
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
        alert("درس با موفقیت انتخاب شد");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const [id, setsetId] = useState();
  const [name, setName] = useState();
  const [value, setValue] = useState(name?.major.id.toString());
  const location = useLocation();

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .patch(
        `http://127.0.0.1:8000/api/share/courses/${rowId}/`,
        {
          major_id: Number(values.major),

          name: values.className,
          details: values.details,
          unit: values.unitCount,
          master_id: currentUser.id,

          schedules: [
            {
              day: values.classToday,
              time: values.classClock,
            },
          ],
          midterm_exam_date: toGregorianDate1(values.minTerm),
          final_exam_date: toGregorianDate1(values.endTerm),
          price: Number(values.price),
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
        alert("با موفقیت ثبت شد");
      })
      .catch((error) => {
        alert("به مشکل خوردیم");
      });
  };

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
          master_id: currentUser.id,

          documents: [],
          schedules: [
            {
              day: values.classToday,
              time: values.classClock,
            },
          ],
          midterm_exam_date: toGregorianDate1(values.minTerm),
          final_exam_date: toGregorianDate1(values.endTerm),
          price: Number(values.price),
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
        setRefresh(!refresh);
        alert("درس اضافه شد");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const modalOpen = () => {
    setState({ modal: true });
  };
  const modalOpenUpdate = () => {
    setState({ update: true });
  };

  const modalClose = () => {
    setState({
      modalInputName: "",
      modal: false,
    });
  };

  return access === "true" ? (
    <>
      {location.pathname === "/master" ? (
        <button
          type="button"
          class="btn !w-40 !h-12  !bg-slate-300  float-right mr-9 mb-3 mt-3"
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
        <div className="ml-4 -mt-8 fixed ">
          <HiX onClick={(e) => modalClose(e)} className="w-6 h-6" />
        </div>
        <div class=" text-center mt-10  text-indigo-900 border border-indigo-800 pt-2  mx-3 h-10 ">
          اضافه کردن درس
        </div>
        <div className=" mt-2 ml-5 mr-5 grid grid-cols-3 gap-10 ">
          <div>
            <label className="ml-[12.8rem]">رشته</label>
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
            <label className="ml-[11.5rem]">نام کلاس</label>
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
            <label className="ml-[12rem]">نام استاد</label>
            <input
              disabled
              // defaultValue={currentUser.collage}
              value={currentUser.first_name}
              className="form-control "
              aria-label=".form-select-lg example"
            ></input>
          </div>
          <div>
            <label className="ml-48">جزئیات</label>

            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, details: e.target.value })}
            />
          </div>
          <div>
            <label className="ml-[11.1rem]">تعداد واحد</label>
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
            <label className="ml-[13.5rem]">ترم</label>
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
            <label className="ml-44">روز کلاس</label>
            <select
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
              onChange={(e) =>
                setValus({ ...values, classToday: e.target.value })
              }
            >
              {Object.entries(WEAK).map(([i, v]) => (
                <option value={i}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="ml-[10.5rem]">ساعت کلاس</label>
            <select
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
              onChange={(e) =>
                setValus({ ...values, classClock: e.target.value })
              }
            >
              {Object.entries(TIME).map(([i, v]) => (
                <option value={i}>{toFarsiNumber(v)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="ml-40">امتحان میانترم</label>
            <input
              type="date"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, minTerm: e.target.value })}
            />
          </div>
          <div>
            <label className="ml-40">امتحان پایانترم</label>
            <input
              type="date"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, endTerm: e.target.value })}
            />
          </div>
          <div>
            <label className="ml-52">قیمت</label>
            <input
              type="number"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, price: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group !ml-[70%] !mx-2">
          <button
            className="btn btn-success  w-24 ml-3 mb-3 mt-3"
            onClick={(e) => handleSubmit(e)}
            type="button"
          >
            ذخیره
          </button>
          <button
            href="javascript:"
            className="btn btn-danger ml-2 w-24 mb-3 mt-3 "
            onClick={(e) => modalClose(e)}
          >
            انصراف
          </button>
        </div>
      </Modal>
      <Modal show={state.update} handleClose={(e) => modalClose(e)}>
        <div className="ml-4 -mt-8 fixed ">
          <HiX
            onClick={(e) => {
              modalClose(e);
            }}
            className="w-6 h-6"
          />
        </div>
        {/* <div class=" text-center mt-10  text-indigo-900 border border-indigo-800 pt-2  mx-3 h-10 ">
          ویرایش کردن درس
        </div> */}
        <div className=" mt-2 ml-5 mr-5 grid grid-cols-3 gap-10 ">
          <div>
            <label className="ml-[12.8rem]">رشته</label>
            <select
              value={value}
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
            <label className="ml-[11.5rem]">نام کلاس</label>

            <input
              type="text"
              defaultValue={name?.name}
              name="modalInputName"
              className="form-control  "
              onChange={(e) =>
                setValus({ ...values, className: e.target.value })
              }
            />
          </div>
          <div>
            <label className="ml-[12rem]">نام استاد</label>

            <select
              value={name?.master.first_name.toString()}
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
            <label className="ml-48">جزئیات</label>

            <input
              defaultValue={name?.details}
              type="text"
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, details: e.target.value })}
            />
          </div>
          <div>
            <label className="ml-[11.1rem]">تعداد واحد</label>
            <input
              defaultValue={name?.unit}
              type="number"
              name="modalInputName"
              className="form-control "
              onChange={(e) =>
                setValus({ ...values, unitCount: e.target.value })
              }
            />
          </div>

          <div>
            <label className="ml-[13.5rem]">ترم</label>
            <select
              value={value}
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
              onChange={(e) => {
                setValus({ ...values, term: e.target.value });
              }}
            >
              {semesters?.map((i, b) => (
                <option>{i?.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="ml-44">روز کلاس</label>

            <select
              defaultValue={name?.schedules.map((i) => i.day).toString()}
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
              onChange={(e) =>
                setValus({ ...values, classToday: e.target.value })
              }
            >
              {Object.entries(WEAK).map(([i, v]) => (
                <option value={i}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="ml-[10.5rem]">ساعت کلاس</label>

            <select
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
              onChange={(e) =>
                setValus({ ...values, classClock: e.target.value })
              }
            >
              {Object.entries(TIME).map(([i, v]) => (
                <option value={i}>{toFarsiNumber(v)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="ml-40">امتحان میانترم</label>

            <input
              type="date"
              defaultValue={name?.midterm_exam_date}
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, minTerm: e.target.value })}
            />
          </div>
          <div>
            <label className="ml-36">امتحان پایان ترم</label>
            <input
              defaultValue={name?.final_exam_date}
              type="date"
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, endTerm: e.target.value })}
            />
          </div>
          <div>
            <label className="ml-52">قیمت</label>

            <input
              defaultValue={name?.price}
              type="number"
              name="modalInputName"
              className="form-control "
              onChange={(e) => setValus({ ...values, price: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group !ml-[70%] !mx-2">
          <button
            className="btn btn-success  w-24 ml-3 mb-3 mt-3"
            onClick={(e) => handleUpdate(e)}
            type="button"
          >
            ذخیره
          </button>
          <button
            href="javascript:"
            className="btn btn-danger ml-2 w-24 mb-3 mt-3 "
            onClick={(e) => modalClose(e)}
          >
            انصراف
          </button>
        </div>
      </Modal>
      <table class="table !text-right   mt-3">
        <thead className="bg-slate-500">
          <tr>
            {location.pathname !== "/master" ? (
              <th class="col  !text-right !w-28" scope="col"></th>
            ) : (
              ""
            )}
            <th class="col   !text-right !pr-8 !w-20"></th>
            <th class="col  !text-right !pr-8 !w-20"></th>
            <th class="col  !text-right    ">{"قیمت"}</th>
            <th class="col !text-right !w-[13rem] !pr-14">
              {"امتحان پایان ترم"}
            </th>
            <th class="col !text-right !w-[8rem]">{"امتحان میانترم"}</th>
            <th class="col !text-right !w-[15rem] !pr-24">{"ساعت کلاس"}</th>
            <th class="col !text-right !w-[10rem] !pr-20">{"روز کلاس"}</th>
            <th class="col !text-right !w-[8.3rem] !pr-12 ">{"اتمام کلاس"}</th>
            <th class="col !text-right !w-[8.3rem] !pr-3">{"شروع کلاس"}</th>
            <th class="col !text-right !w-[8rem] !pr-12">{"ترم"}</th>
            <th class="col !text-right !w-[10rem] !pr-20">{"دوره"}</th>
            <th class="col !text-right !w-[6.4rem] !pr-10">{"تعداد واحد"}</th>
            <th class="col !text-right !w-24 !pr-10 "> {"نام استاد"}</th>
            <th class="col !pr-8 !w-32 !text-right ">{"نام کلاس"}</th>
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
                      class="btn !w-28  !bg-slate-400 border  text-slate-900"
                    >
                      <i class="">انتخاب واحد</i>
                    </button>
                  </td>
                ) : (
                  <td class="  !text-right  !w-1 !pr-2">
                    <div className="flex">
                      <button
                        onClick={(e) => {
                          setRowId(row.id);
                          handleSubmitRemove(e);
                        }}
                        type="button"
                        class="btn !w-28 me-3 ml-3 !bg-slate-400 border  text-slate-900"
                      >
                        <i class="">حذف درس</i>
                      </button>

                      {/* <button
                        onClick={(e) => {
                          setName(row);
                          modalOpenUpdate(e);
                          setRowId(row.id);
                        }}
                        type="button"
                        class="btn  !w-28 !bg-slate-400 border  text-slate-900"
                      >
                        <i class="">ویرایش درس</i>
                      </button> */}
                    </div>
                  </td>
                )}

                <td class="  !text-right   !w-20">
                  {toFarsiNumber(row.price.toLocaleString())}
                </td>
                <td class="  !text-right !w-24 !pr-5">
                  {toJalaali(row.final_exam_date)}
                </td>
                <td class="  !text-right !w-20 !pr-4">
                  {toJalaali(row.midterm_exam_date)}
                </td>
                <td class="  !text-right !w-24">
                  {row.schedules.map((i, k) => toFarsiNumber(i.time))}
                </td>
                <td class="  !text-right !w-24  !pr-8">
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
                <td class="  !text-right !w-20 !pr-5">
                  {toJalaali(row.semester.end_date)}
                </td>
                <td class="  !text-right !w-20">
                  {toJalaali(row.semester.start_date)}
                </td>
                <td class="  !text-right  !w-14">{row.semester.name}</td>
                <td class="  !text-right !pr-5 !w-20">
                  {row.major.degree === "BACHELOR" ? "لیسانس" : "فوق لیسانس"}
                </td>
                <td class="  !text-right  !w-16">{toFarsiNumber(row.unit)}</td>
                <td class="  !text-right !w-16">{row.master.first_name}</td>
                <td class="  !text-right !pr-8 !w-20">{row.name}</td>
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

export default Courses;
