import React from 'react';
import Modal from '@/commons/components/Modal'; // Modal 컴포넌트 import
import styled from 'styled-components';
import { useTranslation } from 'next-i18next'; // i18n import
import userType from '@/member/constants/userType';
import userStatus from '@/member/constants/userStatus';

// 스타일 컴포넌트 정의
const InfoContainer = styled.div`
    h2 {
        margin-bottom: 10px;
    }
`;

const MemberDetailInfo = ({ member, onClose }) => {
  const { t } = useTranslation(); // 번역 함수

  if (!member) return null; // 선택된 회원이 없으면 아무것도 렌더링하지 않음

  return (
    <Modal onClose={onClose}>
      <InfoContainer>
        <h2>{t('회원 정보')}</h2>
        <p>{t('이름')}: {member.userName}</p>
        <p>{t('이메일')}: {member.email}</p>
        <p>{t('가입일')}: {member.createdAt}</p>
        <p>{t('휴대전화번호')}: {member.mobile}</p>
        <p>{t('생년월일')}: {member.birth}</p>
        <p>{t('주소')}: {member.address} {member.addresssub}</p>
        <p>{t('우편번호')}: {member.zonecode}</p>
        <p>{t('성별')}: {member.gender}</p>
        <p>{t('회원유형')}: {userType[member.userType]}</p>
        <p>{t('회원상태')}: {member.userType === 'STUDENT' ? userStatus[member.status] : member.status}</p>
        <p>{member.userType === 'COUNSELOR' ? t('부서명') : t('학과명')}: {member.deptNm}</p>
        <p>{member.userType === 'COUNSELOR' ? t('부서번호') : t('학과번호')}: {member.deptNo}</p>
        {/* 학생 또는 상담사일 경우 추가 정보 표시 */}
        {member.userType === 'STUDENT' && (
          <>
            <p>{t('학번')}: {member.stdntNo}</p>
            <p>{t('학년')}: {member.grade}</p>
            <p>{t('지도교수')}: {member.professor}</p>
          </>
        )}
        {member.userType === 'COUNSELOR' && (
          <>
            <p>{t('사번')}: {member.empNo}</p>
            <p>{t('담당과목')}: {member.subject}</p>
          </>
        )}
      </InfoContainer>
    </Modal>
  );
};

export default MemberDetailInfo;
