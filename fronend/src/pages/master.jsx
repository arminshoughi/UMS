import axios from "axios";
import React from "react";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import Modal from "../components/modal";
import ModalAdd from "../components/modal";

import { useCollage } from "../hook/collage";
function Adminmaster() {
  const { data } = useCollage();
  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });
  const [value, setValue] = useState();
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
  const accesss = localStorage.getItem("access");

  const handleSubmit1 = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/master/",
        {
          username: "string",
          password: "string",
          first_name: "string",
          last_name: "string",
          collage: 0,
          major: 0,
          national_code: "string",
          sex: "Male",
          birthday: "2022-12-09",
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
        اضافه کردن دانشگاه
      </button>
      <Modal show={state.modal} handleClose={(e) => modalClose(e)}>
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
      </Modal>

      <table class="table !text-right   mt-3">
        <thead className="bg-slate-500">
          <tr>
            <th class="col !text-right   !pr-8">{" نام دانشگاه"}</th>
          </tr>
        </thead>
      </table>
      <table class="table !text-right   table-striped table-dark ">
        <tbody>
          {data.map((row, i) => (
            <>
              <tr>
                <td class="  !text-right !pr-8">{row.name}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Adminmaster;
