import axios from "axios";
import React from "react";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import ModalAdd from "../components/modal";

import { useCollage } from "../hook/collage";
function Collages() {
  const { data } = useCollage();
  const [rowId, setRowId] = useState();

  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });
  const accesss = localStorage.getItem("access");

  const [value, setValue] = useState();
  const handleSubmitRemove = (e) => {
    e.preventDefault();

    axios
      .delete(
        `http://127.0.0.1:8000/api/share/collages/${rowId}/`,

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
        alert("دانشگاه با موفقیت حذف شد");
      })
      .catch((error) => {
        alert("دانشگاه انتخاب شده به دلایل نامشخص حذف نشد دوباره تکرار کنید");
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

  const handleSubmit1 = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/share/collages/",
        {
          name: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5ODQwNzkzLCJqdGkiOiIzNGY1MTlhZGRhODE0ZDIwOGI3NjE0NmE3NWVjODllOCIsInVzZXJfaWQiOjJ9.qRgJGffZ--O4YxCz8QI8LFo7xorKcoCLJR_3A4tw8D0`,

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
        اضافه کردن دانشگاه
      </button>
      <ModalAdd show={state.modal} handleClose={(e) => modalClose(e)}>
        <div className="ml-4 -mt-8 fixed ">
          <HiX onClick={(e) => modalClose(e)} className="w-6 h-6 mt-10" />
        </div>
        <div className="flex"></div>
        <div class=" text-center mt-10  text-indigo-900 border border-indigo-800 pt-2  mx-3 h-10 ">
          اضافه کردن دانشگاه
        </div>
        <div className=" mt-4 ml-36 mr-5 flex   ">
          <input
            type="text"
            value={state.modalInputName}
            name="modalInputName"
            className="form-control !w-[100%]"
            onChange={(e) => setValue(e.target.value)}
          />
          <label className="ml-[1rem] mt-1.5">نام</label>
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

      <table class="table !text-right    mt-3">
        <thead className="bg-slate-500">
          <tr>
            <th class="col !text-right   !pr-96">{" نام دانشگاه"}</th>
          </tr>
        </thead>
      </table>
      <table class="table !text-right  !pr-96 table-striped table-dark ">
        <tbody className="!pr-96">
          {data.map((row, i) => (
            <>
              <tr className="!pr-96">
                <td class="  !text-right !pr-96">
                  {" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      setRowId(row.id);
                      handleSubmitRemove(e);
                    }}
                    class="btn !w-32 me-96 !bg-slate-400 border  text-slate-900"
                  >
                    <i>حذف دانشگاه</i>
                  </button>
                </td>
                <td class="  !text-right !pr-96">{row.name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Collages;
