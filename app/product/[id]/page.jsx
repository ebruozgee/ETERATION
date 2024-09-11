"use client";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Cart from "../../components/Cart";
import { CartContext } from "../../../context/CartContext";

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
  background-color: #f5f5f5;
`;

const ProductDetailsContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 1px solid #eaeaea;
`;

const ProductImageContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductDetails = styled.div`
  text-align: left;
`;

const ProductName = styled.h1`
  font-size: 28px;
  margin-bottom: 15px;
  color: #333;
  font-weight: bold;
`;

const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #0070f3;
  margin-bottom: 20px;
`;

const ProductDescription = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const AddToCartButton = styled.button`
  padding: 15px 30px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #005bb5;
  }
`;

const ProductPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (params.id) {
      const fetchProduct = async () => {
        const response = await fetch(
          `https://5fc9346b2af77700165ae514.mockapi.io/products/${params.id}`
        );
        const data = await response.json();
        setProduct(data);
      };
      fetchProduct();
    }
  }, [params.id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <Navbar />
      <ProductContainer>
        <ProductDetailsContainer>
          <ProductImageContainer>
            <ProductImage src={product.image} alt={product.name} />
          </ProductImageContainer>
          <ProductDetails>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}₺</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
            <AddToCartButton onClick={handleAddToCart}>
              Add to Cart
            </AddToCartButton>
          </ProductDetails>
        </ProductDetailsContainer>

        <CartContainer>
          <Cart />
        </CartContainer>
      </ProductContainer>
    </>
  );
};

export default ProductPage;
