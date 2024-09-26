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
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`;

const SearchPost = ({ onSearch, searchParams }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchData = Object.fromEntries(formData);

        if (typeof onSearch === 'function') {
            onSearch(searchData);
        } else {
            console.error('onSearch 함수가 전달되지 않았습니다.');
        }
    };

    return (
        <SearchContainer>
            <form onSubmit={handleSubmit}>
                <SearchSelect name="sopt" defaultValue={searchParams.sopt}>
                    <option value="ALL">통합검색</option>
                    <option value="USERNAME">작성자</option>
                    <option value="SUBJECT">제목</option>
                    <option value="CONTENT">내용</option>
                </SearchSelect>
                <SearchInput
                    type="text"
                    name="skey"
                    defaultValue={searchParams.skey}
                    placeholder="검색어"
                />
                <SearchButton type="submit">검색하기</SearchButton>
            </form>
        </SearchContainer>
    );
};

export default SearchPost;