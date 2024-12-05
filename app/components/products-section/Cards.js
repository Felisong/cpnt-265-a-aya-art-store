import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { type } from "os";
import { WidthFull } from "@mui/icons-material";

export default function Cards(customize) {
  // possible inputs
  const cardData = {
    title: customize.customize.title,
    id: customize.customize.id,
    description: customize.customize.description,
    extra: customize.customize.extra,
    img1: customize.customize.image_one,
    img2: customize.customize.image_two,
    img3: customize.customize.image_three,
    alt1: customize.customize.image_alt_one,
    alt2: customize.customize.image_alt_two,
    alt3: customize.customize.image_alt_three,
  };

  console.log(cardData.img1);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={cardData.img1}
          alt={cardData.alt1}
          sx={{
            width: "full",
            height: "25rem",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardData.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {cardData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>Share</Button>
      </CardActions>
    </Card>
  );
}
