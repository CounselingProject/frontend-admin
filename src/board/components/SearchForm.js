import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const SearchSelect = styled.select`
  width: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.green};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchForm = ({ onSearch, searchParams, onSearchSubmit }) => {
  return (
    <SearchContainer>
      <form onSubmit={onSearchSubmit}>
        <SearchSelect
          name="sopt"
          value={searchParams?.sopt ?? 'ALL'}
          onChange={onSearch}
        >
          <option value="ALL">통합검색</option>
          <option value="bid">게시판 ID</option>
          <option value="bName">게시판 이름</option>
        </SearchSelect>
        <SearchInput
          type="text"
          name="skey"
          value={searchParams?.skey ?? ''}
          placeholder="검색어"
          onChange={onSearch}
        />
        <SearchButton type="submit">검색하기</SearchButton>
      </form>
    </SearchContainer>
  );
};

export default SearchForm;
