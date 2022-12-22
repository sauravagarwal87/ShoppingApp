import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Description from "./components/Discription";
import Header from "./components/Header";
import Order from "./components/Order";
import Product from "./components/Product";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import BreadCrumbs from "./components/BreadCrumbs";

function App() {
  const [cart, setCart] = useState([]);

  const [Id, setId] = useState(0);

  const [orderCart, setorderCart] = useState([]);

  const history = useNavigate();
  const [userData, setuserData] = useState([]);
  const [userLoginData, setuserLoginData] = useState({});
  const [userIsLogin, setuserIsLogin] = useState();

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((json) => {
        setuserData(json);
      });
  }, []);
  console.log(userData);

  // useEffect(() => {
  //   setorderCart(cart);
  // }, [cart]);

  console.log("ordercart", orderCart);

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

  const OpenOrderPlaced = () => {
    setorderCart(cart);
    setCart([]);
  };

  const sendIdToDescription = (Id) => {
    setId(Id);
    //console.log("Id", Id);
  };

  //Login Condition

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setuserLoginData({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  function IsLogin() {
    const userEmail = userData.find(
      (userInfo) => userInfo.email === userLoginData.email
    );
    console.log(userEmail);
    const userPassword = userData.find(
      (userInfo) => userInfo.password === userLoginData.password
    );
    console.log(userPassword);
    if (userEmail && userPassword) {
      setuserIsLogin(true);
      alert("Success");
      history("/");
    } else {
      setuserIsLogin(false);
      alert("Wrong");
    }
  }
  console.log(userIsLogin);

  return (
    <>
      {/* <Login path="/" /> */}
      <Header
        userLoginData={userLoginData}
        userIsLogin={userIsLogin}
        carts={cart}
      />
      <BreadCrumbs />

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
          element={
            <Cart
              carts={cart}
              userIsLogin={userIsLogin}
              OpenOrderPlaced={OpenOrderPlaced}
            />
          }
        />
        <Route path="/order" element={<Order carts={orderCart} />} />
        <Route
          path="/Login"
          element={<Login IsLogin={IsLogin} handleSubmit={handleSubmit} />}
        />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
