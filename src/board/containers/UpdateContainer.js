'use client';
<<<<<<< HEAD
import React, { useLayoutEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import BoardForm from '../components/BoardForm';
=======
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import BoardForm from '../components/BoardForm';
import { regist, update, getBoard } from '../apis/apiBoard';
import { useRouter } from 'next/navigation';
>>>>>>> master

const UpdateContainer = ({ params }) => {
  const { bid } = params;
  const { t } = useTranslation();
  const { setMenuCode, setSubMenuCode, setMainTitle } = getCommonActions();
<<<<<<< HEAD
  const [form, setForm] = useState({});
=======
  const router = useRouter();

  const [form, setForm] = useState({
    mode: 'register',
    active: false,
    rowsPerPage: 20,
    pageCountPc: 10,
    pageCountMobile: 5,
    useReply: false,
    useComment: false,
    useEditor: false,
    useUploadImage: false,
    useUploadFile: false,
    locationAfterWriting: 'list',
    showListBelowView: false,
    skin: 'default',
    listAccessType: 'ALL',
    viewAccessType: 'ALL',
    writeAccessType: 'ALL',
    replyAccessType: 'ALL',
    commentAccessType: 'ALL',
    privateAccess: false,
  });

>>>>>>> master
  const [errors, setErrors] = useState({});

  useLayoutEffect(() => {
    setMenuCode('board');
    setSubMenuCode('register');
    setMainTitle(bid ? t('게시판_수정') : t('게시판_등록'));
  }, [setSubMenuCode, setMenuCode, setMainTitle, t, bid]);

<<<<<<< HEAD
  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);
=======
  useEffect(() => {
    if (bid) {
      (async () => {
        try {
          const data = await getBoard(bid);
          if (data) {
            data.mode = 'update';
            setForm(data);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [bid]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const requiredFields = {
        bid: t('게시판_ID를_입력하세요'),
        bname: t('게시판_이름을_입력하세요'),
      };

      const _errors = {};
      let hasErrors = false;
      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field]?.trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setErrors(_errors);
        return;
      }

      try {
        if (bid) {
          await update(form);
        } else {
          await regist(form);
        }
        router.replace('/board/list');
      } catch (err) {
        console.error(err);
        setErrors(err.message);
      }
    },
    [form, router, t],
  );
>>>>>>> master

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onToggle = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
<<<<<<< HEAD
=======

>>>>>>> master
  return (
    <BoardForm
      form={form}
      errors={errors}
      onChange={onChange}
      onToggle={onToggle}
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(UpdateContainer);
