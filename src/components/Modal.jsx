import React from "react";
import "./Modal.css";

// ==============================================================
// Modal Component (generic, reusable popup wrapper)
// --------------------------------------------------------------
// Props:
//   - title: string, shown in the modal header
//   - onClose: function() => void, called when the user clicks
//     the backdrop or the "x" close button
//   - children: whatever JSX is passed between <Modal> ... </Modal>
//     tags, e.g. a form. This is React's standard way of making a
//     "container" component that wraps different content.
//
// This single component is reused for ALL popups in the app
// (Add Workout, Log Water, Update Weight, Calculate BMI, Add Goal)
// so we don't have to rewrite the overlay/box/close-button styling
// five times.
// ==============================================================
function Modal({ title, onClose, children }) {
  return (
    // Clicking the dark backdrop closes the modal
    <div className="modal-backdrop" onClick={onClose}>
      {/* stopPropagation prevents a click INSIDE the box from
          bubbling up to the backdrop and closing the modal */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
