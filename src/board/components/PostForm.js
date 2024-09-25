'use client'; 
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import SearchPost from './SearchPost';

const FormBox = styled.div`
  width: 100%;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

const StyledThead = styled.thead`
  background-color: #3f51b5;
`;

const StyledTh = styled.th`
  padding: 12px;
  color: white;
  text-align: center;
  border-right: 2px solid white;

  &:last-child {
    border-right: none;
  }
`;

const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  border-right: 2px solid white;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const PostForm = () => {
  const { t } = useTranslation();

  // 예시 데이터
  const [examplePosts, setExamplePosts] = useState([
    { seq: 1, username: '기쁨이', subject: '첫 번째 게시글', content: '첫 번째 게시글 내용입니다.' },
    { seq: 2, username: '슬픔이', subject: '두 번째 게시글', content: '두 번째 게시글 내용입니다.' },
    { seq: 3, username: '버럭이', subject: '세 번째 게시글', content: '세 번째 게시글 내용입니다.' },
    { seq: 4, username: '까칠이', subject: '네 번째 게시글', content: '네 번째 게시글 내용입니다.' },
    { seq: 5, username: '소심이', subject: '다섯 번째 게시글', content: '다섯 번째 게시글 내용입니다.' },
  ]);

  const [searchParams, setSearchParams] = useState({ sopt: 'ALL', skey: '' });
  const [filteredPosts, setFilteredPosts] = useState(examplePosts);

  const handleDelete = (seq) => {
    setExamplePosts(prevPosts => prevPosts.filter(post => post.seq !== seq));
    setFilteredPosts(prevPosts => prevPosts.filter(post => post.seq !== seq));
  };

  const handleSearch = (searchData) => {
    const { sopt, skey } = searchData;
    const filtered = examplePosts.filter(post => {
      if (sopt === 'ALL') {
        return post.username.includes(skey) || post.subject.includes(skey) || post.content.includes(skey);
      }
      if (sopt === 'USERNAME') {
        return post.username.includes(skey);
      }
      if (sopt === 'SUBJECT') {
        return post.subject.includes(skey);
      }
      if (sopt === 'CONTENT') {
        return post.content.includes(skey);
      }
      return true;
    });
    setFilteredPosts(filtered);
    setSearchParams(searchData);
  };

  return (
    <FormBox>
      <SearchPost onSearch={handleSearch} searchParams={searchParams} />
      <StyledTable>
        <StyledThead>
          <tr>
            <StyledTh>글번호</StyledTh>
            <StyledTh>작성자</StyledTh>
            <StyledTh>제목</StyledTh>
            <StyledTh>내용</StyledTh>
            <StyledTh>관리</StyledTh>
          </tr>
        </StyledThead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <tr key={post.seq}>
                <StyledTd>{post.seq}</StyledTd>
                <StyledTd>{post.username}</StyledTd>
                <StyledTd>{post.subject}</StyledTd>
                <StyledTd>{post.content}</StyledTd>
                <StyledTd>
                  <DeleteButton onClick={() => handleDelete(post.seq)}>삭제</DeleteButton>
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
    </FormBox>
  );
};

export default React.memo(PostForm);