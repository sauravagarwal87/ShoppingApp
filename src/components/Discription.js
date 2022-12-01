import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import "../styles/Discription.css";
import { useParams } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const Description = ({
  OnPlusAddCart,
  OnMinusDeleteCart,
  onAddButtonClick,
  cart,
}) => {
  const [productDescription, setProductDescription] = useState([]);
  const [value, setValue] = React.useState(2);
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
    <>
      <Typography
        className="description-heading"
        gutterBottom
        variant="h5"
        component="div"
      >
        {productDescription.title}
      </Typography>
      <div style={{ display: "flex" }}>
        <CardMedia
          className="description-image"
          component="img"
          style={{ width: "auto" }}
          image={productDescription.image}
          alt="green iguana"
        />
        <div>
          <Typography style={{ padding: 15, margin: 15, marginTop: 40 }}>
            {productDescription.description}
          </Typography>

          <Box
            style={{ padding: 15, margin: 15 }}
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Product Rating</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
          <Typography
            style={{ padding: 15, margin: 15 }}
            variant="h4"
            color="text.secondary"
          >
            Price: {productDescription.price} $
          </Typography>
          {itemInCart ? (
            <ButtonGroup
              style={{ padding: 15, margin: 15 }}
              size="small"
              aria-label="small outlined button group"
            >
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
              style={{ padding: 15, margin: 15 }}
              onClick={() => {
                onAddButtonClick(productDescription);
              }}
              size="small"
              color="primary"
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </>

    // <Card className="box" sx={{ maxWidth: 500 }}>
    //   <CardActionArea style={{ padding: 15, margin: 15 }}>
    //     <CardMedia
    //       className="description-image"
    //       component="img"
    //       //height="140"
    //       image={productDescription.image}
    //       alt="green iguana"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="div">
    //         {productDescription.title}
    //       </Typography>
    //       <Typography variant="h4" color="text.secondary">
    //         {productDescription.price} $
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardContent style={{ padding: 15, margin: 15 }}>
    //     {productDescription.description}
    //   </CardContent>
    //   <CardActions style={{ padding: 15, margin: 15 }}>
    //     {itemInCart ? (
    //       <ButtonGroup size="small" aria-label="small outlined button group">
    //         <Button
    //           //disabled={counter >= product["countInStock"]}
    //           onClick={() => {
    //             OnPlusAddCart(productDescription.id);
    //           }}
    //         >
    //           +
    //         </Button>

    //         {<Button disabled>{itemInCart.quantity}</Button>}

    //         {
    //           <Button
    //             disabled={itemInCart.quantity <= 0}
    //             onClick={() => {
    //               OnMinusDeleteCart(productDescription.id);
    //             }}
    //           >
    //             -
    //           </Button>
    //         }
    //       </ButtonGroup>
    //     ) : (
    //       <Button
    //         onClick={() => {
    //           onAddButtonClick(productDescription);
    //         }}
    //         size="small"
    //         color="primary"
    //       >
    //         Add
    //       </Button>
    //     )}
    //   </CardActions>
    // </Card>
  );
};

export default Description;
