import { Key } from "@mui/icons-material";
import {
  FormControl,
  FilledInput,
  Button,
  InputAdornment,
  InputLabel,
  Stack,
} from "@mui/material";
import { supabase } from "../../supabase";
import { useState } from "react";

export default function ForgotPasswordScreen() {
  const [passwordMismatch, setPasswordMisMatch] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState(false);

  async function updateUserPassword(e) {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    if (newPassword !== confirmNewPassword) {
      setPasswordMisMatch(true);
      return;
    } else {
      setPasswordMisMatch(false);
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordUpdateError(true);
    }
  }

  return (
    <div
      style={{
        // maxWidth: "60%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{ backgroundColor: "white", padding: 5, border: "2px solid black" }}
        direction="column"
        spacing={2}
      >
        <h1 style={{ textAlign: "center" }}>aria</h1>
        <FormControl>
          <InputLabel htmlFor="newPassword">New Password</InputLabel>
          <FilledInput
            id="newPassword"
            startAdornment={
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="confirmNewPassword">
            Confirm New Password
          </InputLabel>
          <FilledInput
            id="confirmnNewPassword"
            startAdornment={
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            }
          />
        </FormControl>
        {passwordMismatch && <h6>Passwords do not match!</h6>}
        {passwordUpdateError && <h6>Error updating. Please try again later</h6>}
        <FormControl>
          <Button
            onClick={updateUserPassword}
            sx={{
              fontFamily: "Ubuntu",
              fontWeight: "bold",
              backgroundColor: "#A86868",
            }}
            variant="contained"
          >
            Reset Password
          </Button>
        </FormControl>
      </Stack>
    </div>
  );
}
