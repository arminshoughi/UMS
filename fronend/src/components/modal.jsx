import React from "react";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal text-black  !bg-gray-300 !h-[25%] !w-[25%] ml-[35%] mt-[10%] !items-center d-block"
    : "modal d-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-container">{children}</div>
    </div>
  );
};

const ModalAdd = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal text-black  !bg-gray-300 !h-[67%] !w-[50%] ml-[23%] mt-[5%] !items-center d-block"
    : "modal d-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-container">{children}</div>
    </div>
  );
};

export const ModalGrade = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal text-black  !bg-gray-300 !h-[35%] !w-[30%] ml-[35%] mt-[10%] !items-center d-block"
    : "modal d-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-container">{children}</div>
    </div>
  );
};

export default Modal;
