'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { GroupButton } from '@/commons/components/buttons/GroupButton';
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from 'react-icons/io';

const FormBox = styled.form`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
`;

const RadioButtonContainer = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  font-size: 16px;

  input {
    display: none;
  }

  svg {
    margin-right: 5px;
    color: #4a90e2;
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: #007bff;
  }

  &.checked svg {
    color: #007bff;
  }
`;

const RadioButton = ({ id, name, value, checked, onChange, label }) => (
  <RadioButtonContainer className={checked ? 'checked' : ''}>
    {checked ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />}
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    {label}
  </RadioButtonContainer>
);

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  input[type='text'] {
    display: block;
  }
`;

const StyledTh = styled.th`
  padding: 12px;
  background-color: #3f51b5;
  border-bottom: 1px solid white;
  height: 60px;
  color: white;
  width: 150px;
`;

const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  height: 60px;
  background-color: #f9f9f9;

  textarea {
    width: 100%;
    height: 100px;
    resize: vertical;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const BoardForm = ({ form, errors, onSubmit, onChange }) => {
  const { t } = useTranslation();

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <div className="error global">
        {errors.global &&
          errors.global.map((err) => <div key={err}>{err}</div>)}
      </div>
      <input type="hidden" name="gid" value={form.gid} />

      <h2>{t('기본 설정')}</h2>
      <StyledTable>
        <tbody>
          <tr>
            <StyledTh>{t('사용 여부')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="active_true"
                name="active"
                value={true}
                checked={form.active}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="active_false"
                name="active"
                value={false}
                checked={!form.active}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('게시판 ID')}</StyledTh>
            <StyledTd>
              <StyledInput
                type="text"
                name="bid"
                value={form?.bid ?? ''}
                onChange={onChange}
              />
              {errors?.bid && <div className="error">{errors.bid}</div>}
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('게시판 이름')}</StyledTh>
            <StyledTd>
              <StyledInput
                type="text"
                name="bname"
                value={form?.bname ?? ''}
                onChange={onChange}
              />
              {errors?.bname && <div className="error">{errors.bname}</div>}
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('진열가중치')}</StyledTh>
            <StyledTd>
              <StyledInput
                type="number"
                name="listOrder"
                value={form?.listOrder ?? 0}
                onChange={onChange}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('1페이지 게시글 수')}</StyledTh>
            <StyledTd>
              <StyledInput
                type="number"
                name="rowsPerPage"
                min={1}
                value={form?.rowsPerPage ?? 20}
                onChange={onChange}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('페이지 구간 갯수(PC)')}</StyledTh>
            <StyledTd>
              <StyledInput
                type="number"
                name="pageCountPc"
                min={1}
                value={form?.pageCountPc ?? 10}
                onChange={onChange}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('페이지 구간 갯수(Mo)')}</StyledTh>
            <StyledTd>
              <StyledInput
                type="number"
                name="pageCountMobile"
                min={1}
                value={form?.pageCountMobile ?? 5}
                onChange={onChange}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('답글 사용')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useReply_true"
                name="useReply"
                value={true}
                checked={form.useReply}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useReply_false"
                name="useReply"
                value={false}
                checked={!form.useReply}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('댓글 사용')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useComment_true"
                name="useComment"
                value={true}
                checked={form.useComment}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useComment_false"
                name="useComment"
                value={false}
                checked={!form.useComment}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('에디터')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useEditor_true"
                name="useEditor"
                value={true}
                checked={form.useEditor}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useEditor_false"
                name="useEditor"
                value={false}
                checked={!form.useEditor}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('이미지 첨부')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useUploadImage_true"
                name="useUploadImage"
                value={true}
                checked={form.useUploadImage}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useUploadImage_false"
                name="useUploadImage"
                value={false}
                checked={!form.useUploadImage}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('파일 첨부')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="useUploadFile_true"
                name="useUploadFile"
                value={true}
                checked={form.useUploadFile}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="useUploadFile_false"
                name="useUploadFile"
                value={false}
                checked={!form.useUploadFile}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('글작성 후 이동')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="locationAfterWriting_true"
                name="locationAfterWriting"
                value="list"
                checked={form.locationAfterWriting === 'list'}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="locationAfterWriting_false"
                name="locationAfterWriting"
                value="view"
                checked={form.locationAfterWriting === 'view'}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('글보기 하단 목록 노출')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="showListBelowView_true"
                name="showListBelowView"
                value={true}
                checked={form.showListBelowView}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="showListBelowView_false"
                name="showListBelowView"
                value={false}
                checked={form.showListBelowView}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('스킨')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="skin_counseling"
                name="skin"
                value="counseling"
                checked={form.skin === 'counseling'}
                onChange={onChange}
                label={t('상담 게시판')}
              />
              <RadioButton
                id="skin_review"
                name="skin"
                value="review"
                checked={form.skin === 'review'}
                onChange={onChange}
                label={t('리뷰 게시판')}
              />
              <RadioButton
                id="skin_notice"
                name="skin"
                value="default"
                checked={form.skin === 'default'}
                onChange={onChange}
                label={t('공지사항')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('개인게시판')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="privateAccess_true"
                name="privateAccess"
                value={true}
                checked={form.privateAccess}
                onChange={onChange}
                label={t('사용')}
              />
              <RadioButton
                id="privateAccess_false"
                name="privateAccess"
                value={false}
                checked={!form.active}
                onChange={onChange}
                label={t('미사용')}
              />
            </StyledTd>
          </tr>
        </tbody>
      </StyledTable>

      <h2>{t('게시판 분류')}</h2>
      <StyledTable>
        <tbody>
          <tr>
            <StyledTh>{t('분류')}</StyledTh>
            <StyledTd>
              <textarea
                name="category"
                placeholder={t('여러 분류는 줄개행하여 입력')}
                value={form?.category ?? ''}
                onChange={onChange}
              ></textarea>
            </StyledTd>
          </tr>
        </tbody>
      </StyledTable>

      <h2>{t('권한 설정')}</h2>
      <StyledTable className="table_cols mb30">
        <tbody>
          <tr>
            <StyledTh>{t('글 목록')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="listAccessType_ALL"
                name="listAccessType"
                value="ALL"
                checked={form.listAccessType === 'ALL'}
                onChange={onChange}
                label={t('비회원+학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="listAccessType_MEMBER"
                name="listAccessType"
                value="USER"
                checked={form.listAccessType === 'USER'}
                onChange={onChange}
                label={t('학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="listAccessType_ADMIN"
                name="listAccessType"
                value="ADMIN"
                checked={form.listAccessType === 'ADMIN'}
                onChange={onChange}
                label={t('관리자')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('글 보기')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="viewAccessType_ALL"
                name="viewAccessType"
                value="ALL"
                checked={form.viewAccessType === 'ALL'}
                onChange={onChange}
                label={t('비회원+학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="viewAccessType_MEMBER"
                name="viewAccessType"
                value="USER"
                checked={form.viewAccessType === 'USER'}
                onChange={onChange}
                label={t('학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="viewAccessType_ADMIN"
                name="viewAccessType"
                value="ADMIN"
                checked={form.viewAccessType === 'ADMIN'}
                onChange={onChange}
                label={t('관리자')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('글 쓰기')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="writeAccessType_ALL"
                name="writeAccessType"
                value="ALL"
                checked={form.writeAccessType === 'ALL'}
                onChange={onChange}
                label={t('비회원+학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="writeAccessType_MEMBER"
                name="writeAccessType"
                value="USER"
                checked={form.writeAccessType === 'USER'}
                onChange={onChange}
                label={t('학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="writeAccessType_ADMIN"
                name="writeAccessType"
                value="ADMIN"
                checked={form.writeAccessType === 'ADMIN'}
                onChange={onChange}
                label={t('관리자')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('답글')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="replyAccessType_ALL"
                name="replyAccessType"
                value="ALL"
                checked={form.replyAccessType === 'ALL'}
                onChange={onChange}
                label={t('비회원+학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="replyAccessType_MEMBER"
                name="replyAccessType"
                value="USER"
                checked={form.replyAccessType === 'USER'}
                onChange={onChange}
                label={t('학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="replyAccessType_ADMIN"
                name="replyAccessType"
                value="ADMIN"
                checked={form.replyAccessType === 'ADMIN'}
                onChange={onChange}
                label={t('관리자')}
              />
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>{t('댓글')}</StyledTh>
            <StyledTd>
              <RadioButton
                id="commentAccessType_ALL"
                name="commentAccessType"
                value="ALL"
                checked={form.commentAccessType === 'ALL'}
                onChange={onChange}
                label={t('비회원+학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="commentAccessType_MEMBER"
                name="commentAccessType"
                value="USER"
                checked={form.commentAccessType === 'USER'}
                onChange={onChange}
                label={t('학생+교수+상담사+관리자')}
              />
              <RadioButton
                id="commentAccessType_ADMIN"
                name="commentAccessType"
                value="ADMIN"
                checked={form.commentAccessType === 'ADMIN'}
                onChange={onChange}
                label={t('관리자')}
              />
            </StyledTd>
          </tr>
        </tbody>
      </StyledTable>

      <GroupButton type="submit">
        {form?.mode === 'update' ? t('수정하기') : t('등록하기')}
      </GroupButton>
    </FormBox>
  );
};

export default React.memo(BoardForm);
