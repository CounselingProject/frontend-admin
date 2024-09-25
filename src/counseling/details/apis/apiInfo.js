import requestData from '../../../commons/libs/requestData';

// 목록 조회
export const apiList = (search) => {
  search = search ?? {};

  const qs = [];
  for (const [k, v] of Object.entries(search)) {
    qs.push(`${k}=${v}`);
  }

  let url = '/admin/apply';
  if (qs.length > 0) url += `?${qs.join('&')}`;
  return requestData(url);
};