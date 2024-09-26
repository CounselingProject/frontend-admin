'use client';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'react-i18next';
import BoardList from '../components/BoardList';
import SearchForm from '../components/SearchForm';
import { getBoardList, deleteBoard } from '../apis/apiBoard';
import Pagination from '@/commons/components/Pagination';

const ListContainer = ({ searchParams }) => {
  const { t } = useTranslation();
  const { setMenuCode, setSubMenuCode, setMainTitle } = getCommonActions();
  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState(null);
  searchParams.page = searchParams.page ?? 1;
  const [search, setSearch] = useState(searchParams);
  const [_search, _setSearch] = useState(searchParams);

  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode('list');
    setMainTitle(t('게시판_목록'));
  }, [setMenuCode, setSubMenuCode, setMainTitle, t]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBoardList(search);
        if (data) {
          setItems(data.items);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [search]);

  const onPageClick = useCallback((page) => {
    setSearch((search) => ({ ...search, page }));
  }, []);

  const onDelete = useCallback((bid) => {
    if (!confirm('정말 삭제하겠습니까?')) {
      return;
    }

    (async () => {
      try {
        await deleteBoard(bid);
        setItems((items) => items.filter((item) => item.bid != bid));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const onSearch = useCallback((e) => {
    _setSearch((search) => ({ ...search, [e.target.name]: e.target.value }));
  }, []);

  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setSearch((search) => ({ ...search, ..._search }));
    },
    [_search],
  );

  return (
    <section>
      <h1>게시판 목록</h1>
      <SearchForm
        searchParams={_search}
        onSearch={onSearch}
        onSearchSubmit={onSearchSubmit}
      />
      <BoardList items={items} onDelete={onDelete} />
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </section>
  );

};

export default React.memo(ListContainer);
