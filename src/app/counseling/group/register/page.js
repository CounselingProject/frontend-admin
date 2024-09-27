import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import GroupUpdateContainer from '@/counseling/group/containers/GroupUpdateContainer';

const GroupRegisterPage = ({ params }) => {
  return (
    <AdminOnlyContainer>
      <GroupUpdateContainer params={params} />
    </AdminOnlyContainer>
  );
};

export default GroupRegisterPage;
