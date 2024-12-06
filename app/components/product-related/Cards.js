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
import AddToCartBtn from "./AddToCartBtn";

export default function Cards({ customize }) {
  // possible inputs
  const cardData = {
    title: customize.title,
    id: customize.id,
    description: customize.description,
    extra: customize.extra,
    img1: customize.image_one,
    img2: customize.image_two,
    img3: customize.image_three,
    alt1: customize.image_alt_one,
    alt2: customize.image_alt_two,
    alt3: customize.image_alt_three,
    price: customize.price,
  };

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
        <AddToCartBtn productData={cardData} />
      </CardActions>
    </Card>
  );
}
