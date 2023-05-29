import { useEffect } from "react";
import { supabase } from "../supabase";

export default function ForgotPasswordScreen() {
  async function updatePassword(e) {
    e.preventDefault();
    if (
      document.getElementById("forgotpasswordfield").value ===
      document.getElementById("confirmnewpassword").value
    ) {
      await supabase.auth.updateUser({
        password: document.getElementById("forgotpassword").value,
      });
    } else {
      alert("Passwords do not match!");
    }
  }

  return (
    <div className="forgot--password--container">
      <form className="forgot--password-form">
        <h1>aria</h1>
        <input
          type="password"
          id="forgotpasswordfield"
          placeholder="New Password"
          required
        />
        <input
          type="password"
          id="confirmnewpassword"
          placeholder="Confirm New Password"
          required
        />
        <button onClick={updatePassword} className="btn--update--password">
          <p>Update Password</p>
        </button>
      </form>
    </div>
  );
}
