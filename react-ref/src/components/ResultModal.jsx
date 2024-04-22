import { forwardRef, useImperativeHandle, useRef } from "react";

import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onCloseModal },
  ref
) {
  const dialog = useRef();

  const userWin = remainingTime > 0;

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    },
    []
  );
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onCloseModal}>
      <h2>{userWin ? "You win" : "You lost"} </h2>
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      {userWin && (
        <p>
          You stopped the timer with{" "}
          <strong>{(remainingTime / 1000).toFixed(3)} seconds left.</strong>
        </p>
      )}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
