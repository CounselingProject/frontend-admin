'use client';
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { apiGetMemberList } from '@/member/apis/apiInfo'; // 회원 목록 조회 요청 메서드 불러오기
import MemberList from '@/member/components/MemberList'; // MemberList 컴포넌트 불러오기
import Pagination from '@/commons/components/Pagination'; // 페이지네이션 컴포넌트 불러오기

const ListContainer = () => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  // 회원 목록 데이터를 저장할 state
  const [memberList, setMemberList] = useState([]);
  const [pagination, setPagination] = useState(null); // 페이지네이션 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [page, setPage] = useState(1); // 현재 페이지 상태

  // 메뉴 코드 설정
  useLayoutEffect(() => {
    setMenuCode('member');
    setSubMenuCode('list');
  }, [setMenuCode, setSubMenuCode]);

  // 회원 목록 요청 및 처리
  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        setLoading(true); // 요청 시작 시 로딩 상태 true로 설정
        const searchParams = {
          page: page,  // 페이지 번호를 state에서 가져옴
          limit: 20,   // 한 페이지당 레코드 수
          sopt: 'ALL', // 검색 옵션
          skey: '',    // 검색 키워드 (없을 경우 빈 값)
        };

        // 회원 목록 조회 요청
        const data = await apiGetMemberList(searchParams);
        setMemberList(data.items); // 받은 데이터에서 회원 목록 설정
        setPagination(data.pagination); // 페이지네이션 정보 설정
        console.log(data.items);
      } catch (err) {
        console.error('회원 목록 조회 오류:', err);
        setError(err); // 오류 발생 시 에러 상태 설정
      } finally {
        setLoading(false); // 요청 완료 시 로딩 상태 false로 설정
      }
    };

    fetchMemberList();
  }, [page]); // 페이지 상태가 변경될 때마다 데이터 요청

  // 페이지 변경 핸들러
  const onPageClick = useCallback((newPage) => {
    setPage(newPage); // 선택한 페이지로 상태 변경
  }, []);

  // 로딩 중일 때 출력할 내용
  if (loading) {
    return <h1>로딩 중...</h1>;
  }

  // 에러 발생 시 출력할 내용
  if (error) {
    return <h1>오류 발생: {error.message}</h1>;
  }

  // MemberList 컴포넌트에 데이터 전달
  return (
    <>
      <MemberList
        memberList={memberList}
        loading={loading}
        error={error}
      />
      <Pagination pagination={pagination} onClick={onPageClick} /> {/* 페이지네이션 컴포넌트 */}
    </>
  );
};

export default React.memo(ListContainer);
