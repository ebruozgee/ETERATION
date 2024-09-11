import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/CartContext";

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  margin: 0;
`;

const ItemPrice = styled.p`
  margin: 0;
  color: #0070f3;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  padding: 5px 10px;
  background-color: #f1f1f1;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 18px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const QuantityDisplay = styled.div`
  padding: 5px 15px;
  background-color: #0070f3;
  color: white;
  border-radius: 4px;
  font-size: 18px;
  margin: 0 5px;
`;

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <ItemContainer>
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price}₺</ItemPrice>
      </ItemDetails>
      <QuantityContainer>
        <QuantityButton onClick={() => removeFromCart(item)}>-</QuantityButton>
        <QuantityDisplay>{item.quantity}</QuantityDisplay>
        <QuantityButton onClick={() => addToCart(item)}>+</QuantityButton>
      </QuantityContainer>
    </ItemContainer>
  );
};

export default CartItem;
