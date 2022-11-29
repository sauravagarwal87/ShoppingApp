import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Outlet, Link } from "react-router-dom";

const Cart = ({ carts, OpenOrderPlaced }) => {
  console.log(carts);
  const TAX_RATE = 0.07;

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  // function createRow(desc, qty, unit) {
  //   const price = priceRow(qty, unit);
  //   return { desc, qty, unit, price };
  // }

  function subtotal(carts) {
    return carts.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  //update cart vale
  // const rows = [
  //   createRow("Paperclips (Box)", 100, 1.15),
  //   createRow("Paper (Case)", 10, 45.99),
  //   createRow("Waste Basket", 2, 17.99),
  // ];

  const invoiceSubtotal = subtotal(carts);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
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
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
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
          <TableRow>
            <Link to="/order">
              <Button
              // onClick={() => {
              //   OpenOrderPlaced();
              // }}
              >
                CheckOut
              </Button>
            </Link>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Cart;
