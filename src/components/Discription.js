import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "../styles/Discription.css";
import { useParams } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";

const Description = ({
  OnPlusAddCart,
  OnMinusDeleteCart,
  onAddButtonClick,
  cart,
}) => {
  const [productDescription, setProductDescription] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/" + id)
      .then((res) => res.json())
      .then((data) => {
        setProductDescription(data);
      });
  }, [id]);
  //console.log("id at description", productDescription);
  // const productDescription = product.find((product) => product.id === 2);

  if (!productDescription) {
    return <></>;
  }

  const itemInCart = cart.find(
    (cartItem) => cartItem.id === productDescription.id
  );
  //console.log("Item in cart", itemInCart);

  return (
    <Card className="box" sx={{ maxWidth: 500 }}>
      <CardActionArea style={{ padding: 15, margin: 15 }}>
        <CardMedia
          className="description-image"
          component="img"
          //height="140"
          image={productDescription.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productDescription.title}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            {productDescription.price} $
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent style={{ padding: 15, margin: 15 }}>
        {productDescription.description}
      </CardContent>
      <CardActions style={{ padding: 15, margin: 15 }}>
        {itemInCart ? (
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button
              //disabled={counter >= product["countInStock"]}
              onClick={() => {
                OnPlusAddCart(productDescription.id);
              }}
            >
              +
            </Button>

            {<Button disabled>{itemInCart.quantity}</Button>}

            {
              <Button
                disabled={itemInCart.quantity <= 0}
                onClick={() => {
                  OnMinusDeleteCart(productDescription.id);
                }}
              >
                -
              </Button>
            }
          </ButtonGroup>
        ) : (
          <Button
            onClick={() => {
              onAddButtonClick(productDescription);
            }}
            size="small"
            color="primary"
          >
            Add
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Description;
