import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/Order.css";

const Order = ({ carts }) => {
  const newCart = carts;
  console.log("orderpage", newCart);
  carts.splice();
  console.log("delete old cart", carts);
  const TAX_RATE = 0.07;
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }
  function subtotal(carts) {
    return carts.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  const invoiceSubtotal = subtotal(carts);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <TableContainer component={Paper}>
      <div className="Order-heading">
        <h1>Order Placed</h1>
        <CheckCircleIcon className="placeOrder-icons"></CheckCircleIcon>
      </div>
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
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Order;
