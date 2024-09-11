"use client";
import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/CartContext";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background-color: #0070f3;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: #fff;
  text-transform: uppercase;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffff;
  padding: 10px 20px;
  border-radius: 30px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 10px;
  width: 100%;
  font-size: 16px;
  color: #2c2c2c;
  background-color: transparent;
  &::placeholder {
    color: #b3b3b3;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #ffcc00;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: normal;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ffcc00;
  }
`;

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { totalPrice } = useContext(CartContext);

  return (
    <NavbarContainer>
      <Wrapper>
        {" "}
        <Link href={`/`} style={{ textDecoration: "none" }}>
          <Logo>ETERATION</Logo>
        </Link>
        <SearchContainer>
          <BiSearch color="#2c2c2c" size={20} />
          <SearchInput
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </Wrapper>

      <IconContainer>
        <IconButton>
          <FaShoppingBag size={22} />
          <TotalPrice style={{ marginLeft: "10px" }}>{totalPrice}₺</TotalPrice>
        </IconButton>

        <IconButton>
          <FaUser size={22} />
          <User style={{ marginLeft: "10px" }}>Kerem</User>
        </IconButton>
      </IconContainer>
    </NavbarContainer>
  );
};

export default Navbar;
