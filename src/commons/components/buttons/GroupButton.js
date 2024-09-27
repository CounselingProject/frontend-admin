import styled, { css } from "styled-components";
import fontSizes from "@/theme/fontSizes";

const commonStyle = css`
  border-radius: 0px; /* 둥근 모서리를 없애고 네모로 만듦 */
  cursor: pointer;
`;

export const GroupButton = styled.button`
  font-size: 14px; /* 폰트 크기를 줄임 */
  font-weight: 500;
  color: white;
  width: 90px;
  height: 40px; /* 높이와 넓이를 같게 해서 네모로 만듦 */
  display: flex;
  justify-content: center;
  align-items: center; /* 텍스트를 버튼의 가운데로 정렬 */
  background-color: #005d4f; /* 요청하신 색상 */
  margin-top: 40px;

  ${commonStyle}
`;
