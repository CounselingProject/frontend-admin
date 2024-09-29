import React from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { StyledButton } from '@/commons/components/buttons/StyledButton';

// 스타일 컴포넌트 정의
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 30px auto;
`;

const StyledThead = styled.thead`
  background-color: ${({ theme }) => theme.colors.green};
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
    background-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      opacity: 0.8;
    }
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.div`
    color: red;
    font-weight: bold;
`;

const LoadingMessage = styled.div`
    color: #007bff;
    font-weight: bold;
`;

const MemberList = ({ memberList = [], loading, error, onEmailClick,onDeleteClick  }) => {
  const { t } = useTranslation();

  if (loading) {
    return <LoadingMessage>{t('로딩 중...')}</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{t(`오류 발생: ${error.message}`)}</ErrorMessage>;
  }

  return (
    <FormBox>
      <StyledTable>
        <StyledThead>
          <tr>
            <StyledTh>{t('ID')}</StyledTh>
            <StyledTh>{t('회원유형')}</StyledTh>
            <StyledTh>{t('이름')}</StyledTh>
            <StyledTh>{t('이메일')}</StyledTh>
            <StyledTh>{t('휴댑전화번호')}</StyledTh>
            <StyledTh>{t('가입일')}</StyledTh>
            <StyledTh>{t('탈퇴일')}</StyledTh>
            <StyledTh>{t('회원탈퇴')}</StyledTh>
          </tr>
        </StyledThead>
        <tbody>
        {memberList.length > 0 ? (
          memberList.map((member) => (
            <tr key={`member_${member.seq}`}>
              <StyledTd>{member.seq}</StyledTd>
              <StyledTd>{member.userType}</StyledTd>
              <StyledTd>{member.userName}</StyledTd>
              <StyledTd onClick={() => onEmailClick(member)} style={{ cursor: 'pointer', color: 'green' }}>
                {member.email}
              </StyledTd>
              <StyledTd>{member.mobile}</StyledTd>
              <StyledTd>{member.createdAt}</StyledTd>
              <StyledTd>{member.deletedAt}</StyledTd>
              <StyledTd>
                <StyledButton onClick={() => onDeleteClick(member) } style={{ cursor: 'pointer'}}>{t('탈퇴')}</StyledButton>
              </StyledTd>
            </tr>
          ))
        ) : (
          <tr>
            <StyledTd colSpan="4">{t('회원_목록이_없습니다.')}</StyledTd>
          </tr>
        )}
        </tbody>
      </StyledTable>
    </FormBox>
  );
};

export default React.memo(MemberList);
