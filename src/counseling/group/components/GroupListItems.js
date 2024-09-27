'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';


const ListItem = ({ item, className }) => {
  console.log(item);
  return (
    <li className={className}>

      {/* 집단상담 프로그램번호 , 명 */}

      <Link href={`/counseling/group/update/${item.cno}`}>
        {item.counselingName}
      </Link>
    </li>
  );
};


const StyledListItem = styled(ListItem)`
  display: list-item;
  margin: 20px 0; /* 간격 조정 */
  padding: 15px; /* 패딩 추가 */
  width: 300px; /* 너비 조정 */
  height: 60px; /* 높이 조정 */
  background-color: #f9f9f9; /* 배경색 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  transition: background-color 0.3s; /* 배경색 전환 효과 */

  &:hover {
    background-color: #e2f1ff; /* 호버 시 색상 변경 */
  }

  a {
    text-decoration: none; /* 링크 장식 제거 */
    color: #333; /* 글자 색상 조정 */
    font-weight: bold; /* 글자 두껍게 */
  }
`;

const GroupListItems = ({ items }) => {
  return (
    items &&
    items.length > 0 &&
    items.map((item) => (
      <StyledListItem key={`counseling_${item.cno}`} item={item} />
    ))
  );
};

export default React.memo(GroupListItems);
