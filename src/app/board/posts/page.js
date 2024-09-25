import PostsContainer from '@/board/containers/PostsContainer';
import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
const PostsPage = ({ searchParams }) => {
  return (
    <AdminOnlyContainer>
      <PostsContainer searchParams={searchParams} />
    </AdminOnlyContainer>
  );
};

export default PostsPage;