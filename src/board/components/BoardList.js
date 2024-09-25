import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import Link from 'next/link';

const exampleBoardData = [
  { bid: 'counselingboard', bName: '상담 게시판', active: true, listOrder: 0 },
  { bid: 'reviewboard', bName: '상담 일지', active: true, listOrder: 1 },
  { bid: 'noticeboard', bName: '공지사항', active: true, listOrder: 2 },
];

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledThead = styled.thead`
  background-color: #3f51b5;
`;

const StyledTh = styled.th`
  padding: 12px;
  color: white;
  text-align: center;
  border-right: 1px solid white;

  &:last-child {
    border-right: none;
  }
`;

const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  text-align: center;

  &:last-child {
    border-right: none;
  }

  button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &.edit {
      background-color: #4a90e2;
      color: white;
    }

    &.delete {
      background-color: #e74c3c;
      color: white;
    }
  }
`;

const BoardList = ({ searchParams: initialSearchParams }) => {
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [boardData, setBoardData] = useState(exampleBoardData);

  const handleSearch = (searchData) => {
    const { sopt, skey } = searchData;
    setSearchParams(searchData);

    const filteredData = exampleBoardData.filter((board) => {
      if (sopt === 'ALL') {
        return Object.values(board).some((value) =>
          String(value).toLowerCase().includes(skey.toLowerCase())
        );
      }
      return String(board[sopt]).toLowerCase().includes(skey.toLowerCase());
    });

    setBoardData(filteredData);
  };

  const handleDelete = (bid) => {
    if (window.confirm(`${bid} 게시글을 정말 삭제하시겠습니까?`)) {
      setBoardData((prevData) => prevData.filter((board) => board.bid !== bid));
      console.log(`게시글 ${bid} 삭제 완료`);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} searchParams={searchParams} />
      <StyledTable>
        <StyledThead>
          <tr>
            <StyledTh>게시판 ID</StyledTh>
            <StyledTh>게시판 이름</StyledTh>
            <StyledTh>사용여부</StyledTh>
            <StyledTh>진열가중치</StyledTh>
            <StyledTh>관리</StyledTh>
          </tr>
        </StyledThead>
        <tbody>
          {boardData.length > 0 ? (
            boardData.map((board) => (
              <tr key={board.bid}>
                <StyledTd>{board.bid}</StyledTd>
                <StyledTd>{board.bName}</StyledTd>
                <StyledTd>{board.active ? '사용' : '사용안함'}</StyledTd>
                <StyledTd>{board.listOrder}</StyledTd>
                <StyledTd>
                  <Link href={`/board/update/${board.bid}`} passHref>
                    <button className="edit">수정</button>
                  </Link>
                  <button
                    className="delete"
                    onClick={() => handleDelete(board.bid)}
                  >
                    삭제
                  </button>
                </StyledTd>
              </tr>
            ))
          ) : (
            <tr>
              <StyledTd colSpan="5">조회된 게시글이 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default BoardList;