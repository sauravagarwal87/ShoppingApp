import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "../styles/cart.css";

const Cart = ({ carts, userIsLogin, OpenOrderPlaced }) => {
  // console.log("CartPage", carts);
  // if (carts.length === 0) return;
  const TAX_RATE = 0.07;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }
  // const priceR = priceRow(qty, unit);

  // function createRow(desc, qty, unit) {
  //   const price = priceRow(qty, unit);
  //   return { desc, qty, unit, price };
  // }

  function subtotal(carts) {
    return carts
      .map((cart) => priceRow(cart.quantity, cart.price))
      .reduce((sum, i) => sum + i, 0);
  }

  // update cart vale
  // const rows = [
  //   createRow("Paperclips (Box)", 100, 1.15),
  //   createRow("Paper (Case)", 10, 45.99),
  //   createRow("Waste Basket", 2, 17.99),
  // ];

  const invoiceSubtotal = subtotal(carts);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  console.log("hii", carts.length);

  return (
    <>
      {carts.length > 0 ? (
        <>
          <Typography
            variant="h3"
            gutterBottom
            style={{ marginLeft: 50, marginTop: 20, padding: 10 }}
          >
            Cart
          </Typography>
          <script>if (carts.length === 0) return;</script>
          <TableContainer
            className="Cart-table"
            style={{
              marginTop: 20,
              marginLeft: 50,
              marginRight: 50,
              padding: 50,
              width: "auto",
            }}
            component={Paper}
          >
            <Table style={{ marginBottom: 20 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Desc</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carts.map((cart) => {
                  //logic
                  return (
                    <TableRow key={cart.title}>
                      <TableCell>{cart.title}</TableCell>
                      <TableCell align="right">{cart.quantity}</TableCell>
                      <TableCell align="right">{cart.price}</TableCell>
                      <TableCell align="right">
                        {ccyFormat(priceRow(cart.quantity, cart.price))}
                      </TableCell>
                    </TableRow>
                  );
                })}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {ccyFormat(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {}
            {userIsLogin ? (
              <Link
                to="/order"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Stack spacing={4} direction="row">
                  <Button onClick={OpenOrderPlaced} variant="contained">
                    CheckOut
                  </Button>
                </Stack>
              </Link>
            ) : (
              <>
                <p
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                  className=""
                >
                  Login first to do CheckOut
                </p>
                {/* <Link
                  to="/Login"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Stack spacing={4} direction="row">
                    <Button variant="contained">LogIn </Button>
                  </Stack>
                </Link> */}
              </>
            )}
          </TableContainer>
        </>
      ) : (
        <div>
          <Typography
            variant="h3"
            gutterBottom
            style={{ marginLeft: 50, marginTop: 20, padding: 10 }}
          >
            Cart Is Empty
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            style={{ marginLeft: 50, marginTop: 20, padding: 10 }}
          >
            Please add Items . Happy Shopping!
          </Typography>
        </div>
      )}
    </>
  );
};
export default Cart;
