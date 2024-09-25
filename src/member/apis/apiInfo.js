import apiRequest from '../../commons/libs/apiRequest';
import cookies from 'react-cookies';

/**
 * 회원 목록 조회 API 요청
 * @param {Object} searchParams - 페이지 번호, 한 페이지당 레코드 수, 검색 옵션, 검색 키워드 등을 포함한 검색 파라미터 객체
 * @returns {Promise} API 요청 결과를 Promise로 반환
 */
export const apiGetMemberList = (searchParams) =>
  new Promise((resolve, reject) => {

    // 검색 파라미터를 포함하여 API 요청
    apiRequest('/member/admin', 'GET', null, searchParams)
      .then((res) => {
        if (res.status !== 200) {
          // 검증 실패
          reject(res.data);
          return;
        }

        // 성공적으로 데이터를 받았을 경우
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
