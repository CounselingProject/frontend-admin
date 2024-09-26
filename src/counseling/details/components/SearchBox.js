'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io';

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 7px;
  padding: 20px;
  margin: 20px auto;
  border-radius: 8px;

  dl {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-bottom: 10px;
  }

  dt {
    font-size: 1.1rem;
    font-weight: bold;
    width: 70px;
    flex-shrink: 0;
  }

  dd {
    flex-grow: 1;
    margin:
    width: 100%;
  }

  select,
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  select {
    width: 30%; /* sopt select box의 너비 조정 */
  }

  input {
    width: 70%; /* skey input의 너비 조정 */
  }
`;

const StyledInput = styled.input`
  border: 1px solid #dcdcdc;
  padding: 10px;
  border-radius: 3px;
  width: 50%;
`;

const SearchBox = ({ search, onChange, onSubmit, onToggle }) => {
  const { t } = useTranslation();
  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <dl>
        <dt>{t('상담일')}</dt>
        <dd>
          <InputWrapper>
            <StyledInput
              type="date"
              name="sDate"
              value={search?.sDate ?? ''}
              onChange={onChange}
              placeholder={t('시작일')}
            />
            ~
            <StyledInput
              type="date"
              name="eDate"
              value={search?.eDate ?? ''}
              onChange={onChange}
              placeholder={t('종료일')}
            />
          </InputWrapper>
        </dd>
      </dl>
      <dl>
        <dt>{t('상담종류')}</dt>
        <dd>
          <select
            name="counselingType"
            value={search?.counselingType ?? ''}
            onChange={onChange}
          >
            <option value="">{t('전체')}</option>
            <option value="GROUP">{t('집단상담')}</option>
            <option value="PERSONAL">{t('개인상담')}</option>
          </select>
          {search?.counselingType === 'PERSONAL' && (
            <select
              name="category"
              value={search?.category}
              onChange={onChange}
            >
              <option value="">{t('전체')}</option>
              <option value="PROFESSOR">{t('교수상담')}</option>
              <option value="EMPLOYMENT">{t('취업상담')}</option>
              <option value="PSYCHOLOGICAL">{t('심리상담')}</option>
            </select>
          )}
        </dd>
      </dl>
      <dl>
        <dt>{t('진행상태')}</dt>
        <dd>
          <span onClick={() => onToggle('status', 'APPLY')}>
            {search?.status === 'APPLY' ? (
              <IoMdRadioButtonOn />
            ) : (
              <IoMdRadioButtonOff />
            )}
            {t('예약접수')}
          </span>
          <span onClick={() => onToggle('status', 'CANCEL')}>
            {search?.status === 'CANCEL' ? (
              <IoMdRadioButtonOn />
            ) : (
              <IoMdRadioButtonOff />
            )}
            {t('예약취소')}
          </span>
          <span onClick={() => onToggle('status', 'DONE')}>
            {search?.status === 'DONE' ? (
              <IoMdRadioButtonOn />
            ) : (
              <IoMdRadioButtonOff />
            )}
            {t('상담완료')}
          </span>
        </dd>
      </dl>
      <InputWrapper>
        <select name="sopt" value={search?.sopt} onChange={onChange}>
          <option value="ALL">{t('통합검색')}</option>
          <option value="COUNSELING_NAME">{t('상담명')}</option>
          <option value="COUNSELOR">{t('상담사명')}</option>
          <option value="USER">{t('신청자명')}</option>
        </select>
        <input
          type="text"
          name="skey"
          value={search.skey}
          onChange={onChange}
        />
      </InputWrapper>
      <StyledButton type="submit" variant="green">
        {t('검색')}
      </StyledButton>
    </FormBox>
  );
};

export default React.memo(SearchBox);
