import {
  Grid,
  Card,
  Container,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Button,
  ThemeProvider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { supabase } from "../../supabase.js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState } from "react";
import { useSelector } from "react-redux";
import { buttonColors, possibleThemes } from "../themes.jsx";

export default function LoginScreen2() {
  const presentTheme = useSelector((state) => state.currentTheme.value);
  return (
    <Container
      maxWidth="xs"
      sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
    >
      <Auth
        supabaseClient={supabase}
        appearance={{
          style: {
            label: { fontFamily: "Ubuntu", color: "black" },
            anchor: { fontFamily: "Ubuntu", color: "black" },
          },
        }}
        localization={{
          variables: {
            sign_in: {
              button_label: "Log in",
            },
            forgotten_password: {
              link_text: "Forgot password? Send login link",
            },
          },
        }}
        providers={["github", "discord", "google"]}
      />
    </Container>
  );
}
