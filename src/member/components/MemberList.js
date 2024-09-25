import React from 'react';
import { useTranslation } from 'next-i18next';

const MemberList = ({ memberList = [], loading, error }) => { // 기본 값을 빈 배열로 설정

  const { t } = useTranslation();

  // 로딩 중일 때 표시할 내용
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 에러 발생 시 표시할 내용
  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  return (
    <div>
      <h1>{t('회원 목록')}</h1> {/* '회원 목록' 텍스트 감싸기 */}
      {/* 회원 목록을 테이블 형식으로 출력 */}
      <table>
        <thead>
        <tr>
          <th>{t('ID')}</th>
          <th>{t('이름')}</th>
          <th>{t('이메일')}</th>
          <th>{t('가입일')}</th>
        </tr>
        </thead>
        <tbody>
        {memberList.length > 0 ? (
          memberList.map((member) => (
            <tr key={member.id}>
              <td>{t(member.id)}</td>
              <td>{t(member.name)}</td>
              <td>{t(member.email)}</td>
              <td>{t(member.joinDate)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">{t('회원 목록이 없습니다.')}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(MemberList);
