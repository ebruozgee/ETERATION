"use client";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Sort from "./Sort";
import BrandFilter from "./BrandFilter";
import ModelFilter from "./ModelFilter";
import Cart from "./Cart";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  padding: 20px;
`;

const FiltersContainer = styled.div`
  flex: 0.8;
  padding: 20px;
  margin-right: 20px;
`;

const ProductsContainer = styled.div`
  flex: 2.5;
  padding: 20px;
  background-color: #fff;
  margin-right: 20px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const CartAreaContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  background-color: ${({ active }) => (active ? "#005bb5" : "#0070f3")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #005bb5;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://5fc9346b2af77700165ae514.mockapi.io/products"
      );
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setSortedProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products;

    if (searchTerm !== "") {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedModels.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        selectedModels.includes(product.model)
      );
    }

    setFilteredProducts(updatedProducts);
    setSortedProducts(updatedProducts);
  }, [selectedBrands, selectedModels, searchTerm, products]);

  const handleSortChange = (sortOption) => {
    let sortedArray = [...filteredProducts];
    if (sortOption === "oldToNew") {
      sortedArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === "newToOld") {
      sortedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "priceHighToLow") {
      sortedArray.sort((a, b) => b.price - a.price);
    } else if (sortOption === "priceLowToHigh") {
      sortedArray.sort((a, b) => a.price - b.price);
    }
    setSortedProducts(sortedArray);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const brands = Array.from(new Set(products.map((product) => product.brand)));
  const models = Array.from(new Set(products.map((product) => product.model)));

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />{" "}
      <PageContainer>
        <FiltersContainer>
          <Sort onSortChange={handleSortChange} />
          <BrandFilter
            brands={brands}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />
          <ModelFilter
            models={models}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
          />
        </FiltersContainer>

        <ProductsContainer>
          {currentProducts.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </ProductsContainer>

        <CartAreaContainer>
          <Cart />
        </CartAreaContainer>
      </PageContainer>
      {/* Sayfalama */}
      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </PaginationButton>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <PaginationButton
              key={number}
              onClick={() => handlePageClick(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </PaginationButton>
          )
        )}

        <PaginationButton
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </PaginationButton>
      </PaginationContainer>
    </>
  );
}
