import React from "react";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal text-black  !bg-gray-300 !h-[67%] !w-[50%] ml-[23%] mt-[5%] !items-center d-block"
    : "modal d-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-container">{children}</div>
    </div>
  );
};

export default Modal;
