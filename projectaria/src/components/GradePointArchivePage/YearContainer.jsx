import {
  Card,
  Container,
  FormControl,
  Paper,
  Grid,
  IconButton,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";

import ModuleCard from "./ModuleCard";
import { useState } from "react";

export default function YearContainer({ yearID }) {
  const [addModForm, showAddModForm] = useState(false);

  function createMod(e) {
    e.preventDefault();
    showAddModForm(!addModForm);
  }

  function addMod(e) {
    e.preventDefault();
    showAddModForm(false);
  }

  return (
    <>
      <Grid sx={{ padding: 2 }} container spacing={2}>
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 1,
              maxWidth: "90%",
              textAlign: "center",
              margin: "auto",
              fontSize: 30,
            }}
            elevation={3}
          >
            {yearID}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Container
            sx={{
              maxWidth: "90%",
              padding: 2,
              backgroundColor: "#eee",
              borderStyle: "dotted",
            }}
          >
            <Paper
              sx={{
                padding: 0.5,
                textAlign: "center",
                fontSize: 30,
              }}
              elevation={3}
            >
              Sem 1
              <IconButton sx={{ color: "black" }} onClick={createMod}>
                <AddCircle />
              </IconButton>
            </Paper>
            {addModForm && (
              <Card
                sx={{
                  marginTop: 2,
                  padding: 2,
                }}
                elevation={0}
              >
                <Stack direction="column" spacing={2}>
                  <FormControl>
                    <TextField
                      id="moduleCode"
                      label="Module Code"
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      id="moduleGrade"
                      label="Module Grade"
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      id="moduleTitle"
                      label="Module Title"
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      id="moduleCredits"
                      label="Module Credits"
                      variant="outlined"
                    />
                  </FormControl>
                  <FormControl>
                    <Button onClick={addMod} variant="outlined">
                      Add Module
                    </Button>
                  </FormControl>
                </Stack>
              </Card>
            )}
            <ModuleCard
              modName="Discrete Structures"
              modCredits={4}
              modGrade="D"
              modTitle="CS1231S"
            />
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Container
            sx={{
              maxWidth: "90%",
              padding: 2,
              backgroundColor: "#eee",
              borderStyle: "dotted",
            }}
          >
            <Paper
              sx={{
                padding: 0.5,
                textAlign: "center",
                fontSize: 30,
              }}
            >
              Sem 2
              <IconButton sx={{ color: "black" }}>
                <AddCircle />
              </IconButton>
            </Paper>
            <ModuleCard
              modTitle="CS2100"
              modCredits={4}
              modGrade="C+"
              modName="Computer Architecture"
            />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
