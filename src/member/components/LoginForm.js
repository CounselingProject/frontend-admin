import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import StyledMessage from '@/commons/components/StyledMessage';
import { MemberStyledInput } from '@/commons/components/inputs/StyledInput';
import { StyledDt } from '@/commons/components/Mypage/StyledDt';
import { MypageStyledButton } from '@/commons/components/buttons/StyledButton';
import { StyledH1 } from '@/commons/components/Mypage/StyledH1';

// 부모 컨테이너 스타일 정의
const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const FormBox = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

// 스타일이 적용된 div
const MessageContainer = styled.div`
  text-align: center; /* 텍스트 가운데 정렬 */
  margin-top: 10px;
  color: #333; /* 텍스트 색상 */
  font-size: 14px;
`;

const LoginForm = ({ form, errors, onSubmit, onChange }) => {
  const { t } = useTranslation();

  return (
    <CenteredContainer>
      <FormBox onSubmit={onSubmit} autoComplete="off">
        <StyledH1>{t('로그인')}</StyledH1>

        {/* 스타일 적용된 div */}
        <MessageContainer>
          {t('금쪽상담소 관리자 로그인 페이지 입니다.')}
        </MessageContainer>

        <MessageContainer>
          {t('더 많은 서비스를 이용하시려면 아이디와 비밀번호를 입력해주세요.')}
        </MessageContainer>

        <dl>
          <StyledDt>{t('이메일')}</StyledDt>
          <dd>
            <MemberStyledInput
              type="text"
              name="email"
              value={form?.email || ''}
              onChange={onChange}
            />
            <StyledMessage variant="danger">{errors?.email}</StyledMessage>
          </dd>
        </dl>
        <dl>
          <StyledDt>{t('비밀번호')}</StyledDt>
          <dd>
            <MemberStyledInput
              type="password"
              name="password"
              value={form?.password || ''}
              onChange={onChange}
            />
            <StyledMessage variant="danger">{errors?.password}</StyledMessage>
          </dd>
        </dl>
        <MypageStyledButton type="submit" variant="green">
          {t('로그인')}
        </MypageStyledButton>
        <StyledMessage variant="danger">{errors?.global}</StyledMessage>
      </FormBox>
    </CenteredContainer>
  );
};

export default React.memo(LoginForm);
