import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <div className="container">
      <div className="heading">
        <Link to="/">
          <Typography variant="h2" gutterBottom>
            <div>Shopping App</div>
          </Typography>
        </Link>
        <div className="Cart-icon">
          <Link to="/cart">
            <ShoppingCartIcon className="Cart"></ShoppingCartIcon>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
