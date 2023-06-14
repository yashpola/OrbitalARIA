import { Container } from "@mui/material";
import { SentimentVeryDissatisfied, Search } from "@mui/icons-material";

export default function NoPage() {
  return (
    <>
      <Container
        sx={{
          textAlign: "center",
          marginTop: 10,
          fontSize: 30,
        }}
      >
        <Search color="primary" sx={{ width: 400, height: 400 }} />
        <br />
        Can't find what you're looking for...
        <br />
        <SentimentVeryDissatisfied sx={{ width: 100, height: 100 }} />
      </Container>
    </>
  );
}
