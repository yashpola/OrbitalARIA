import { Avatar, Card } from "@mui/material";

export default function FeatureSlide({
  background,
  feature,
  image,
  description,
}) {
  return (
    <Card sx={{ textAlign: "center", backgroundColor: { background } }}>
      <Avatar
        id="landing-card-feature-icon"
        src={image}
        alt="gpaicon"
        sx={{
          margin: "auto",
          width: 300,
          height: 300,
        }}
      ></Avatar>
      <h1
        id="landing-feature-name"
        style={{
          textAlign: "center",
          // padding: 2,
          color: "white",
        }}
      >
        {feature}
      </h1>
      <br />
      <h4
        id="landing-feature-description"
        style={{
          textAlign: "center",
          color: "white",
          paddingBottom: 30,
          wordBreak: "normal",
        }}
      >
        {description}
      </h4>
    </Card>
  );
}
