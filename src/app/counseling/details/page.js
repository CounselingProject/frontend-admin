import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import ApplicationListContainer from '@/counseling/details/containers/ApplicationListContainer';

const counselingPage = (props) => {
    // 페이지 컴포넌트의 props에는 params 속성(경로 변수), searchParams 속성(쿼리 스트링 값)이 담겨 있음 - 검색 항목 구성시 필요
  return (
    <AdminOnlyContainer>
      <ApplicationListContainer {...props} />
    </AdminOnlyContainer>
  );
};

export default counselingPage;
