import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledThead = styled.thead`
  background-color: #005d4f;
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
      background-color: #005d4f;
      color: white;
    }

    &.delete {
      background-color: #e74c3c;
      color: white;
    }
  }
`;

const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

const BoardList = ({ items, onDelete }) => {
  return (
    <div>
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
          {items && items.length > 0 ? (
            items.map(({ bid, bname, active, listOrder }) => (
              <tr key={bid}>
                <StyledTd>{bid}</StyledTd>
                <StyledTd>{bname}</StyledTd>
                <StyledTd>{active ? '사용' : '사용안함'}</StyledTd>
                <StyledTd>{listOrder}</StyledTd>
                <StyledTd>
                  <Link href={`/board/update/${bid}`} passHref>
                    <button type="button" className="edit">
                      수정
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => onDelete(bid)}
                  >
                    삭제
                  </button>
                </StyledTd>
              </tr>
            ))
          ) : (
            <tr>
              <StyledTd colSpan="5">조회된 게시판이 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default BoardList;
