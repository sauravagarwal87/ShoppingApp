import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Login from "./Login";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs() {
  return (
    <div
      style={{ margin: 4, marginLeft: 16, textDecoration: "none" }}
      role="presentation"
      onClick={handleClick}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link style={{ textDecoration: "none" }} to="/Login">
          Login
        </Link>
        <Link style={{ textDecoration: "none" }} to="/">
          Product
        </Link>
        <Link style={{ textDecoration: "none" }} to="/Cart">
          Cart
        </Link>
        {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
      </Breadcrumbs>
    </div>
  );
}
