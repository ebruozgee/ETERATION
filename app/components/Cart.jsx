import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styled from "styled-components";

const CartContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  text-align: left;
`;

const ItemName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

const ItemPrice = styled.span`
  display: block;
  font-size: 14px;
  color: #888;
  margin-top: 5px;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  padding: 5px 15px;
  margin: 0 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const ItemTotalPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #0070f3;
  text-align: right;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
`;

const Cart = () => {
  const { cartItems, totalPrice, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  return (
    <CartContainer>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>Sepetinizde ürün bulunmuyor.</EmptyCartMessage>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.id}>
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemPrice> {(item.quantity * item.price).toFixed(2)}₺</ItemPrice>
            </ItemDetails>
            <ItemQuantity>
              <QuantityButton onClick={() => removeFromCart(item)}>
                -
              </QuantityButton>
              <span>{item.quantity}</span>
              <QuantityButton onClick={() => addToCart(item)}>+</QuantityButton>
            </ItemQuantity>
          </CartItem>
        ))
      )}

      {cartItems.length > 0 && (
        <>
          <TotalPriceContainer>
            <span>Total:</span>
            <span>{totalPrice}₺</span>
          </TotalPriceContainer>
          <CheckoutButton onClick={clearCart}>Checkout</CheckoutButton>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
