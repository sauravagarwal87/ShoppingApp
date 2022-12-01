import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
//import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Unstable_Grid2";
import "../styles/product.css";

const Product = ({
  onAddButtonClick,
  cart,
  OnPlusAddCart,
  OnMinusDeleteCart,
}) => {
  /**
 *  {
      id: Math.floor(Math.random() * 10000),
      productName: "",
      price: "",
      image: "",
    },
 *  */
  const [products, setProducts] = useState([]);
  //const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setProducts(data);
      });
  }, []);

  /**
   * const abc = (arguments) => {//logic; return something}
   * const abc = (arguments) => (something)
   */
  // const productList = products.map((product) => {
  //   const itemInCart = cart.find((cartItem) => cartItem.id === product.id);
  //   return (
  //     <div className="box">
  //       <Card sx={{ maxWidth: 300, height: "auto" }}>
  //         <CardActionArea>
  //           <CardMedia
  //             className="image"
  //             component="img"
  //             image={product.image}
  //             alt="green iguana"
  //           />
  //           <CardContent>
  //             <Typography gutterBottom variant="h5" component="div">
  //               {product.title}
  //             </Typography>
  //             <Typography variant="body2" color="text.secondary">
  //               {product.price} $
  //             </Typography>
  //           </CardContent>
  //         </CardActionArea>
  //         <CardActions>
  //           {itemInCart ? (
  //             <div>Plus</div>
  //           ) : (
  //             <Button
  //               onClick={() => {
  //                 onAddButtonClick(product);
  //               }}
  //               size="small"
  //               color="primary"
  //             >
  //               Add
  //             </Button>
  //           )}
  //         </CardActions>
  //       </Card>
  //     </div>
  //   );
  // });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <div className="product-display">
          {products.map((product) => {
            const itemInCart = cart.find(
              (cartItem) => cartItem.id === product.id
            );
            return (
              <Grid xs={2} sm={4} md={4}>
                <div className="box">
                  <Card
                    className="card-css"
                    sx={{ maxWidth: 300, height: "auto" }}
                  >
                    <Link
                      to={"/description/" + product.id}
                      style={{ textDecoration: "none" }}
                    >
                      <CardActionArea>
                        <CardMedia
                          className="image"
                          component="img"
                          style={{ objectFit: "contain" }}
                          image={product.image}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography
                            noWrap="true"
                            gutterBottom
                            variant="h6"
                            component="div"
                          >
                            {product.title}
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            {product.price} $
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <CardActions>
                      {itemInCart ? (
                        <ButtonGroup
                          size="small"
                          aria-label="small outlined button group"
                        >
                          <Button
                            //disabled={counter >= product["countInStock"]}
                            onClick={() => {
                              OnPlusAddCart(product.id);
                            }}
                          >
                            +
                          </Button>

                          {<Button disabled>{itemInCart.quantity}</Button>}

                          {
                            <Button
                              disabled={itemInCart.quantity <= 0}
                              onClick={() => {
                                OnMinusDeleteCart(product.id);
                              }}
                            >
                              -
                            </Button>
                          }
                        </ButtonGroup>
                      ) : (
                        <Button
                          onClick={() => {
                            onAddButtonClick(product);
                          }}
                          size="small"
                          color="primary"
                        >
                          Add
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </div>
              </Grid>
            );
          })}
        </div>
      </Grid>
    </Box>
  );
};
export default Product;
