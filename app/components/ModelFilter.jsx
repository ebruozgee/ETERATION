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

const ModelList = styled.div`
  max-height: 100px;
  overflow-y: auto;
  border-top: none;
  padding: 10px;
  border-radius: 4px;
`;

const ModelOption = styled.label`
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

const ModelFilter = ({ models, selectedModels, setSelectedModels }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModelChange = (model) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter((item) => item !== model));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const filteredModels = models?.filter((model) =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FilterContainer>
      <FilterTitle>Model</FilterTitle>
      <SearchInput
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ModelList>
        {filteredModels?.map((model, index) => (
          <ModelOption key={index}>
            <input
              type="checkbox"
              checked={selectedModels.includes(model)}
              onChange={() => handleModelChange(model)}
            />
            {model}
          </ModelOption>
        ))}
      </ModelList>
    </FilterContainer>
  );
};

export default ModelFilter;
