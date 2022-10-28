// Libs
import { useEffect } from "react";
import { createPortal } from "react-dom";

// Types
import { PopupProps } from "./popup.types";

// Styles
import "./popup.scss";

const protalElement = document.getElementById("portal") as HTMLDivElement;

function Popup({ isModalOpen, toggleModal, isSpinning }: PopupProps) {
  useEffect(() => {
    isModalOpen
      ? protalElement.classList.add("open")
      : protalElement.classList.remove("open");
  }, [isModalOpen]);

  return createPortal(
    <div className="pop-up">
      <div className="heading-message">
        <h2>
          {isSpinning
            ? "Completing Ordering Process..."
            : `Process Completed 😍`}
        </h2>
        {isSpinning && <p>Please Wait</p>}
      </div>
      <div className="spinner">
        {isSpinning ? (
          <span className="circle">
            <span className="inner-circle"></span>
          </span>
        ) : (
          <span className="signs">✔ ✔ ✔</span>
        )}
      </div>
      <div className="btn">
        <button className="done" onClick={toggleModal} disabled={isSpinning}>
          Done!
        </button>
      </div>
    </div>,
    protalElement
  );
}

export default Popup;
