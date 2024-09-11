import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/CartContext";

const TotalContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const TotalPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CheckoutButton = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;

  &:hover {
    background-color: #005bb5;
  }
`;

const CartTotal = () => {
  const { totalPrice } = useContext(CartContext);

  return (
    <TotalContainer>
      <TotalPrice>Total Price: {totalPrice}₺</TotalPrice>
      <CheckoutButton>Checkout</CheckoutButton>
    </TotalContainer>
  );
};

export default CartTotal;
