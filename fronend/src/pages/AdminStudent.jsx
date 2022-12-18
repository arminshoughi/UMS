import axios from "axios";
import React from "react";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import ModalAdd from "../components/modal";
import { toJalaali } from "../constants/unit";
import { useStudent } from "../hook/AdminStudent";

import { useCollage } from "../hook/collage";
function Student() {
  const { data } = useStudent();
  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [rowId, setRowId] = useState();

  const [firstName, setFirstName] = useState();

  const [lastName, setLastName] = useState();

  const [collage, setCollage] = useState();

  const [major, setMajor] = useState();

  const [nationalCode, setNationalCode] = useState();

  const [sex, setSex] = useState("Male");
  const [birthday, setBirthday] = useState();

  const handleSubmitRemove = (e) => {
    e.preventDefault();

    axios
      .delete(
        `http://127.0.0.1:8000/api/student/student/${rowId}/`,

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
        alert("دانشجو با موفقیت حذف شد");
      })
      .catch((error) => {
        alert("دانشجو انتخاب شده به دلایل نامشخص حذف نشد دوباره تکرار کنید");
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
  const accesss = localStorage.getItem("access");

  const handleSubmit1 = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/student/student/",
        {
          username: username,
          password: password,
          first_name: firstName,
          last_name: lastName,
          collage: 1,
          major: 1,
          national_code: nationalCode,
          sex: sex,
          birthday: birthday,
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
        alert("با موفقیت افزوده شد.");
      })
      .catch((error) => {
        alert(" لطفا مجدد تلاش کنید.");
      });
  };

  return (
    <>
      <button
        onClick={(e) => modalOpen(e)}
        className="w-32 h-16 !bg-slate-400 p-1  btn float-right m-2"
      >
        اضافه کردن دانشجو
      </button>
      <ModalAdd show={state.modal} handleClose={(e) => modalClose(e)}>
        <div className="ml-4 -mt-8 fixed ">
          <HiX onClick={(e) => modalClose(e)} className="w-6 h-6 mt-10" />
        </div>
        <div className="flex"></div>
        <div class=" text-center mt-10  text-indigo-900 border border-indigo-800 pt-2  mx-3 h-10 ">
          اضافه کردن دانشجو
        </div>
        <div className=" mt-4 ml-36 mr-5 flex   ">
          <input
            type="text"
            value={state.modalInputName}
            name="modalInputName"
            className="form-control !w-80"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="ml-[1rem] mt-1.5">userName</label>
        </div>
        <div className=" mt-4 ml-36 mr-5 flex   ">
          <input
            type="text"
            value={state.modalInputName}
            name="modalInputName"
            className="form-control !w-80"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="ml-[1rem] mt-1.5">password</label>
        </div>
        <div className=" mt-4 ml-36 mr-5 flex   ">
          <input
            type="text"
            value={state.modalInputName}
            name="modalInputName"
            className="form-control !w-80"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="ml-[1rem] mt-1.5">نام</label>
        </div>
        <div className=" mt-4 ml-36 mr-5 flex   ">
          <input
            type="text"
            value={state.modalInputName}
            name="modalInputName"
            className="form-control !w-80"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="ml-[1rem] mt-1.5">فامیل</label>
        </div>
        <div className="mt-4 ml-36 mr-5 flex">
          <input
            type="text"
            name="national_code"
            className="form-control !w-80"
            onChange={(e) => setCollage(e.target.value)}
            id="national_code"
          />
          <label htmlFor="national_code" className="ml-[1rem] mt-1.5">
            دانشگاه
          </label>
        </div>

        <div className="mt-4 ml-36 mr-5 flex">
          <input
            type="text"
            name="national_code"
            className="form-control !w-80"
            id="national_code"
            onChange={(e) => setMajor(e.target.value)}
          />
          <label htmlFor="national_code" className="ml-[1rem] mt-1.5">
            رشته
          </label>
        </div>
        <div className="mt-4 ml-36 mr-5 flex">
          <input
            id="birthday"
            name="birthday"
            className="!w-80"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <label htmlFor="birthday" className="ml-[1rem] mt-1.5">
            تاریخ تولد{" "}
          </label>
        </div>

        <div className="mt-4 ml-36 mr-5 flex">
          <div className="ml-10" dir="ltr">
            <label>
              زن
              <input type="radio" id="sex" name="sex" className="mr-10 ml-2" />
            </label>

            <label>
              مرد
              <input
                type="radio"
                id="sex"
                name="sex"
                value="Mel"
                className="mr-16 ml-2"
              />
            </label>
            <label htmlFor="sex">جنسیت</label>
          </div>
        </div>
        <div className="mt-4 ml-36 mr-5 flex">
          <input
            type="number"
            name="national_code"
            className="form-control !w-80"
            id="national_code"
            onChange={(e) => setNationalCode(e.target.value)}
          />
          <label htmlFor="national_code" className="ml-[1rem] mt-1.5">
            کد ملی
          </label>
        </div>

        <div className="form-group flex mt-4 !mx-2">
          <button
            className="btn btn-success  w-24 ml-3 mb-3 mt-3"
            onClick={(e) => handleSubmit1(e)}
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
      </ModalAdd>

      <table class="table !text-right   mt-3">
        <thead className="bg-slate-500">
          <tr>
            <th class="col !text-right   !pr-96">{" نام دانشجو"}</th>
          </tr>
        </thead>
      </table>
      <table class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr>
                <td class="  !text-right !pr-8">
                  {" "}
                  <button
                    type="button"
                    class="btn !w-32 me-96 !bg-slate-400 border  text-slate-900"
                    onClick={(e) => {
                      setRowId(row.id);
                      handleSubmitRemove(e);
                    }}
                  >
                    <i>حذف دانشجو</i>
                  </button>
                </td>

                <td class="  !text-right !pr-96">{row.first_name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Student;
