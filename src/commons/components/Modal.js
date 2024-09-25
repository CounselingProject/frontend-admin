import React from 'react';
import styled from 'styled-components';

// 모달 오버레이 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); // 반투명 배경
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // 다른 요소 위에 표시
`;

// 모달 컨테이너 스타일 정의
const ModalContainer = styled.div`
  background: white; // 흰색 배경
  padding: 20px; // 안쪽 여백
  border-radius: 8px; // 모서리 둥글게
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); // 그림자 효과
  width: 400px; // 너비 설정
`;

// 닫기 버튼 스타일 정의
const CloseButton = styled.button`
  background: none; // 배경 없음
  border: none; // 테두리 없음
  cursor: pointer; // 포인터 커서
  font-size: 16px; // 글씨 크기
  margin-bottom: 10px; // 아래쪽 여백
`;

const Modal = ({ onClose, children }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>✖</CloseButton> {/* 닫기 버튼 */}
        {children} {/* 모달 안에 들어갈 내용 */}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
