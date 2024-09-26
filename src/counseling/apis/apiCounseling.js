import requestData from '@/commons/libs/requestData';
import saveProcess from '@/commons/libs/saveProcess';
<<<<<<< HEAD

// 상담사 조회 : 집단상담 프로그램 조회 시 
export const getCounselors = (skey) =>
  requestData(`/member/admin/counselors?skey=${skey}`);

// 집단상담 프로그램 등록 
export const registerGroupProgram = (form) =>
  saveProcess('/counseling/admin/counseling', 'POST', form);

// 집단상담 프로그램 수정
export const updateGroupProgram = (form) =>
  saveProcess('/counseling/admin/counseling', 'PATCH', form);

// 집단상담 프로그램 목록
export const getList = (search) => {
    search = search ?? {};
=======
export const getCounselors = (skey) =>
  requestData(`/member/admin/counselors?skey=${skey}`);

export const registerGroupProgram = (form) =>
  saveProcess('/counseling/admin/counseling', 'POST', form);

export const updateGroupProgram = (form) =>
  saveProcess('/counseling/admin/counseling', 'PATCH', form);

export const getList = (search) => {
  search = search ?? {};
>>>>>>> master

  const qs = [];

  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/counseling/counseling';
  if (qs.length > 0) url += `?${qs.join('&')}`; //검색 조건이 있을 때

  return requestData(url);
};
<<<<<<< HEAD

=======
>>>>>>> master
