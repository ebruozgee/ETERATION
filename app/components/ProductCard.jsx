import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/CartContext";
import Link from "next/link";

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
`;
const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;
const ProductTitle = styled.h4`
  margin: 0 0 10px;
  text-decoration: none !important;
`;

const ProductPrice = styled.p`
  margin: 0 0 10px;
`;

const AddButton = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card>
      <Link href={`/product/${product.id}`}>
        <ProductImage src={product.image} alt={product.name} />
      </Link>
      <ProductTitle>{product.name}</ProductTitle>
      <ProductPrice>${product.price}</ProductPrice>

      <AddButton onClick={() => addToCart(product)}>Add to Cart</AddButton>
    </Card>
  );
};

export default ProductCard;
