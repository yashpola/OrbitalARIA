// mui imports
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  ThumbUp,
  Undo,
  Help,
} from "@mui/icons-material";
// react imports
import { useState, useEffect } from "react";
// supabase imports
import { supabase } from "../../supabase";

export default function ProfilePicture({
  src,
  setSrc,
  fetchProfilePicture,
  username,
  email,
}) {
  /* React states */
  // conditional rendering
  const [confirmDeletePFP, setConfirmDeletePFP] = useState(false);
  const [editPFPAccordion, setEditPFPAccordion] = useState(false);
  const [pfpChosen, setPFPChosen] = useState(false);
  const [pfpHelpMessage, setPFPHelpMessage] = useState(false);

  /* Component functionality */

  async function setProfilePicture(e) {
    e.preventDefault();

    const imgSrc = document.getElementById("pfp-input-button").files[0];

    const { data } = await supabase.storage
      .from("userimages")
      .upload(`${username}.jpg`, imgSrc, {
        cacheControl: "1",
        upsert: false,
      });

    await supabase.from("users").update({ pfpset: true }).eq("email", email);

    setEditPFPAccordion(false);
    checkProfilePictureSet();
    setSrc(data.publicUrl);
  }

  async function checkProfilePictureSet() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("users")
      .select("pfpset")
      .eq("email", user.email);
    setPFPChosen(data[0].pfpset);
  }

  useEffect(() => {
    checkProfilePictureSet();
  }, []);

  async function updateProfilePicture(e) {
    e.preventDefault();

    const newImgSrc = document.getElementById("pfp-update-button").files[0];
    const { error } = await supabase.storage
      .from("userimages")
      .update(`${username}.jpg`, newImgSrc, {
        cacheControl: "1",
        upsert: true,
      });

    if (error) console.error(error, error.message);

    fetchProfilePicture();
    setEditPFPAccordion(false);
  }

  function confirmDeleteProfilePicture(e) {
    e.preventDefault();
    setConfirmDeletePFP(true);
    document.getElementById("pfp-image").style.opacity = 0.3;
  }

  async function deleteProfilePicture(e) {
    e.preventDefault();
    const { error } = await supabase.storage
      .from("userimages")
      .remove([`${username}.jpg`]);

    if (error) console.error(error, error.message);

    setConfirmDeletePFP(false);

    await supabase.from("users").update({ pfpset: false }).eq("email", email);

    checkProfilePictureSet();
    setEditPFPAccordion(false);
    fetchProfilePicture();
  }

  function closePopUp(e) {
    e.preventDefault();
    setConfirmDeletePFP(false);
    document.getElementById("pfp-image").style.opacity = 1;
  }

  return (
    <>
      {/* <IconButton
        sx={{ outline: "none", color: "black" }}
        onClick={(e) => (
          e.preventDefault(), setPFPHelpMessage(!pfpHelpMessage)
        )}
      >
        <Help />
      </IconButton>
      {pfpHelpMessage && (
        <div>
          <h6 style={{ color: "#4e1530" }}>
            Wait a few minutes before refreshing to see changes in the profile
            picture
          </h6>
        </div>
      )} */}
      <img
        id="pfp-image"
        src={src}
        style={{ borderRadius: "50%", width: 200, height: 200 }}
      />
      <br />
      <Accordion
        disableGutters={true}
        expanded={editPFPAccordion}
        sx={{ backgroundColor: "transparent" }}
        elevation={0}
      >
        <AccordionSummary>
          <Button
            color="secondary"
            sx={{ fontWeight: "bold" }}
            onClick={(e) => (
              e.preventDefault(),
              setEditPFPAccordion(!editPFPAccordion),
              setConfirmDeletePFP(false)
            )}
          >
            Edit {editPFPAccordion ? <ExpandLess /> : <ExpandMore />}
          </Button>
        </AccordionSummary>
        <AccordionDetails hidden={pfpChosen}>
          <Button color="secondary" variant="outlined" component="label">
            Choose PFP
            <input
              id="pfp-input-button"
              type="file"
              onChange={setProfilePicture}
              hidden
            />
          </Button>
        </AccordionDetails>
        <AccordionDetails hidden={!pfpChosen}>
          <Button
            disabled={confirmDeletePFP}
            variant="outlined"
            color="secondary"
            component="label"
          >
            Change PFP
            <input
              id="pfp-update-button"
              type="file"
              onChange={updateProfilePicture}
              hidden
            />
          </Button>
        </AccordionDetails>
        <AccordionDetails hidden={!pfpChosen}>
          {confirmDeletePFP ? (
            <div>
              <h6>Are you sure? </h6>
              <Button
                variant="contained"
                onClick={deleteProfilePicture}
                sx={{
                  marginTop: 2,
                  marginRight: 2,
                  backgroundColor: "green",
                  color: "white",
                }}
                endIcon={<ThumbUp />}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={closePopUp}
                sx={{
                  marginTop: 2,
                  backgroundColor: "red",
                  color: "white",
                }}
                endIcon={<Undo />}
              >
                No
              </Button>
            </div>
          ) : (
            <Button
              color="secondary"
              onClick={confirmDeleteProfilePicture}
              variant="outlined"
            >
              Remove PFP
            </Button>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
