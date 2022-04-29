import "./modal.css";
import Overlay from "components/overlay/overlay";

function modal({ children, closeModal }) {
  const handleClick = (e, canClose) => {
    e.stopPropagation();
    if (canClose) closeModal();
  };
  return (
    <Overlay overlayClick={closeModal}>
      <div className="modal" onClick={handleClick}>
        <span className="modal-close"  onClick={(e) => handleClick(e, true)}>+</span>
        <div className="modal-body">{children}</div>
      </div>
    </Overlay>
  );
}

export default modal;
