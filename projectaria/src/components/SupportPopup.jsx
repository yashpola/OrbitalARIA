import { useState } from "react";
import AdminProfile from "./AdminProfile";

export default function SupportPopup(props) {
  const [supportTicket, setSupportTicket] = useState(false);

  function openTicket(e) {
    e.preventDefault();
    setSupportTicket(true);
    const helpRequest = document.getElementById("help-request").value;
    <AdminProfile text={helpRequest} />;
    props.closePopUp();
  }

  return (
    <div className="popup-container">
      <h1 className="popup-text">{props.text}</h1>
      <div className="popup-container-bottom-third">
        <button onClick={props.closePopUp} className="btn-confirm-popup">
          Got it!
        </button>
        <button onClick={openTicket} className="btn-contact-support">
          Contact Support
        </button>
        {supportTicket && (
          <form className="form-support-ticket">
            <input
              id="support-email"
              type="email"
              placeholder="Your Email"
              required
            />
            <input
              id="help-request"
              type="text"
              placeholder="Details of Help Request"
              required
            />
            <button className="btn-help-request">Submit Help Request</button>
          </form>
        )}
      </div>
    </div>
  );
}
