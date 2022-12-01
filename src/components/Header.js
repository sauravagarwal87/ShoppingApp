import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = (props) => {
  return (
    // <div className="container">
    //   <div className="heading">
    //     <Link to="/" style={{ textDecoration: "none", color: "white" }}>
    //       <Typography variant="h2" gutterBottom>
    //         <div>Shopping App</div>
    //       </Typography>
    //     </Link>
    //     <div className="Cart-icon">
    //       <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
    //         <ShoppingCartIcon className="Cart"></ShoppingCartIcon>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "Black",
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h5"
              noWrap
              // component="a"
              // href="/"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                flexGrow: 1,
              }}
            >
              Shopping App
            </Typography>
          </Link>
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge
                style={{ color: "Black" }}
                badgeContent={props.carts.length}
                color="secondary"
              >
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
