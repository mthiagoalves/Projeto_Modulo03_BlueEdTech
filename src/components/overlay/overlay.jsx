import "./overlay.css";

function overlay({ children, overlayClick }) {
  return (
    <div className="overlay" onClick={() => overlayClick()}>
      {" "}
      {children}{" "}
    </div>
  );
}

export default overlay;
