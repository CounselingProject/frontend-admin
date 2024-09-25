'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const List = styled.div`
  .group_item {
  }
`;

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
  margin: 100px 100px;
  width: 200px;
  height: 50px;
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
