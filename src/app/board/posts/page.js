import PostsContainer from '@/board/containers/PostsContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
<<<<<<< HEAD
const PostsPage = () => {
  return (
    <AdminOnlyContainer>
      <PostsContainer />
=======
const PostsPage = ({ searchParams }) => {
  return (
    <AdminOnlyContainer>
      <PostsContainer searchParams={searchParams} />
>>>>>>> master
    </AdminOnlyContainer>
  );
};

<<<<<<< HEAD
export default PostsPage;
=======
export default PostsPage;
>>>>>>> master
