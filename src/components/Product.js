import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
//import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Outlet, Link } from "react-router-dom";

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
    <div>
      {products.map((product) => {
        const itemInCart = cart.find((cartItem) => cartItem.id === product.id);
        return (
          <div className="box">
            <Card sx={{ maxWidth: 300, height: "auto" }}>
              <Link to={"/description/" + product.id}>
                <CardActionArea>
                  <CardMedia
                    className="image"
                    component="img"
                    image={product.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
        );
      })}
    </div>
  );
};
export default Product;
