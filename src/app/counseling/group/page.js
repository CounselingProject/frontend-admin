import AdminOnlyContainer from '@/member/containers/AdminOnlyContainer';
import GroupListContainer from '@/counseling/group/GroupListContainer';

<<<<<<< HEAD
const CounselingGroupPage = ({searchParams}) => {
  return (
    <AdminOnlyContainer>
      <GroupListContainer searchParams={searchParams}/>
=======
const CounselingGroupPage = ({ searchParams }) => {
  return (
    <AdminOnlyContainer>
      <GroupListContainer searchParams={searchParams} />
>>>>>>> master
    </AdminOnlyContainer>
  );
};

export default CounselingGroupPage;
