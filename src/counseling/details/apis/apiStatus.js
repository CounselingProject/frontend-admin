import requestData from '@/commons/libs/requestData';
import saveProcess from '@/commons/libs/saveProcess';
export default function change(rNo, status) {
  return requestData(`/counseling/admin/apply/${rNo}/${status}`);
}

export const changeStatus = (items) => {
  const rno = items.map((item) => item.rno);
  const status = items.map((item) => item.status);
  return saveProcess('/counseling/admin/status/change', 'PATCH', {
    rno,
    status,
  });
};
