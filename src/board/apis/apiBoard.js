import requestData from '../../commons/libs/requestData';
import saveProcess from '@/commons/libs/saveProcess';
export const regist = (form) => saveProcess(`/board/admin/save`, 'POST', form);

export const update = (form) => saveProcess(`/board/admin/save`, 'PATCH', form);

// 게시판 조회
export const getBoardList = (search) => {
  search = search ?? {};
  let qs = Object.entries(search)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  qs = qs ? `?${qs}` : qs;

  const url = `/board/admin/list${qs}`;

  return requestData(url);
};

// 게시판 설정 하나 조회
export const getBoard = (bid) => requestData(`/board/admin/info/${bid}`);

export const deleteBoard = (bid) =>
  requestData(`/board/admin/delete/${bid}`, 'DELETE');

// 게시글 하나 조회
export const getInfo = (seq) => requestData(`/board/info/${seq}`);

// 게시글 목록 조회
export const getList = (bid, search) => {
  search = search ?? {};
  let qs = Object.entries(search)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  qs = qs ? `?${qs}` : qs;

  const url = `/board/list/${bid}${qs}`;

  return requestData(url);
};

export const deleteData = (seq) =>
  requestData(`/board/delete/${seq}`, 'DELETE');
