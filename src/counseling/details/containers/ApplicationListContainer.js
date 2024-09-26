'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { apiList } from '../apis/apiInfo';
import apiStatus from '../apis/apiStatus';
import ItemsBox from '../components/ItemsBox';
import SearchBox from '../components/SearchBox';
import Pagination from '../../../commons/components/Pagination';
import { useTranslation } from 'react-i18next';

function getQueryString(searchParams) {
  const qs = {};
  if (searchParams.size > 0) {
    for (const [k, v] of searchParams) {
      qs[k] = v;
    }
  }
  return qs;
}

const ApplicationListContainer = ({ params, searchParams }) => {
  const { setMenuCode, setSubMenuCode } = getCommonActions();

  const [search, setSearch] = useState(() => getQueryString(searchParams));
  const [searchTmp, setSearchTmp] = useState({
    // 기본값 통합검색으로 설정
    copt: [],
    sopt: 'ALL',
    page: 1,
  });
  const [items, setItems] = useState([
    {
      rNo: 1,
      status: 'CANCEL',
      counselingType: 'PERSONAL',
      category: 'EMPLOYMENT',
      counselingName: '상담명',
      counselorName: '교수명',
      counselorEmail: 'user99@test.org',
      userName: '학생명',
      email: 'user01@test.org',
      rDateTime: '2024-09-24 14:00:00',
      record: '상담일지',
    },
  ]);
  const [pagination, setPagination] = useState({});
  const { rNo } = params;

  const { t } = useTranslation();

  useLayoutEffect(() => {
    setMenuCode('application');
    setSubMenuCode('details');
  }, [setMenuCode, setSubMenuCode]);

  useEffect(() => {
    (async () => {
      try {
        const { items, pagination } = await apiList(search);
        setItems(items);
        setPagination(pagination);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [search, rNo]);

  /* 검색 관련 함수 */
  const onChangeSearch = useCallback((e) => {
    setSearchTmp((search) => ({
      ...search,
      [e.target.name]: [e.target.value],
    }));
  }, []);

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      setSearch({ ...searchTmp, page: 1 });
    },
    [searchTmp],
  );

  const onToggle = useCallback((name, value) => {
    setSearch((search) => ({ ...search, [name]: value }));
  }, []);

  /* 페이지 변경 함수 */
  const onChangePage = useCallback((p) => {
    setSearch((search) => ({ ...search, page: p }));
  }, []);

  /* 진행상태 변경 함수*/
  const onChangeStatus = useCallback(
    (rNo) => {
      (async () => {
        try {
          const res = await apiStatus(rNo);
          setItems((items) =>
            items.map((item) => (item.rNo === rNo ? res : item)),
          );
        } catch (err) {
          console.error(err);
        }
      })();

      if (!window.alert(t('변경되었습니다.'))) {
        return;
      }
    },
    [t],
  );

  return (
    <>
      <SearchBox
        search={search}
        onChange={onChangeSearch}
        onSubmit={onSubmitSearch}
        onToggle={onToggle}
      />
      <ItemsBox items={items} onChangeStatus={onChangeStatus} />
      {items?.length > 0 && (
        <Pagination onClick={onChangePage} pagination={pagination} />
      )}
    </>
  );
};

export default React.memo(ApplicationListContainer);
