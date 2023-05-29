export default function UniversalPopup(props) {
  return (
    <div className="popup-container">
      <h1 className="popup-text">{props.text}</h1>
      <div className="popup-container-bottom-third">
        <button onClick={props.closePopUp} className="btn-popup">
          Got it!
        </button>
      </div>
    </div>
  );
}
