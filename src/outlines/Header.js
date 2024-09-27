'use client';
import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import cookies from 'react-cookies';
import { useTranslation } from 'react-i18next';
import { getCommonStates } from '../commons/contexts/CommonContext';
import { getUserContext } from '@/commons/contexts/UserInfoContext';
import Image from 'next/image';

const HeaderBox = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};

    .logo-container {
        display: flex;
        align-items: center;

        .logo {
            margin-right: 10px; /* 두 로고 사이 간격 */
        }
    }

    .main-menu {
        display: flex;
        margin-right: auto; /* 메뉴를 왼쪽으로 정렬 */
        a {
            margin: 0 15px;
            color: ${({ theme }) => theme.colors.white};
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .auth-links {
        display: flex;
        align-items: center;

        a {
            margin-left: 10px;
            color: ${({ theme }) => theme.colors.white};
        }
    }
`;

const Header = () => {
  const [login, setLogin] = useState(false);
  const { t } = useTranslation();
  const { showHeader } = getCommonStates();
  const {
    states: { isLogin, userInfo, isAdmin },
    actions: { setIsLogin, setIsAdmin, setUserInfo },
  } = getUserContext();

  useEffect(() => {
    setLogin(isLogin);
  }, [isLogin]);

  const onLogout = useCallback(() => {
    setIsLogin(false);
    setIsAdmin(false);
    setUserInfo(null);
    cookies.remove('token', { path: '/' });
  }, [setIsLogin, setIsAdmin, setUserInfo]);

  // 관리자 URL
  const adminUrl =
    process.env.NEXT_PUBLIC_ADMIN_URL + '?token=' + cookies.load('token');

  return (
    showHeader && (
      <HeaderBox>
        <div className="logo-container">
          <a href="/" className="logo">
            <Image
              src="/images/logo/logo1.png"
              alt="로고1"
              width={43}
              height={35}
            />
          </a>
          <a href="/" className="logo">
            <Image
              src="/images/logo/logo3.png"
              alt="로고2"
              width={200}
              height={10}
            />
          </a>
        </div>
        <div className="auth-links">
          {login ? (
            <>
              <span>
                {userInfo?.userName}({userInfo?.email}){t('님_로그인')}
              </span>
              <a onClick={onLogout}>{t('로그아웃')}</a>
              <a href="/mypage">{t('마이페이지')}</a>
            </>
          ) : (
            <>
              <a href="/member/join">{t('회원가입')}</a>
              <a href="/member/login">{t('로그인')}</a>
            </>
          )}
        </div>
      </HeaderBox>
    )
  );
};

export default React.memo(Header);
