import ListContainer from '@/board/containers/ListContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
<<<<<<< HEAD
const BoardListPage = () => {
  return (
    <AdminOnlyContainer>
      <ListContainer />
=======
const BoardListPage = ({ searchParams }) => {
  return (
    <AdminOnlyContainer>
      <ListContainer searchParams={searchParams} />
>>>>>>> master
    </AdminOnlyContainer>
  );
};

<<<<<<< HEAD
export default BoardListPage;
=======
export default BoardListPage;
>>>>>>> master
