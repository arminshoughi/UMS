import React from "react";
import { useState } from "react";
import Modal from "../components/modal";

import { useCollage } from "../hook/collage";
function Collages() {
  const { data } = useCollage();
  const [state, setState] = useState({
    modal: false,
    name: "",
    modalInputName: "",
  });

 

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
  return (
    <>
            <button onClick={(e) => modalOpen(e)} className="w-20 !bg-slate-400 p-1 btn float-right m-2">
              اضافه کردن دانشگاه
            </button>
            <Modal show={state.modal} handleClose={(e) => modalClose(e)}>
              <div className="form-group ">
                <label>Enter collage :</label>
                <input
                  type="text"
                  value={state.modalInputName}
                  name="modalInputName"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button onClick={(e) => handleSubmit(e)} type="button">
                  Save
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

export default Collages;
