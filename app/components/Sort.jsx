import React, { useState } from "react";
import styled from "styled-components";

const SortContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SortTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 100;
`;

const SortOption = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  input {
    margin-right: 10px;
  }
  input[type="radio"] {
    accent-color: #4f75ff;
  }
`;

const Sort = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState("oldToNew");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <SortContainer>
      <SortTitle>Sort By</SortTitle>
      <SortOption>
        <input
          type="radio"
          value="oldToNew"
          checked={selectedSort === "oldToNew"}
          onChange={handleSortChange}
        />
        Old to new
      </SortOption>
      <SortOption>
        <input
          type="radio"
          value="newToOld"
          checked={selectedSort === "newToOld"}
          onChange={handleSortChange}
        />
        New to old
      </SortOption>
      <SortOption>
        <input
          type="radio"
          value="priceHighToLow"
          checked={selectedSort === "priceHighToLow"}
          onChange={handleSortChange}
        />
        Price high to low
      </SortOption>
      <SortOption>
        <input
          type="radio"
          value="priceLowToHigh"
          checked={selectedSort === "priceLowToHigh"}
          onChange={handleSortChange}
        />
        Price low to high
      </SortOption>
    </SortContainer>
  );
};

export default Sort;
