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
import Link from "next/link";

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
    <Link href={`/products/${cardData.id}`}>
      <Card sx={{ maxWidth: 345, maxHeight: 600 }} className="bg-backDropBlue">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={cardData.img1}
            alt={cardData.alt1}
            sx={{
              width: "full",
              height: "20rem",
            }}
          />
          <CardContent className="min-h-56">
            <Typography gutterBottom variant="h5" component="div">
              {cardData.title}
            </Typography>
            <Typography variant="body1">{cardData.description}</Typography>
          </CardContent>
        </CardActionArea>
        <div className="flex items-center p-2">
          <Button>Share</Button>
          <AddToCartBtn productData={cardData} />
          <p> {cardData.price.toFixed(2)} $</p>
        </div>
      </Card>
    </Link>
  );
}
