import { Avatar, Card } from "@mui/material";

export default function FeatureSlide({
  background,
  feature,
  image,
  description,
}) {
  return (
    <Card sx={{ backgroundColor: { background } }}>
      <Avatar
        src={image}
        alt="gpaicon"
        sx={{
          margin: "auto",
          width: 300,
          height: 300,
        }}
      ></Avatar>
      <h1
        style={{
          textAlign: "center",
          // padding: 2,
          color: "white",
        }}
      >
        {feature}
      </h1>
      <h4
        style={{
          textAlign: "center",
          color: "white",
          paddingBottom: 30,
          wordWrap: "break-word",
        }}
      >
        {description}
      </h4>
    </Card>
  );
}
