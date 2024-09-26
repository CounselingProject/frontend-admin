'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { apiList } from '../apis/apiInfo';
import ApplicationList from '../components/ApplicationList';
import SearchBox from '../components/SearchBox';
import Pagination from '../../../commons/components/Pagination';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';
import { changeStatus } from '../apis/apiStatus';

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
  const [items, setItems] = useState([]);
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
  const onChangeStatus = useCallback((e, rno) => {
    const status = e.target.value;
    setItems(
      produce((draft) =>
        draft.forEach((item) => {
          if (item.rno === rno) {
            item.status = status;
          }
        }),
      ),
    );
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!confirm(t('정말_변경하겠습니까?'))) {
        return;
      }

      changeStatus(items); // 상태 변경 처리
    },
    [items, t],
  );

  return (
    <>
      <SearchBox
        search={search}
        onChange={onChangeSearch}
        onSubmit={onSubmitSearch}
        onToggle={onToggle}
      />
      <ApplicationList
        items={items}
        onChangeStatus={onChangeStatus}
        onSubmit={onSubmit}
      />
      {pagination && (
        <Pagination onClick={onChangePage} pagination={pagination} />
      )}
    </>
  );
};

export default React.memo(ApplicationListContainer);
