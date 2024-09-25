'use client';
import React, { useLayoutEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import BoardForm from '../components/BoardForm';
import { register } from '../apis/register';

const UpdateContainer = ({ params }) => {
    const { bid } = params;
    const { t } = useTranslation();
    const { setMenuCode, setSubMenuCode, setMainTitle } = getCommonActions();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    useLayoutEffect(() => {
      setMenuCode('board');
      setSubMenuCode('register');
      setMainTitle(bid ? t('게시판_수정') : t('게시판_등록'));
    }, [setSubMenuCode, setMenuCode, setMainTitle, t, bid]);

    const onSubmit = useCallback(async (e) => {
      e.preventDefault();

      const requiredFields = {
        bid: t('게시판_ID를_입력하세요'),
        bName: t('게시판_이름을_입력하세요'),
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
        await register(form);
      } catch (err) {
        setErrors(err.message);
      }
    }, [form, register]);

    const onChange = useCallback((e) => {
      setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    }, []);

    const onToggle = useCallback((name, value) => {
      setForm((form) => ({ ...form, [name]: value }));
    }, []);

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