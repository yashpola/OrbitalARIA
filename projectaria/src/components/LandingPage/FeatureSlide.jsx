import { Avatar, Card } from "@mui/material";

export default function FeatureSlide({
  background,
  feature,
  image,
  description,
}) {
  return (
    <Card
      sx={{
        // padding: 5,
        textAlign: "center",
        backgroundColor: { background },
      }}
    >
      <div className="feature-slide-materials">
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
        <h2
          id="landing-feature-name"
          style={{
            whiteSpace: "pre-wrap",
            color: "white",
          }}
        >
          {feature}
        </h2>
        <h4
          className="feature-slide-description"
          id="landing-feature-description"
          style={{
            color: "white",
            whiteSpace: "pre-wrap" /* Webkit */,
            wordWrap: "break-word" /* IE */,
          }}
        >
          {description}
        </h4>
      </div>
    </Card>
  );
}
