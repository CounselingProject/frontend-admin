import saveProcess from '@/commons/libs/saveProcess';

export const changeStatus = (items) => {
  const rno = items.map((item) => item.rno);
  const status = items.map((item) => item.status);
  return saveProcess('/counseling/admin/status/change', 'PATCH', {
    rno,
    status,
  });
};
