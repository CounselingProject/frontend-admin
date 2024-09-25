import ListContainer from '@/board/containers/ListContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const BoardListPage = ({ searchParams }) => {
  return (
    <AdminOnlyContainer>
      <ListContainer searchParams={searchParams} />
    </AdminOnlyContainer>
  );
};

export default BoardListPage;