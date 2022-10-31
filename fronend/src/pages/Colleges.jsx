import React from "react";
import { useState } from "react";
import Modal from "../components/modal";

import { useCollageTable } from "../hook/collage";
function Collages() {
  const { data } = useCollageTable();
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
      <table class="table !text-right  table-striped table-dark mt-3">
        <thead>
          <tr>
            <button onClick={(e) => modalOpen(e)} className="w-20">
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
