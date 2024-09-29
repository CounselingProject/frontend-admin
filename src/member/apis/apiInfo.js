import requestData from '@/commons/libs/requestData';
import apiRequest from '@/commons/libs/apiRequest';

// 회원 목록 조회 API
export const apiGetMemberList = (search) => {
  // 검색 조건이 없으면 빈 객체로 초기화
  search = search ?? {};

  // 검색 조건을 쿼리 스트링 형식으로 변환
  const qs = [];

  for (const [key, value] of Object.entries(search)) {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }

  // 기본 URL 설정
  let url = '/member/admin';
  // 검색 조건이 있으면 URL에 쿼리 스트링을 추가
  if (qs.length > 0) url += `?${qs.join('&')}`;

  // requestData 함수를 사용하여 API 요청
  return requestData(url);
};

// 회원 한명 조회 API
export const apiGetMemberInfo = (email) => {
  // 이메일이 제공되지 않으면 에러 처리
  if (!email) {
    throw new Error("이메일은 필수 입력입니다.");
  }

  // 기본 URL 설정
  const url = `/info/${encodeURIComponent(email)}`;

  // requestData 함수를 사용하여 API 요청
  return requestData(url);
};

export const apiDeleteMember = (seq) => new Promise((resolve, reject) => {
  apiRequest(`/member/admin/delete/${seq}`, 'DELETE')
    .then((res) => {
      // 성공 여부는 status나 success 필드를 기준으로 확인
      if (res.data.success === true || res.data.status === 'OK') {
        resolve(res.data); // 성공 시 resolve
      } else {
        reject(res.data); // 실패 시 reject
      }
    })
    .catch((err) => {
      reject(err); // 오류 처리
    });
});

