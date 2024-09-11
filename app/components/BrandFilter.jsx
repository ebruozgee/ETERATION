import React, { useState } from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const FilterTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 100;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
`;

const BrandList = styled.div`
  max-height: 100px;
  overflow-y: auto;
  border-top: none;
  padding: 10px;
  border-radius: 4px;
`;

const BrandOption = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;

  input {
    margin-right: 10px;
  }
  input[type="checkbox"] {
    accent-color: #4f75ff;
  }
`;

const BrandFilter = ({ brands, selectedBrands, setSelectedBrands }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const filteredBrands = brands?.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FilterContainer>
      <FilterTitle>Brands</FilterTitle>
      <SearchInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <BrandList>
        {filteredBrands?.map((brand, index) => (
          <BrandOption key={index}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            {brand}
          </BrandOption>
        ))}
      </BrandList>
    </FilterContainer>
  );
};

export default BrandFilter;
