'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import counselingType from '../../constants/counselingType';
import personalCategory from '../../constants/personalCategory';
import status from '../../constants/status';

const StatusButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-weight: bold;

  .status {
    font-size: 1.1em;
    color: #3f51b5;
    margin-right: 10px;
  }

  button {
    padding: 6px 12px;
    color: #3f51b5;
    border-color: #3f51b5;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #3f51b5;
      color: white;
    }
  }
`;

const RecordButton = styled.button`
  margin-top: 15px;
  padding: 8px 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  width: 100%;
  height: 32px;

  &:hover {
    background-color: #3f51b5;
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

const ItemBox = ({ item, className, onChange, onChangeStatus }) => {
  const { t } = useTranslation();

  const { formattedDate, formattedStartTime, formattedEndTime } =
    formatDateTime(item?.rDateTime);

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>신청번호</th>
          <th>상담일</th>
          <th>상담시간</th>
          <th>신청자명</th>
          <th>상담구분</th>
          <th>상담종류</th>
          <th>상담명</th>
          <th>상담사명</th>
          <th>진행상태</th>
          <th>상태변경</th>
          <th>상담일지</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="rNo">{item?.rNo}</td>
          <td className="rDate">{formattedDate}</td>
          <td className="rTime">
            {formattedStartTime}~{formattedEndTime}
          </td>
          <td className="userName">{item?.userName}</td>
          <td className="counselingType">
            {item?.counselingType === 'PERSONAL'
              ? counselingType.PERSONAL
              : counselingType.GROUP}
          </td>
          <td className="category">
            {item?.category === 'PROFESSOR' && personalCategory.PROFESSOR}
            {item?.category === 'EMPLOYMENT' && personalCategory.EMPLOYMENT}
            {item?.category === 'PSYCHOLOGICAL' &&
              personalCategory.PSYCHOLOGICAL}
          </td>
          <td className="cName">{item?.counselingName}</td>
          <td className="counselorName">{item?.counselorName}</td>
          <td>
            <select name="status" onChange={onChange}>
              <option value="">
                {(item?.status === 'APPLY' && status.APPLY) ||
                  (item?.status === 'CONFIRM' && status.CONFIRM) ||
                  (item?.status === 'CANCEL' && status.CANCEL) ||
                  (item?.status === 'DONE' && status.DONE)}
              </option>
              <option value="APPLY">{status.APPLY}</option>
              <option value="CONFIRM">{status.CONFIRM}</option>
              <option value="CANCEL">{status.CANCEL}</option>
              <option value="DONE">{status.DONE}</option>
            </select>
          </td>
          <td>
            <StatusButtonWrapper>
                {item && ['APPLY', 'CONFIRM', 'CANCEL', 'DONE'].includes(item.status) && (
                  <button type="button" onClick={() => onChangeStatus(item.rNo)}>
                    {t('상태변경')}
                  </button>
                )}
              </StatusButtonWrapper>
          </td>
          <td>
            <Link href="/">
              <RecordButton>{t('상담일지_작성')}</RecordButton>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const ItemStyledBox = styled(ItemBox)`
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 2px 2px 5px #818181;
  border-radius: 5px;

  width: 80%;
  margin: auto;

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  thead, tbody {
    width: 100%;
  }

  th, td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    width: auto;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ItemsBox = ({ items, onChangeStatus }) => {
  return (
    <ul>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <ItemStyledBox
            key={index}
            item={item}
            onChangeStatus={onChangeStatus}
          />
        ))
      ) : (
        <li>항목이 없습니다.</li>
      )}
    </ul>
  );
};

export default React.memo(ItemsBox);
