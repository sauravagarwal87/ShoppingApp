import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, Switch } from "react-router";
import React, { useState, useEffect } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Description from "./components/Discription";
import Header from "./components/Header";
import Order from "./components/Order";
import Product from "./components/Product";
import ReactDOM from "react-dom/client";

function App() {
  const [cart, setCart] = useState([]);
  const [Id, setId] = useState(0);

  const addCart = (product) => {
    const cartObject = { ...product, quantity: 1 };
    const newCart = [...cart, cartObject];
    setCart(newCart);
  };

  const OnPlusAddCart = (Id) => {
    //console.log(Id);
    const newCart = cart.map((cartObject) => {
      if (cartObject.id === Id) {
        const newCartObject = {
          ...cartObject,
          quantity: cartObject.quantity + 1,
        };
        return newCartObject;
      }
      return cartObject;
    });
    setCart(newCart);
  };

  const OnMinusDeleteCart = (Id) => {
    const removeCartObject = cart.filter((cartObject) =>
      cartObject.id === Id ? cartObject.quantity > 1 : true
    );
    console.log("remove:", removeCartObject);
    const newCart = removeCartObject.map((cartObject) => {
      if (cartObject.id === Id) {
        const newCartObject = {
          ...cartObject,
          quantity: cartObject.quantity - 1,
        };
        return newCartObject;
      }
      return cartObject;
    });
    console.log("remove cart:", newCart);
    setCart(newCart);
  };

  const OpenOrderPlaced = () => {};

  const sendIdToDescription = (Id) => {
    setId(Id);
    //console.log("Id", Id);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Product
              onAddButtonClick={addCart}
              cart={cart}
              OnPlusAddCart={OnPlusAddCart}
              OnMinusDeleteCart={OnMinusDeleteCart}
            />
          }
        />
        <Route
          path="/description/:id"
          element={
            <Description
              Id={Id}
              onAddButtonClick={addCart}
              cart={cart}
              OnPlusAddCart={OnPlusAddCart}
              OnMinusDeleteCart={OnMinusDeleteCart}
            />
          }
        />
        <Route
          path="/Cart"
          element={<Cart carts={cart} OpenOrderPlaced={OpenOrderPlaced} />}
        />
        <Route path="/order" element={<Order carts={cart} />} />
      </Routes>
    </>
  );
}

export default App;
