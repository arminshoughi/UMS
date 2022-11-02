import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../components/modal";
import { useCourseTable } from "../hook/course";
import { useCurrentUserTable } from "../hook/currentUser";
import { useMajorTable } from "../hook/major";
import { useSemesterTable } from "../hook/semester";

function Courses() {
  const { data } = useCourseTable();
  const { data: major } = useMajorTable();
  const { data: semester } = useSemesterTable();

  const { data: currentUser } = useCurrentUserTable();
  console.log(currentUser, "currentUser");

  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });

  const location = useLocation();

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
    semester.map((i) => i.start_date),
    "semester.start_date"
  );
  return (
    <>
      <button
        type="button"
        class="btn !w-full !h-12   btn-primary"
        onClick={(e) => modalOpen(e)}
      >
        <i class="">اظافه کردن درس</i>
      </button>
      <Modal show={state.modal} handleClose={(e) => modalClose(e)}>
        <div class=" text-center text-indigo-900 border border-indigo-800 mt-3 mx-3 h-10">
          {" "}
          اضافه کردن درس
        </div>
        <div className=" ml-5 mr-5 grid grid-cols-3 gap-10 ">
          <div>
            <label>رشته</label>
            <select
              defaultValue={currentUser.collage}
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
            >
              {major?.map((i, b) => (
                <option
                  defaultValue={i.id === currentUser.collage ? i.name : ""}
                >
                  {i?.name}
                </option>
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
            />
          </div>
          <div>
            <label>نام استاد</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
            />
          </div>
          <div>
            <label>تعداد واحد</label>
            <input
              type="number"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
            />
          </div>
          <div>
            <label>دوره</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
            />
          </div>
          <div>
            <label>ترم</label>
            <select
              className="form-select form-select-lg  h-10"
              aria-label=".form-select-lg example"
            >
              {semester?.map((i, b) => (
                <option
                  defaultValue={i.id === currentUser.collage ? i.name : ""}
                >
                  {i?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>شروع کلاس</label>
            <input
              type="text"
              value={semester.start_date}
              name="modalInputName"
              className="form-control "
            />
          </div>
          <div>
            <label>اتمام کلاس</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
            />
          </div>
          <div>
            <label>روز کلاس</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
            />
          </div>
          <div>
            <label>ساعت کلاس</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
            />
          </div>
          <div>
            <label>امتحان میانترم</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
            />
          </div>
          <div>
            <label>امتحان پایانترم</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
            />
          </div>
          <div>
            <label>قیمت</label>
            <input
              type="text"
              value={state.modalInputName}
              name="modalInputName"
              className="form-control "
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
              <tr>
                {location.pathname !== "/master" ? (
                  <td class="  !text-right  !w-1 !pr-2">
                    <button type="button" class="btn !w-28 btn-primary">
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
