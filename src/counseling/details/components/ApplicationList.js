'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import counselingType from '../../constants/counselingType';
import personalCategory from '../../constants/personalCategory';
import status from '../../constants/status';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledThead = styled.thead`
  background-color: #3f51b5;
`;

const StyledTh = styled.th`
  padding: 12px;
  color: white;
  text-align: center;
  border-right: 1px solid white;

  &:last-child {
    border-right: none;
  }
`;

const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  text-align: center;

  &:last-child {
    border-right: none;
  }

  button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &.edit {
      background-color: #4a90e2;
      color: white;
    }

    &.delete {
      background-color: #e74c3c;
      color: white;
    }
  }
`;

const formatDateTime = (rDateTime) => {
  const date = new Date(rDateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}-${month}-${day}`;
  const formattedStartTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
  const formattedEndTime = `${hours + 1}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return { formattedDate, formattedStartTime, formattedEndTime };
};

const ApplicationList = ({ items, className, onChange, onChangeStatus }) => {
  const { t } = useTranslation();

  const { formattedDate, formattedStartTime, formattedEndTime } =
    formatDateTime(items?.rDateTime);

  return (
    <StyledTable>
      <StyledThead>
        <tr>
          <StyledTh>신청번호</StyledTh>
          <StyledTh>상담일</StyledTh>
          <StyledTh>상담시간</StyledTh>
          <StyledTh>신청자명</StyledTh>
          <StyledTh>상담구분</StyledTh>
          <StyledTh>상담종류</StyledTh>
          <StyledTh>상담명</StyledTh>
          <StyledTh>상담사명</StyledTh>
          <StyledTh>진행상태</StyledTh>
          <StyledTh>상태변경</StyledTh>
          <StyledTh>상담일지</StyledTh>
        </tr>
      </StyledThead>
      <tbody>
        {items && items.length > 0 ? (
          items.map(
            ({
              rNo,
              userName,
              counselingType,
              category,
              counselingName,
              counselorName,
            }) => (
              <tr key={rNo}>
                <StyledTd>{items?.rNo}</StyledTd>
                <StyledTd>{formattedDate}</StyledTd>
                <StyledTd>
                  {formattedStartTime}~{formattedEndTime}
                </StyledTd>
                <StyledTd>{items?.userName}</StyledTd>
                <StyledTd>
                  {items?.counselingType === 'GROUP'
                    ? counselingType.GROUP
                    : counselingType.PERSONAL}
                </StyledTd>
                <StyledTd>
                  {items?.category === 'PROFESSOR' &&
                    personalCategory.PROFESSOR}
                  {items?.category === 'EMPLOYMENT' &&
                    personalCategory.EMPLOYMENT}
                  {items?.category === 'PSYCHOLOGICAL' &&
                    personalCategory.PSYCHOLOGICAL}
                </StyledTd>
                <StyledTd>{items?.counselingName}</StyledTd>
                <StyledTd>
                  {items?.counselorName}
                </StyledTd>
                <StyledTd>
                  <select>
                    <option value="">
                      {(items?.status === 'APPLY' && status.APPLY) ||
                        (items?.status === 'CANCEL' && status.CANCEL) ||
                        (items?.status === 'DONE' && status.DONE)}
                    </option>
                    <option value="APPLY">{status.APPLY}</option>
                    <option value="CANCEL">{status.CANCEL}</option>
                    <option value="DONE">{status.DONE}</option>
                  </select>
                </StyledTd>
                <StyledTd>
                  <button
                    type="button"
                    onClick={() => onChangeStatus(items.rNo)}
                  >
                    {t('상태변경')}
                  </button>
                </StyledTd>
                <StyledTd>
                  <Link href="/">
                    <button>{t('상담일지_작성')}</button>
                  </Link>
                </StyledTd>
              </tr>
            ),
          )
        ) : (
          <tr>
            <StyledTd colSpan="5">항목이 없습니다.</StyledTd>
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
};

export default React.memo(ApplicationList);
