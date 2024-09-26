'use client';
import React, { useLayoutEffect } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
<<<<<<< HEAD

const PostsContainer = () => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();
  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode('posts');
  }, [setSubMenuCode, setMenuCode]);

  return <h1>게시판 등록/수정</h1>;
};

export default React.memo(PostsContainer);
=======
import PostForm from '../components/PostForm';

const PostsContainer = ({ searchParams }) => {
    const { setMenuCode, setSubMenuCode } = getCommonActions();

    useLayoutEffect(() => {
        setMenuCode('board');
        setSubMenuCode('posts');
    }, [setMenuCode, setSubMenuCode]);

    return (
        <section>
            <h1>게시판 등록/수정</h1>
            <PostForm searchParams={searchParams} />
        </section>
    );
};

export default React.memo(PostsContainer);
>>>>>>> master
