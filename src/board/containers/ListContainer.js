'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import BoardList from '../components/BoardList';
import SearchForm from '../components/SearchForm';

const ListContainer = ({ searchParams }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode('list');
  }, [setMenuCode, setSubMenuCode]);

  return (
    <section>
      <h1>게시판 목록</h1>
      <BoardList searchParams={searchParams} />
    </section>
  );
};

export default React.memo(ListContainer);