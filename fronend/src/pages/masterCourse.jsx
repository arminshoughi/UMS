import axios from "axios";
import React from "react";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import Modal, { ModalGrade } from "../components/modal";
import { toFarsiNumber, toJalaali } from "../constants/unit";
import { useCourses } from "../hook/course";
import { useGetCourse } from "../hook/getCource";
import { useMasterCourses } from "../hook/masterCourse";
import { useSemesters } from "../hook/semester";

function MasterCourse() {
  const { data } = useMasterCourses();

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

  const access = localStorage.getItem("flag");
  const accesss = localStorage.getItem("access");

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

  const HandleGrade = (e) => {
    e.preventDefault();
    setState({ name: state.modalInputName });
    modalClose();
    axios
      .put(
        `http://127.0.0.1:8000/api/master/student-grade/${id}/`,
        {
          final_exam_grade: final.className,
          midterm_exam_grade: min.className,
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${accesss}`,
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
  const [min, setMin] = useState(0);
  const [final, setFinal] = useState(0);

  const [id, setsetId] = useState();
  const [name, setName] = useState();
  console.log(name, "Asdasd");
  const [, setCourse] = useState();
  const [, setStudentSemesterId] = useState();

  const modalClose = () => {
    setState({
      modalInputName: "",
      modal: false,
    });
  };

  return access === "true" ? (
    <>
      <ModalGrade show={state.modal} handleClose={(e) => modalClose(e)}>
        <div className="ml-4 -mt-8 fixed ">
          <HiX
            onClick={(e) => {
              modalClose(e);
            }}
            className="w-6 h-6"
          />
        </div>
        <div class=" text-center mt-10 text-indigo-900 border border-indigo-800  mx-3 h-10 ">
          نمره میانترم
        </div>
        <div className=" ml-5 mt-2 mr-5 float-right gap-10 ">
          <label>{` نمره را با دو رقم
            اعشار وارد کنید ${name}استاد عزیز جهت وارد کردن نمره میانترم  `}</label>
        </div>
        <div className="flex ml-40 mt-16">
          <input
            min="0"
            max="20"
            step=".01"
            type="number"
            name="minTerm"
            className="form-control  !w-44 "
            onChange={(e) => setMin({ ...values, className: e.target.value })}
          />
          <label className="ml-5 mt-1">:نمره میانترم</label>
        </div>
        <div className="form-group flex mt-7 !mx-2">
          <button
            className="btn btn-success  ml-[8.6rem] w-24 mt-3"
            onClick={(e) => HandleGrade(e)}
            type="button"
          >
            ذخیره
          </button>
          <button
            className="btn btn-danger w-24 ml-2 mt-3 "
            onClick={(e) => modalClose(e)}
          >
            انصراف
          </button>
        </div>
      </ModalGrade>
      <ModalGrade show={state.final} handleClose={(e) => modalClose(e)}>
        <div className="ml-4 -mt-8 fixed ">
          <HiX onClick={(e) => modalClose(e)} className="w-6 h-6" />
        </div>
        <div class=" text-center mt-10 text-indigo-900 border border-indigo-800  mx-3 h-10 ">
          نمره میانترم
        </div>
        <div className=" ml-5 mt-2 mr-5 float-right gap-10 ">
          <label>{` نمره را با دو رقم
            اعشار وارد کنید ${name}استاد عزیز جهت وارد کردن نمره میانترم  `}</label>
        </div>
        <div className="flex ml-40 mt-16">
          <input
            min="0"
            max="20"
            step=".01"
            type="number"
            name="minTerm"
            className="form-control  !w-44 "
            onChange={(e) => setFinal({ ...values, className: e.target.value })}
          />
          <label className="ml-5 mt-1">:نمره پایانترم</label>
        </div>
        <div className="form-group flex mt-7 !mx-2">
          <button
            className="btn btn-success  ml-[8.6rem] w-24 mt-3"
            onClick={(e) => HandleGrade(e)}
            type="button"
          >
            ذخیره
          </button>
          <button
            className="btn btn-danger w-24 ml-2 mt-3 "
            onClick={(e) => modalClose(e)}
          >
            انصراف
          </button>
        </div>
      </ModalGrade>
      <table class="table !text-right  table-striped table-dark mt-3">
        <thead className="!bg-slate-500">
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
            <th class="col !text-right !pr-16">{"نمره پایان ترم"}</th>
            <th class="col !text-right !w-[20rem] !pr-44 ">{"نمره میانترم"}</th>
            <th class="col !text-right !w-[15rem] !pr-36">
              {"امتحان پایان ترم"}
            </th>
            <th class="col !text-right !w-[14rem] !pr-24 ">
              {"امتحان میانترم"}
            </th>
            <th class="col !text-right  !w-[11rem] ">{"نام دانشجو"}</th>
            <th class="col  !text-right !pr-8 !w-[16rem]">{"نام کلاس"}</th>
          </tr>
        </thead>
      </table>
      <table id="myTable" class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((i) => (
            <>
              <tr>
                <td>
                  <div className="!text-right  !w-60 gap-3  flex">
                    <button
                      onClick={(e) => {
                        finalOpen(e);
                        setsetId(i.id);
                        setCourse(data.map(i.course.id));
                        setStudentSemesterId(i.student_semester.id);
                      }}
                      type="button"
                      class="btn !w-28 btn-primary"
                    >
                      <i class="">نمره پایانترم</i>
                    </button>

                    <button
                      onClick={(e) => {
                        modalOpen(e);
                        setsetId(i.id);
                        setName(i.student_semester.student.first_name);
                        setCourse(data.map(i.course.id));
                        setStudentSemesterId(i.student_semester.id);
                      }}
                      type="button"
                      class="btn !w-28  btn-primary"
                    >
                      <i class="">نمره میانترم</i>
                    </button>
                  </div>
                </td>

                <td class="  !text-right   !pl-10 ">
                  {toFarsiNumber(
                    i.final_exam_grade === 0 ? "وارد نشده" : i.final_exam_grade
                  )}
                </td>
                <td class="  !text-right  !pl-10 ">
                  {toFarsiNumber(
                    i.midterm_exam_grade === 0
                      ? "وارد نشده"
                      : i.midterm_exam_grade
                  )}
                </td>

                <td class="  !text-right !pl-10">
                  {toJalaali(i.course?.final_exam_date)}
                </td>
                <td class="  !text-right !pl-10 ">
                  {toJalaali(i.course?.midterm_exam_date)}
                </td>

                <td class="  !text-right !pl-8 ">
                  {i.student_semester.student.last_name}
                </td>

                <td class="  !text-right  ">
                  {i.student_semester.student.first_name}
                </td>
                <td class="  !text-right !pr-8 ">{i.course.name}</td>
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
