import { forwardRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children }, ref) {
  return createPortal(
    <dialog
      ref={ref}
      className=" backdrop:bg-stone-800/80 bg-white/30 p-4 rounded-md shadow-md min-w-96 min-h-64"
    >
      {children}
      <form method="dialog">
        <button className="bg-stone-200  rounded-xl">Close</button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
